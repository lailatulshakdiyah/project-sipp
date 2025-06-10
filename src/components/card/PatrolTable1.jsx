"use client";

import { useState, useMemo, useEffect } from "react";
import { FiSearch, FiEye, FiDownload } from "react-icons/fi";

const formatDate = (dateString) => {
  if (!dateString) return "-";
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const date = new Date(dateString);
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

const entriesPerPageOptions = [10, 25, 50, 100];

export default function PatroliTable1({ data = [], isLoading, error }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.nomor?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const selectedData = filteredData.slice(startIndex, startIndex + entriesPerPage);

  const getPagination = (current, total) => {
    const delta = 1;
    const pagesToShow = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pagesToShow.push(i);
      return pagesToShow;
    }

    pagesToShow.push(1);
    if (current > 3) pagesToShow.push("...");

    const startPage = Math.max(2, current - delta);
    const endPage = Math.min(total - 1, current + delta);
    for (let i = startPage; i <= endPage; i++) {
      pagesToShow.push(i);
    }

    if (current < total - 2) pagesToShow.push("...");

    pagesToShow.push(total);
    return pagesToShow;
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
                  <option key={option} value={option}>{option}</option>
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
                placeholder="Search"
                aria-label="Cari nomor surat"
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

        {/* Tabel */}
        {!isLoading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="py-2 px-4 text-left">Nomor Surat</th>
                  <th className="py-2 px-2 text-left">Jenis Patroli</th>
                  <th className="py-2 px-2 text-left">Tanggal Mulai</th>
                  <th className="py-2 px-2 text-left">Tanggal Selesai</th>
                  <th className="py-2 px-2 text-center pr-6">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {selectedData.length > 0 ? (
                  selectedData.map((item, index) => (
                    <tr key={item.id || item.nomor || index} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{item.nomor}</td>
                      <td className="py-2 px-2">{item.jenis_surat}</td>
                      <td className="py-2 px-2">{formatDate(item.tanggal_awal)}</td>
                      <td className="py-2 px-2">{formatDate(item.tanggal_akhir)}</td>
                      <td className="py-2 px-2">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => alert(`Lihat surat: ${item.nomor}`)}
                            className="bg-blue-600 text-white hover:text-black p-2 rounded-xl hover:bg-[#0099CC]"
                          >
                            <FiEye size={18} />
                          </button>
                          <button
                            onClick={() => alert(`Unduh surat: ${item.nomor}`)}
                            className="bg-green-600 text-white hover:text-black p-2 rounded-xl hover:bg-[#A7D477]"
                          >
                            <FiDownload size={18} />
                          </button>
                        </div>
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
        {!isLoading && !error && totalEntries > 0 && (
          <div className="flex justify-between items-center mt-4 flex-wrap gap-2">
            <p className="text-sm text-accent">
              Show {startIndex + 1} to {Math.min(startIndex + entriesPerPage, totalEntries)} of {totalEntries} entries
            </p>
            <div className="flex items-center flex-wrap gap-1">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded-xl ${
                  currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200"
                }`}
              >
                &lt; Previous
              </button>

              {getPagination(currentPage, totalPages).map((page, index) =>
                page === "..." ? (
                  <span key={index} className="px-3 py-1 text-gray-500">...</span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border rounded-xl ${
                      currentPage === page
                        ? "bg-blue-600 text-white font-semibold"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded-xl ${
                  currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200"
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