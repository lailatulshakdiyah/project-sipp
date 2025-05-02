"use client";

import { useState } from "react";
import { FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";

const dataOptions = {
  Daops: [
    { nama: "User A", nip: "123456", email: "usera@example.com", organisasi: "Daops Alfa", hakAkses: "Admin" },
    { nama: "User B", nip: "789012", email: "userb@example.com", organisasi: "Daops Beta", hakAkses: "User" },
  ],
  Korwil: [
    { nama: "User C", nip: "345678", email: "userc@example.com", organisasi: "Korwil X", hakAkses: "Admin" },
    { nama: "User D", nip: "901234", email: "userd@example.com", organisasi: "Korwil Y", hakAkses: "User" },
  ],
  "Balai/Pusat": [
    { nama: "User E", nip: "567890", email: "usere@example.com", organisasi: "Balai A", hakAkses: "Admin" },
    { nama: "User F", nip: "234567", email: "userf@example.com", organisasi: "Balai B", hakAkses: "User" },
  ],
};

const headers = ["Nama", "No Registrasi/NIP", "Email", "Organisasi", "Hak Akses", "Aksi"];
const entriesPerPageOptions = [10, 25, 50, 100];

export default function Akses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("Daops");
  
  const categories = Object.keys(dataOptions);
  const filteredData = dataOptions[selectedCategory].filter((item) =>
    Object.values(item).some((val) => val.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const selectedData = filteredData.slice(startIndex, startIndex + entriesPerPage);

  return (
    <div className="max-w-5xl mx-auto p-4 bg-white shadow-xl rounded-xl mt-5 mb-5">
      {/* Kategori */}
      <div className="flex justify-center items-center mb-4">
        {categories.map((category) => (
          <button 
            key={category} 
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }} 
            className={`px-4 py-2 mx-2 border rounded-xl ${selectedCategory === category ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Search dan Show Entries */}
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
            {entriesPerPageOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          entries
        </label>
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
      </div>
      
      {/* Tabel */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              {headers.map((header) => (
                <th key={header} className="py-2 text-left">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectedData.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{item.nama}</td>
                <td className="py-2">{item.nip}</td>
                <td className="py-2">{item.email}</td>
                <td className="py-2">{item.organisasi}</td>
                <td className="py-2">{item.hakAkses}</td>
                <td className="py-2 flex gap-2">
                  <button className="bg-[#DF6D14] text-white p-2 rounded-xl hover:bg-[#FCF596] hover:text-black">
                    <FiEdit size={20} />
                  </button>
                  <button className="bg-red-600 text-white p-2 rounded-xl hover:bg-[#FFA09B] hover:text-black">
                    <FiTrash2 size={20} />
                  </button>
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
    </div>
  );  
}
