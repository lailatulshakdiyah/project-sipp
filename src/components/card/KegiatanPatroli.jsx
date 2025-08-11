"use client";

import { useState } from "react";
import { FiSearch, FiDownload } from "react-icons/fi";
import CustomPagination from "../shared/CustomPagination";
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function KegiatanPatroli({ data, isLoading, error, onFlyTo }) {
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

  const aksiColorMap = {
    "Patroli Mandiri": "#1476FF",
    "Patroli Rutin": "#F9C132",
    "Patroli Terpadu": "#52AF53",
    "Pemadaman": "#FF0000",
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
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse">
              <thead className="border-b bg-gray-100">
                <tr>
                  <th className="py-2 px-4 text-left">Daerah Operasi</th>
                  <th className="py-2 px-4 text-left">Kegiatan</th>
                  <th className="py-2 px-4 text-left">Daerah Patroli</th>
                  <th className="py-2 px-4 text-left">Ketua Regu</th>
                  <th className="py-2 text-center pr-6">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {selectedData.length > 0 ? (
                  selectedData.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{item.nama_daops}</td>
                      <td className="py-2 px-4">{item.kegiatan}</td>
                      <td className="py-2 px-4">{item.daerah}</td>
                      <td className="py-2 px-4">{item.ketua_regu}</td>
                      <td className="py-2 px-4 text-center pr-6">
                        <div className="flex justify-center gap-3">
                          <button 
                            onClick={() => {
                              if (onFlyTo?.current && typeof onFlyTo.current === "function") {
                                onFlyTo.current(item.lat, item.lng, item.kode_laporan);
                              }
                            }}
                          >
                            <FaMapMarkerAlt size={30} color={aksiColorMap[item.aksi] || "#9CA3AF"} />
                          </button>
                          <button
                            onClick={() => {
                              if (typeof window !== 'undefined') {
                                const pdfUrl = `https://sipongi.menlhk.go.id/sipp-karhutla/api/karhutla/download/${item.kode_laporan}`;
                                window.open(pdfUrl, '_blank');
                              }
                            }}
                            className="bg-indigo-500 hover:bg-grey-200 text-white hover:text-black p-2 rounded transition-colors"
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
        {isLoading ? (
          <p className="text-center mt-4 text-gray-500">Loading data...</p>
        ) : totalEntries === 0 ? (
          <p className="text-center mt-4 text-gray-500">No data available.</p>
        ) : (
          <div className="flex justify-between items-center mt-4 flex-wrap gap-2">
            <p className="text-sm text-accent">
              Show {startIndex + 1} to {Math.min(startIndex + entriesPerPage, totalEntries)} of {totalEntries} entries
            </p>

            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              delta={2}
              className="justify-end w-fit text-accent"
            />
          </div>
        )}
      </div>
    </div>
  );
}
