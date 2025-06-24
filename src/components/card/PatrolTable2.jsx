"use client";

import { useMemo, useState } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [editItem, setEditItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const filteredData = useMemo(() => {
    return data.filter((item) => 
      item.nomor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.jenis.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const selectedData = filteredData.slice(startIndex, startIndex + entriesPerPage);

  const handleEdit = (item) => {
    setEditItem({ ...item });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    const updatedData = dataPatroli.map((item) =>
      item.nomor === editItem.nomor ? editItem : item
    );
    setDataPatroli(updatedData);
    setShowEditModal(false);
    alert("Surat tugas berhasil diedit");
  };

  const handleDelete = (nomor) => {
    const confirmDelete = confirm("Yakin ingin menghapus surat tugas ini?");
    if (confirmDelete) {
      const updatedData = dataPatroli.filter((item) => item.nomor !== nomor);
      setDataPatroli(updatedData);
    }
  };

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
              <tr className="border-b">
                <th className="py-2 px-4 text-left">Nomor Surat</th>
                <th className="py-2 px-2 text-left">Jenis Patroli</th>
                <th className="py-2 px-2 text-left">Tanggal Mulai</th>
                <th className="py-2 px-2 text-left">Tanggal Selesai</th>
                <th className="py-2 px-2 text-center pr-6">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {selectedData.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{item.nomor}</td>
                  <td className="py-2 px-2">{item.jenis_surat}</td>
                  <td className="py-2 px-2">{formatDate(item.tanggal_awal)}</td>
                  <td className="py-2 px-2">{formatDate(item.tanggal_akhir)}</td>
                  <td className="py-2 px-2">
                    <div className="flex justify-center gap-2">
                      <button className="bg-blue-600 text-white p-2 rounded-xl hover:bg-[#0099CC] hover:text-black">
                        <FiEye size={20} />
                      </button>
                      <button
                        className="bg-[#DF6D14] text-white p-2 rounded-xl hover:bg-[#FCF596] hover:text-black"
                        onClick={() => handleEdit(item)}
                      >
                        <FiEdit size={20} />
                      </button>
                      <button
                        className="bg-red-600 text-white p-2 rounded-xl hover:bg-[#FFA09B] hover:text-black"
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

      {showEditModal && editItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md">
            <h2 className="text-lg font-semibold mb-4">Edit Surat Tugas</h2>

            <div className="mb-3">
              <label className="block text-sm font-medium">Nomor Surat</label>
              <input
                className="w-full border p-2 rounded"
                value={editItem.nomor}
                onChange={(e) => setEditItem({ ...editItem, nomor: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium">Jenis Patroli</label>
              <select
                className="w-full border p-2 rounded"
                value={editItem.jenis}
                onChange={(e) => setEditItem({ ...editItem, jenis: e.target.value })}
              >
                <option value="Mandiri">Mandiri</option>
                <option value="Rutin">Rutin</option>
                <option value="Terpadu">Terpadu</option>
                <option value="Pemadaman">Pemadaman</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium">Tanggal Mulai</label>
              <input
                className="w-full border p-2 rounded"
                type="date"
                value={editItem.mulai}
                onChange={(e) => setEditItem({ ...editItem, mulai: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium">Tanggal Selesai</label>
              <input
                className="w-full border p-2 rounded"
                type="date"
                value={editItem.selesai}
                onChange={(e) => setEditItem({ ...editItem, selesai: e.target.value })}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}