"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { FaPlus } from 'react-icons/fa'

const dataOptions = {
  Balai: [
    { kode: "B001", nama: "Balai A", wilayah: "Wilayah 1" },
    { kode: "B002", nama: "Balai B", wilayah: "Wilayah 2" },
  ],
  Korwil: [
    { kode: "K001", nama: "Korwil X", daops: "Daops 1" },
    { kode: "K002", nama: "Korwil Y", daops: "Daops 2" },
  ],
  Daops: [
    { kode: "D001", nama: "Daops Alfa", balai: "Balai A" },
    { kode: "D002", nama: "Daops Beta", balai: "Balai B" },
  ],
  Posko: [
    { nama: "Posko Utama", daops: "Daops Alfa", kecamatan: "Cimenyan" },
    { nama: "Posko Sekunder", daops: "Daops Beta", kecamatan: "Cilengkrang" },
  ],
  Wilayah: [
    { kode: "001", desa: "Tanjungwangi", kecamatan: "Pacet", kabupaten: "Bandung", provinsi: "Jawa Barat" },
    { kode: "002", desa: "Ciburial", kecamatan: "Cimenyan", kabupaten: "Bandung", provinsi: "Jawa Barat" },
  ],
};

const headers = {
  Balai: ["Kode Balai", "Nama Balai", "Wilayah", "Aksi"],
  Korwil: ["Kode Korwil", "Nama Korwil", "Daops", "Aksi"],
  Daops: ["Kode", "Nama Daops", "Balai", "Aksi"],
  Posko: ["Nama Posko", "Daops", "Kecamatan"],
  Wilayah: ["Kode Wilayah", "Desa/Kelurahan", "Kecamatan", "Kabupaten", "Provinsi"],
};

const entriesPerPageOptions = [10, 25, 50, 100];

export default function Wilayah() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("Wilayah");
  
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
              {headers[selectedCategory].map((header) => (
                <th key={header} className="py-2 text-left">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectedData.map((item, index) => (
              <tr key={index} className="border-b">
                {Object.values(item).map((val, i) => (
                  <td key={i} className="py-2">{val}</td>
                ))}
                {selectedCategory !== "Posko" && selectedCategory !== "Wilayah" && (
                  <td className="py-2 flex gap-2">
                    <div className="flex gap-2">
                      <button className="bg-[#DF6D14] text-white p-2 rounded-xl hover:bg-[#FCF596] hover:text-black">
                        <FiEdit size={20} />
                      </button>
                      <button className="bg-red-600 text-white p-2 rounded-xl hover:bg-[#FFA09B] hover:text-black">
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                    
                    
                  </td>
                )}
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