"use client";

import { useEffect, useMemo, useState } from "react";
import { FiSearch, FiEye, FiTrash2, FiEdit } from "react-icons/fi";
import CustomPagination from "../shared/CustomPagination";

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

export default function PatroliTable2({ data = [], isLoading, error }) {
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  // const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter((item) => 
      item.nomor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.jenis_surat?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tanggal_awal?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tanggal_akhir?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tableData, searchTerm]);

  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const selectedData = filteredData.slice(startIndex, startIndex + entriesPerPage);
  
  const handleDelete = async (nomor) => {
  const confirmDelete = confirm("Yakin ingin menghapus surat tugas ini?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(`https://sipongi.menlhk.go.id/sipp-karhutla/api/simadu/deletesk?no_st=${nomor}`, {
      method: "GET",
    });

    const data = await res.json();

    if (res.ok) {
      alert(`Surat tugas dengan nomor ${nomor} berhasil dihapus.`);
      setTableData((prev) => prev.filter((item) => item.nomor !== nomor));
    } else {
      alert(`Gagal menghapus: ${data.message || "Terjadi kesalahan."}`);
    }
  } catch (error) {
    console.error("Error deleting:", error);
    alert("Terjadi kesalahan saat menghapus surat tugas.");
  }
};

  // const handleSaveEdit = (updatedData) => {
  //   // Simpan data ke server
  //   console.log("Data yang disimpan:", updatedData);
  //   alert("Surat tugas berhasil diperbarui.");
  //   setEditItem(null);
  // };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white shadow-xl rounded-xl my-5">
      <div className="flex justify-between items-center mb-4">
        <label className="text-sm text-gray-600">
          Show
          <select
            className="border px-2 py-1 mx-2"
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {entriesPerPageOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          entries
        </label>

        {/* Search bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="border px-3 py-1 pl-8 rounded-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Loading or Error */}
      {isLoading && <p className="text-center py-10">Loading...</p>}
      {error && <p className="text-center text-red-500 py-10">{error}</p>}

      {!isLoading && !error && (
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
              {selectedData.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{item.nomor}</td>
                  <td className="py-2 px-2">{item.jenis_surat}</td>
                  <td className="py-2 px-2">{formatDate(item.tanggal_awal)}</td>
                  <td className="py-2 px-2">{formatDate(item.tanggal_akhir)}</td>
                  <td className="py-2 text-center pr-6">
                    <div className="flex justify-center gap-2 items-center">
                      {/* <button className="bg-blue-600 text-white p-2 rounded hover:text-black">
                        <FiEye size={20} />
                      </button> */}
                      {/* <button
                        className="bg-[#DF6D14] text-white p-2 rounded hover:text-black"
                        onClick={() => handleEdit(item)}
                      >
                        <FiEdit size={20} />
                      </button> */}
                      <button
                        className="bg-red-600 text-white p-2 rounded hover:text-black"
                        onClick={() => handleDelete(item.nomor)}
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Pagination area */}
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

      {/* Modal Edit */}
      {/* {editItem && (
        <EditSuratTugasModal
          item={editItem}
          onClose={() => setEditItem(null)}
          onSave={handleSaveEdit}
        />
      )} */}
    </div>
  );
}