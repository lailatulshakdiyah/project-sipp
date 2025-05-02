"use client";

import { useState } from "react";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import { FiEye, FiEdit, F1Trash2 } from "react-icons/fi";
import { FaPlus } from 'react-icons/fa';

const data = [
  { nama: "Ahmad", nip: "12345", email: "ahmad@gmail.com", noHp: "081234567890" },
  { nama: "Budi", nip: "67890", email: "budi@gmail.com", noHp: "082345678901" },
  { nama: "Citra", nip: "11223", email: "citra@gmail.com", noHp: "083456789012" },
  { nama: "Dewi", nip: "44556", email: "dewi@gmail.com", noHp: "084567890123" },
  { nama: "Eka", nip: "77889", email: "eka@gmail.com", noHp: "085678901234" },
  { nama: "Fajar", nip: "99001", email: "fajar@gmail.com", noHp: "086789012345" },
];

const entriesPerPageOptions = [10, 25, 50, 100];

export default function Personil() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  
  const filteredData = data.filter((item) =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const selectedData = filteredData.slice(startIndex, startIndex + entriesPerPage);

  return (
    <div className="max-w-5xl mx-auto p-4 bg-white shadow-xl rounded-xl mt-5 mb-5">  
      <div className="flex justify-between items-center mb-4">
        <div>
          <label className="text-sm text-gray-600">
            Show {" "}
            <select
              className="border px-2 py-1 mx-2"
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              {entriesPerPageOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            entries
          </label>
        </div>

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
          <button className="bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-700">
            <FaPlus />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Nama</th>
              <th className="py-2 text-left">No Registrasi/NIP</th>
              <th className="py-2 text-left">Email</th>
              <th className="py-2 text-left">No Handphone</th>
              <th className="py-2 text-left">Aksi</th>
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
                  <div className="flex gap-2">
                    <button className="bg-blue-600 text-white p-2 rounded-xl hover:bg-[#0099CC] hover:text-black">
                      <FiEye size={20} />
                    </button>
                    <button className="bg-[#DF6D14] text-white p-2 rounded-xl hover:bg-[#FCF596] hover:text-black">
                      <FiEdit size={20} />
                    </button>
                    <button className="bg-red-600 text-white p-2 rounded-xl hover:bg-[#FFA09B] hover:text-black">
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
    </div>
  );
}