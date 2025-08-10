"use client";

import { useState, useEffect } from "react";
import { FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";
import CustomPagination from "../shared/CustomPagination";

const entriesPerPageOptions = [10, 25, 50, 100];

export default function Akses({ categorizedData = {} }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const headers = ["Nama", "No Registrasi/NIP", "Email", "Organisasi", "Hak Akses"];
  const categories = Object.keys(categorizedData);
  const defaultCategory = categories[0] || "";
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  const currentCategoryData = categorizedData[selectedCategory] || [];
  const filteredData = currentCategoryData.filter((item) =>
    Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
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
            className={`px-4 py-2 mx-2 border rounded ${selectedCategory === category ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
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
            <tr className="border-b bg-gray-100">
              {headers.map((header) => (
                <th key={header} className="py-2 px-4 text-left">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectedData.length === 0 ? (
              <tr>
                <td colSpan={headers.length} className="text-center py-4 text-gray-500">
                  Tidak ada data ditemukan.
                </td>
              </tr>
            ) : (
              selectedData.map((item, index) => (
                <tr key={item.nip || index} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{item.nama}</td>
                  <td className="py-2 px-4">{item.nip}</td>
                  <td className="py-2 px-4">{item.email}</td>
                  <td className="py-2 px-4">{item.organisasi}</td>
                  <td className="py-2 px-4">{item.hakAkses}</td>
                  {/* <td className="py-2">
                    <div className="flex gap-2 items-center">
                      <button className="bg-[#DF6D14] text-white p-2 rounded-xl hover:bg-[#FCF596] hover:text-black">
                        <FiEdit size={20} />
                      </button>
                      <button className="bg-red-600 text-white p-2 rounded-xl hover:bg-[#FFA09B] hover:text-black">
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                  </td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {loading ? (
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
  );  
}
