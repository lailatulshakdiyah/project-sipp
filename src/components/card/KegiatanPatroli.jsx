"use client";

import { useState } from "react";
import { FiSearch, FiDownload } from "react-icons/fi";

export default function KegiatanPatroli({ data, isLoading, error }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const entriesPerPageOptions = [10, 25, 50, 100];

  const filteredData = data.filter((item) =>
    item.kegiatan?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const selectedData = filteredData.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  const badgeColors = {
    "Patroli Mandiri": "#006BFF",
    "Patroli Rutin": "#FFC635",
    "Patroli Terpadu": "#52AF53",
    "Pemadaman": "#F01313",
  };

  const getPagination = (current, total) => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= total; i++) {
      if (
        i === 1 ||
        i === total ||
        (i >= current - delta && i <= current + delta)
      ) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l > 2) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white shadow-xl rounded-xl p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div className="w-full md:w-auto">
            <label htmlFor="entries" className="text-sm text-gray-700">
              Show{" "}
              <select
                className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                value={entriesPerPage}
                onChange={(e) => {
                  setEntriesPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                {entriesPerPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>{" "}
              entries
            </label>
          </div>

          {/* Search bar */}
          <div className="w-full md:w-auto flex justify-start md:justify-end">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search..."
                className="border px-3 py-1 pl-8 rounded-xl w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Loading / Error */}
        {isLoading && <p className="text-center py-10">Loading...</p>}
        {error && <p className="text-center text-red-500 py-10">{error}</p>}

        {/* Table */}
        {!isLoading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full table-fixed text-md text-left">
              <thead className="border-b bg-gray-100">
                <tr>
                  <th className="py-2 px-5">Daerah Operasi</th>
                  <th className="py-2 px-10">Kegiatan</th>
                  <th className="py-2 px-5">Daerah Patroli</th>
                  <th className="py-2 px-10">Ketua Regu</th>
                  <th className="py-2 px-5 text-right pr-6">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {selectedData.length > 0 ? (
                  selectedData.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-5">{item.nama_daops}</td>
                      <td className="py-2 px-10">
                        <span
                          className="inline-block px-2 py-1 rounded-xl text-white text-md font-medium"
                          style={{
                            backgroundColor:
                              badgeColors[item.kegiatan] || "#9CA3AF",
                          }}
                        >
                          {item.kegiatan}
                        </span>
                      </td>
                      <td className="py-2 px-5 break-words">{item.daerah}</td>
                      <td className="py-2 px-10 break-words">{item.ketua_regu}</td>
                      <td className="py-2 px-5 text-right pr-6">
                        <button 
                          onClick={() => alert(`unduh laporan: ${item.nama_daops}`)}
                          className="bg-green-600 hover:bg-[#A7D477] text-white hover:text-black p-2 rounded-xl transition-colors">
                          <FiDownload size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-4 text-center text-gray-500">
                      Tidak ada data yang ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer Pagination */}
        {!isLoading && !error && (
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-accent">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + entriesPerPage, totalEntries)} of{" "}
              {totalEntries} entries
            </p>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded-xl ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "hover:bg-gray-200"
                }`}
              >
                &lt; Previous
              </button>

              {getPagination(currentPage, totalPages).map((page, index) =>
                page === "..." ? (
                  <span key={index} className="px-3 py-1 text-gray-500">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border rounded-xl ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded-xl ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "hover:bg-gray-200"
                }`}
              >
                Next &gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
