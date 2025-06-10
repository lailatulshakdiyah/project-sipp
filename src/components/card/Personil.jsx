"use client";

import { useState } from "react";
import { FiSearch, FiTrash2, FiEye, FiEdit } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";

const initialData = [
  { nama: "Ahmad", nip: "12345", email: "ahmad@gmail.com", noHp: "081234567890" },
  { nama: "Budi", nip: "67890", email: "budi@gmail.com", noHp: "082345678901" },
  { nama: "Citra", nip: "11223", email: "citra@gmail.com", noHp: "083456789012" },
  { nama: "Dewi", nip: "44556", email: "dewi@gmail.com", noHp: "084567890123" },
  { nama: "Eka", nip: "77889", email: "eka@gmail.com", noHp: "085678901234" },
  { nama: "Fajar", nip: "99001", email: "fajar@gmail.com", noHp: "086789012345" },
];

const entriesPerPageOptions = [10, 25, 50, 100];

export default function Personil() {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const [form, setForm] = useState({ nama: "", nip: "", email: "", noHp: "" });
  const [errors, setErrors] = useState({ nama: "", nip: "", email: "" });

  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const filteredData = data.filter((item) =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const selectedData = filteredData.slice(startIndex, startIndex + entriesPerPage);

  const openModal = (edit = false, index = null) => {
    setEditMode(edit);
    setSelectedIndex(index);
    if (edit && index !== null) {
      setForm(data[index]);
    } else {
      setForm({ nama: "", nip: "", email: "", noHp: "" });
    }
    setErrors({ nama: "", nip: "", email: "" });
    setModalOpen(true);
  };

  const openDeleteConfirm = (index) => {
    setDeleteIndex(index);
    setDeleteConfirmOpen(true);
  };

  const validateForm = () => {
    const newErrors = { nama: "", nip: "", email: "" };
    let isValid = true;
    if (!form.nama.trim()) {
      newErrors.nama = "Nama wajib diisi.";
      isValid = false;
    }
    if (!form.nip.trim()) {
      newErrors.nip = "NIP wajib diisi.";
      isValid = false;
    }
    if (!form.email.trim()) {
      newErrors.email = "Email wajib diisi.";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    if (isEditMode && selectedIndex !== null) {
      const updatedData = [...data];
      updatedData[selectedIndex] = form;
      setData(updatedData);
    } else {
      setData([...data, form]);
    }

    setModalOpen(false);
  };

  const handleDelete = () => {
    const updatedData = [...data];
    updatedData.splice(deleteIndex, 1);
    setData(updatedData);
    setDeleteConfirmOpen(false);
    if ((currentPage - 1) * entriesPerPage >= updatedData.length) {
      setCurrentPage(Math.max(currentPage - 1, 1));
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 bg-white shadow-xl rounded-xl mt-5 mb-5">
      {/* Header Filter */}
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
              <option key={option} value={option}>{option}</option>
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
          <button
            className="bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-700"
            onClick={() => openModal(false)}
          >
            <FaPlus />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="py-2 text-left">Nama</th>
              <th className="py-2 text-left">NIP</th>
              <th className="py-2 text-left">Email</th>
              <th className="py-2 text-left">No HP</th>
              <th className="py-2 text-center pr-6">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {selectedData.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{item.nama}</td>
                <td className="py-2">{item.nip}</td>
                <td className="py-2">{item.email}</td>
                <td className="py-2">{item.noHp}</td>
                <td className="py-2">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-accent">
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

      {/* Modal Tambah/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">{isEditMode ? "Edit" : "Tambah"} Personil</h2>
            <div className="space-y-4">
              {["nama", "nip", "email", "noHp"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium capitalize">{field} {["nama", "nip", "email"].includes(field) && "*"}</label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    className="w-full border rounded-md p-2"
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  />
                  {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
                </div>
              ))}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-gray-600 hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Delete */}
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