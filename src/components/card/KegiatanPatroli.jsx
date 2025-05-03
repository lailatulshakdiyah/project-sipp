"use client";

import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { FaMapMarkerAlt } from "react-icons/fa";

const entriesPerPageOptions = [10, 25, 50, 100];

export default function KegiatanPatroli() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (tanggal) => {
    if (!tanggal) return;
    setIsLoading(true);
    setError(null);
  
    try {
      // Gunakan langsung format YYYY-MM-DD
      const formattedDate = tanggal;
      console.log(`Tanggal yang dikirim ke API: ${formattedDate}`);
  
      const response = await fetch(`https://sipongi.menlhk.go.id/sipp-karhutla/api/karhutla/list?tanggal_patroli=${formattedDate}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
  
      // Pastikan ada data
      if (!result.data || result.data.length === 0) {
        console.log("Tidak ada data yang diterima dari API untuk tanggal tersebut.");
        setIsLoading(false);
        setData([]); // kosongkan data jika tidak ada
        return;
      }
  
      // Proses data
      const parsedData = result.data.flat().map((item, index) => {
        const daerahPatroli = 
          typeof item.id_daerah_patroli === "object"
            ? item.id_daerah_patroli
            : item.regu_patroli?.daerah ?? {};
  
        const reguPatroli = item.regu_patroli ?? {};
  
        console.log(`Item ${index + 1}:`);
        console.log("  - nama_daops:", daerahPatroli?.nama_daops);
        console.log("  - kegiatan:", item.kategori_patroli);
        console.log("  - daerah:", daerahPatroli?.nama_wilayah);
        console.log("  - ketua_regu:", reguPatroli?.ketua?.nama);
  
        return {
          nama_daops: daerahPatroli?.nama_daops || "-",
          kegiatan: item.kategori_patroli || "-",
          daerah: daerahPatroli?.nama_wilayah || "-",
          ketua_regu: reguPatroli?.ketua?.nama || "-",
          aksi: (() => {
            const jenis = item.id_regu_tim_patroli?.[0]?.jenis_patroli?.toLowerCase();
            if (jenis === "pemadaman") return "🔥";
            if (jenis === "rutin") return "🔄";
            if (jenis === "terpadu") return "🔗";
            if (jenis === "mandiri") return "🧭";
            return "🔵";
          })(),
        };
      });
  
      setData(parsedData);
      console.log("Data final untuk table:", parsedData[0]);
    } catch (err) {
      console.error("Terjadi kesalahan saat fetch:", err);
      setError(err.message);
      setData([]); // kosongkan data saat error
    } finally {
      setIsLoading(false);
    }
  };  

  console.log("data nig", data)

  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]); // setiap tanggal berubah, fetch data baru

  const filteredData = data.filter((item) =>
    item.kegiatan?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const selectedData = filteredData.slice(startIndex, startIndex + entriesPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white shadow-xl rounded-xl p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          {/* Date Picker */}
          <div className="flex items-center space-x-2">
            <label htmlFor="date" className="text-sm text-gray-700">
              Pilih Tanggal:
            </label>
            <input
              type="date"
              id="date"
              className="border border-gray-300 rounded-md px-2 py-1 text-sm"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Entries Selection + Search */}
          <div className="flex items-center gap-2">
            <label htmlFor="entries" className="text-sm text-gray-700">
              Show{" "}
              <select
                className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                value={entriesPerPage}
                onChange={(e) => {
                  setEntriesPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                {entriesPerPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>{" "}
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
        </div>

        {/* Loading / Error */}
        {isLoading && <p className="text-center py-10">Loading...</p>}
        {error && <p className="text-center text-red-500 py-10">{error}</p>}

        {/* Table */}
        {!isLoading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="border-b">
                <tr>
                  <th className="py-2">Daerah Operasi</th>
                  <th className="py-2">Kegiatan</th>
                  <th className="py-2">Daerah Patroli</th>
                  <th className="py-2">Ketua Regu</th>
                  <th className="py-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {selectedData.length > 0 ? (
                  selectedData.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{item.nama_daops}</td>
                      <td className="py-2">{item.kegiatan}</td>
                      <td className="py-2">{item.daerah}</td>
                      <td className="py-2">{item.ketua_regu}</td>
                      <td className="py-2">
                        <FaMapMarkerAlt
                          size={30}
                          className={`${
                            item.aksi === "🔥"
                              ? "text-[#FF0000]"
                              : item.aksi === "🔄"
                              ? "text-[#F9C132]"
                              : item.aksi === "🔗"
                              ? "text-[#52AF53]"
                              : "text-[#006BFF]"
                          }`}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-4 text-center text-gray-500">
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer Pagination */}
        {!isLoading && !error && (
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, totalEntries)} of {totalEntries} entries
            </p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded-xl ${
                  currentPage === 1 ? "text-gray-400" : "hover:bg-gray-200"
                }`}
              >
                &lt; Previous
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded-xl ${
                    currentPage === i + 1 ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded-xl ${
                  currentPage === totalPages ? "text-gray-400" : "hover:bg-gray-200"
                }`}
              >
                Next &gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}