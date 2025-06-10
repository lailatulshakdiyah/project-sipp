"use client";

import { useState } from "react";
import { FiSearch, FiEye, FiTrash2, FiEdit } from "react-icons/fi";

const formatDate = (dateString) => {
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const date = new Date(dateString);
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

const dataPatroliDummy = [
  { nomor: "ST001", jenis: "Rutin", mulai: "2025-01-12", selesai: "2025-01-22" },
  { nomor: "ST002", jenis: "Terpadu", mulai: "2025-01-14", selesai: "2025-01-24" },
  { nomor: "ST003", jenis: "Mandiri", mulai: "2025-01-16", selesai: "2025-01-26" },
  { nomor: "ST004", jenis: "Pemadaman", mulai: "2025-01-18", selesai: "2025-01-28" },
  { nomor: "ST005", jenis: "Mandiri", mulai: "2025-01-20", selesai: "2025-01-30" },
  { nomor: "ST006", jenis: "Pemadaman", mulai: "2025-01-22", selesai: "2025-02-01" },
  { nomor: "ST007", jenis: "Rutin", mulai: "2025-01-24", selesai: "2025-02-03" },
  { nomor: "ST008", jenis: "Rutin", mulai: "2025-01-26", selesai: "2025-02-05" },
  { nomor: "ST009", jenis: "Terpadu", mulai: "2025-01-28", selesai: "2025-02-08" },
  { nomor: "ST010", jenis: "Mandiri", mulai: "2025-01-30", selesai: "2025-02-10" },
  { nomor: "ST011", jenis: "Terpadu", mulai: "2025-02-01", selesai: "2025-02-11" },
  { nomor: "ST012", jenis: "Pemadaman", mulai: "2025-02-03", selesai: "2025-02-13" },
  { nomor: "ST013", jenis: "Mandiri", mulai: "2025-02-05", selesai: "2025-02-15" },
  { nomor: "ST014", jenis: "Rutin", mulai: "2025-02-07", selesai: "2025-02-17" },
  { nomor: "ST015", jenis: "Terpadu", mulai: "2025-02-09", selesai: "2025-02-19" },
];

const entriesPerPageOptions = [10, 25, 50, 100];

export default function PatroliTable2() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [dataPatroli, setDataPatroli] = useState(dataPatroliDummy);
  const [editItem, setEditItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const filteredData = dataPatroli.filter((item) =>
    item.nomor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.jenis.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Nomor Surat</th>
              <th className="py-2 text-left">Jenis Patroli</th>
              <th className="py-2 text-left">Tanggal Mulai</th>
              <th className="py-2 text-left">Tanggal Selesai</th>
              <th className="py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {selectedData.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{item.nomor}</td>
                <td className="py-2">{item.jenis}</td>
                <td className="py-2">{formatDate(item.mulai)}</td>
                <td className="py-2">{formatDate(item.selesai)}</td>
                <td className="py-2">
                  <div className="flex gap-2">
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

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">
          Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, totalEntries)} of {totalEntries} entries
        </p>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded-xl ${currentPage === 1 ? "text-gray-400" : "hover:bg-gray-200"}`}
          >
            &lt; Previous
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded-xl ${currentPage === i + 1 ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded-xl ${currentPage === totalPages ? "text-gray-400" : "hover:bg-gray-200"}`}
          >
            Next &gt;
          </button>
        </div>
      </div>

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