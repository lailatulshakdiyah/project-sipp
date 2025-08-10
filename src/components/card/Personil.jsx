"use client";

import { useState, useEffect } from "react";
import { FiSearch, FiTrash2, FiEye, FiEdit } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import CustomPagination from "../shared/CustomPagination";

const entriesPerPageOptions = [10, 25, 50, 100]

export default function Personil({ initialData = [], isLoading }) {
  console.log("initialData dari props:", initialData)

  const [data, setData] = useState(initialData)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [form, setForm] = useState({ nama: "", nip: "", email: "", noHp: "" })
  const [errors, setErrors] = useState({})
  const [isModalOpen, setModalOpen] = useState(false)
  const [isEditMode, setEditMode] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(null)

  const filteredData = data.filter((item) =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const selectedData = filteredData.slice(startIndex, startIndex + entriesPerPage);

  const openModal = (edit = false, index = null) => {
    setEditMode(edit);
    setSelectedIndex(index);
    setForm(edit && index !== null ? data[index] : { nama: "", nip: "", email: "", noHp: "" });
    setErrors({});
    setModalOpen(true);
  };

  const openDeleteConfirm = (index) => {
    setDeleteIndex(index);
    setDeleteConfirmOpen(true);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.nama.trim()) newErrors.nama = "Nama wajib diisi.";
    if (!form.nip.trim()) newErrors.nip = "NIP wajib diisi.";
    if (!form.email.trim()) newErrors.email = "Email wajib diisi.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    const updated = [...data];
    if (isEditMode && selectedIndex !== null) updated[selectedIndex] = form;
    else updated.push(form);
    setData(updated);
    setModalOpen(false);
  };

  const handleDelete = () => {
    const updated = [...data];
    updated.splice(deleteIndex, 1);
    setData(updated);
    setDeleteConfirmOpen(false);
    if ((currentPage - 1) * entriesPerPage >= updated.length) {
      setCurrentPage(Math.max(currentPage - 1, 1));
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 bg-white shadow-xl rounded-xl my-5">
      {/* Filter */}
      <div className="flex justify-between items-center mb-4">
        <label className="text-sm text-gray-600">
          Show{" "}
          <select
            className="border px-2 py-1 mx-2"
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {entriesPerPageOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>{" "}
          entries
        </label>

        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border px-3 py-1 pl-8 rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          {/* <button
            className="bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-700"
            onClick={() => openModal(false)}
          >
            <FaPlus />
          </button> */}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="py-2 px-4 text-left">Nama</th>
              <th className="py-2 text-left">NIP</th>
              <th className="py-2 text-left">Email</th>
              <th className="py-2 text-left">No HP</th>
              {/* <th className="py-2 text-center">Aksi</th> */}
            </tr>
          </thead>
          <tbody>
            {selectedData.map((item, index) => (
              <tr key={item.id || index} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{item.nama}</td>
                <td className="py-2">{item.nip}</td>
                <td className="py-2">{item.email}</td>
                <td className="py-2">{item.noHp}</td>
                {/* <td className="py-2 text-center">
                  <div className="flex gap-2 justify-center">
                    <button className="bg-blue-600 text-white p-2 rounded-xl hover:bg-[#0099CC] hover:text-black">
                      <FiEye size={20} />
                    </button>
                    <button
                      className="bg-[#DF6D14] text-white p-2 rounded-xl hover:bg-[#FCF596] hover:text-black"
                      onClick={() => openModal(true, startIndex + index)}
                    >
                      <FiEdit size={20} />
                    </button>
                    <button
                      className="bg-red-600 text-white p-2 rounded-xl hover:bg-[#FFA09B] hover:text-black"
                      onClick={() => openDeleteConfirm(startIndex + index)}
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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

      {/* Modal Konfirmasi Hapus */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
            <p className="mb-4">Apakah kamu yakin ingin menghapus data ini?</p>
            <div className="flex justify-center gap-3">
              <button
                className="px-4 py-2 border rounded-xl text-gray-600 hover:bg-gray-100"
                onClick={() => setDeleteConfirmOpen(false)}
              >
                Batal
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
                onClick={handleDelete}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}