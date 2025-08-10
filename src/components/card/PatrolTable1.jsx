"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { FiSearch, FiEye, FiDownload } from "react-icons/fi";
import CustomPagination from "../shared/CustomPagination";

const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

const entriesPerPageOptions = [10, 25, 50, 100];

export default function PatroliTable1({ data = [], isLoading, error }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [selectedNomor, setSelectedNomor] = useState(null);

  // Modal-related states
  const [detailData, setDetailData] = useState([]);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [errorDetail, setErrorDetail] = useState(null);
  const modalRef = useRef();

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.nomor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.jenis_surat?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.tanggal_awal?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tanggal_akhir?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const selectedData = filteredData.slice(startIndex, startIndex + entriesPerPage);

  useEffect(() => {
    if (!selectedNomor) return;
    const fetchDetail = async () => {
      setLoadingDetail(true);
      setErrorDetail(null);

      try {
        // const encoded = encodeURIComponent(selectedNomor);
        const res = await fetch(`/api/listlaporan?nomor_sk=${selectedNomor}`);
        const result = await res.json();
        if (!res.ok) throw new Error(result?.error || "Gagal mengambil data");
        setDetailData(Array.isArray(result.data) ? result.data : []);
      } catch (err) {
        setErrorDetail(err.message);
        setDetailData([]);
      } finally {
        setLoadingDetail(false);
      }
    };

    fetchDetail();
  }, [selectedNomor]);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setSelectedNomor(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white shadow-xl rounded-xl p-6">

        {/* Header filter dan search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <label className="text-sm text-gray-700">
            Show{" "}
            <select
              className="border rounded px-2 py-1 text-sm"
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

          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search"
              className="border px-3 py-1 pl-8 rounded-xl w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Tabel Surat Tugas */}
        {isLoading ? (
          <p className="text-center py-10">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-10">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="py-2 px-4 text-left">Nomor Surat</th>
                  <th className="py-2 px-2 text-left">Jenis Patroli</th>
                  <th className="py-2 px-2 text-left">Tanggal Mulai</th>
                  <th className="py-2 px-2 text-left">Tanggal Selesai</th>
                  <th className="py-2 text-center pr-6">Aksi</th>
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
                      <td className="py-2 text-center pr-6">
                        <div className="flex items-center gap-2 justify-center">
                          {/* <button
                            onClick={() => setSelectedNomor(item.nomor)}
                            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                          >
                            <FiEye size={18} />
                          </button> */}
                          <button
                            onClick={() => {
                              window.location.href = `https://sipongi.menlhk.go.id/sipp-karhutla/api/karhutla/downloadPeriode?nomor_sk=${item.nomor}`;
                            }}
                            className="bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600"
                          >
                            <FiDownload size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      Tidak ada data ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
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
      </div>

      {/* Modal Detail
      {selectedNomor && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
          onClick={handleOutsideClick}
        >
          <div ref={modalRef} className="bg-white p-6 rounded-xl w-full max-w-5xl shadow-xl relative">
            <h2 className="text-lg font-bold mb-4">Detail Surat Tugas - {selectedNomor}</h2>

            {loadingDetail ? (
              <p className="text-center py-6">Loading...</p>
            ) : errorDetail ? (
              <p className="text-center text-red-500 py-6">{errorDetail}</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-3 py-2">Nomor Daops</th>
                      <th className="border px-3 py-2">Daerah Patroli</th>
                      <th className="border px-3 py-2">Ketua</th>
                      <th className="border px-3 py-2">Tanggal Patroli</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailData.length > 0 ? (
                      detailData.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="border px-3 py-2">{item.nama_daops}</td>
                          <td className="border px-3 py-2">{item.nama_daerah_ptroli}</td>
                          <td className="border px-3 py-2">{item.nama_ketua}</td>
                          <td className="border px-3 py-2">{item.tanggal_patroli}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center py-4">
                          Tidak ada data regu.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            <div className="text-right mt-4">
              <button
                onClick={() => setSelectedNomor(null)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}