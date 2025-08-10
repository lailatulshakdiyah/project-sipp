"use client";

import { useEffect, useState } from "react";
import { FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { getCategoryData } from "@/lib/api/getCategoryData";
import CustomPagination from "../shared/CustomPagination";
import { postCategoryData } from "@/lib/api/postCategoryData";
import { deleteCategoryData } from "@/lib/api/deleteCategoryData";

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
  const [selectedCategory, setSelectedCategory] = useState("Korwil");
  const [dataOptions, setDataOptions] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newData, setNewData] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [editedData, setEditedData] = useState({});


  const categories = Object.keys(headers);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getCategoryData(selectedCategory);
        setDataOptions((prev) => ({ ...prev, [selectedCategory]: res }));

        if (selectedCategory === "Balai") {
          const balaiData = await getCategoryData("Balai");
          const wilayahData = [];

          balaiData.forEach((item) => {
            const wilayah = item.r_wilayah;
            if (wilayah && wilayah.tipe === "Pulau" && !wilayahData.find((w) => w.id === wilayah.id)) {
              wilayahData.push({ id: wilayah.id, nama: wilayah.nama });
            }
          });

          setDataOptions((prev) => ({ ...prev, Balai: balaiData, WilayahBalai: wilayahData }));
        }

        if (selectedCategory === "Korwil") {
          const daopsData = await getCategoryData("Daops");
          setDataOptions((prev) => ({ ...prev, DaopsKorwil: daopsData }));
        }

        if (selectedCategory === "Daops") {
          const balaiData = await getCategoryData("Balai");
          setDataOptions((prev) => ({ ...prev, BalaiDaops: balaiData }));
        }
      } catch (err) {
        console.error("Error fetching:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCategory]);

  const renderModalContent = () => {
    const commonInput = (label, key) => (
      <input
        type="text"
        placeholder={label}
        value={newData[key] || ""}
        onChange={(e) => setNewData((prev) => ({ ...prev, [key]: e.target.value }))}
        className="w-full border px-3 py-2 rounded-lg"
      />
    );

    switch (selectedCategory) {
      case "Balai":
        return (
          <>
            {commonInput("Kode Balai", "kode")}
            {commonInput("Nama Balai", "nama")}
            <select
              value={newData.r_wilayah_id || ""}
              onChange={(e) => setNewData((prev) => ({ ...prev, r_wilayah_id: e.target.value }))}
              className="w-full border px-3 py-2 rounded-lg"
            >
              <option value="">Wilayah</option>
              {(dataOptions.WilayahBalai || []).map((w) => (
                <option key={w.id} value={w.id}>Pulau {w.nama}</option>
              ))}
            </select>
          </>
        );
      case "Korwil":
        return (
          <>
            {commonInput("Kode Korwil", "kode")}
            {commonInput("Nama Korwil", "nama")}
            <select
              value={newData.daops_id || ""}
              onChange={(e) => setNewData((prev) => ({ ...prev, daops_id: e.target.value }))}
              className="w-full border px-3 py-2 rounded-lg"
            >
              <option value="">Daops</option>
              {(dataOptions.DaopsKorwil || []).map((d) => (
                <option key={d.id} value={d.id}>{d.nama}</option>
              ))}
            </select>
          </>
        );
      case "Daops":
        return (
          <>
            {commonInput("Kode Daops", "kode")}
            {commonInput("Nama Daops", "nama")}
            <select
              value={newData.balai_id || ""}
              onChange={(e) => setNewData((prev) => ({ ...prev, balai_id: e.target.value }))}
              className="w-full border px-3 py-2 rounded-lg"
            >
              <option value="">Balai</option>
              {(dataOptions.BalaiDaops || []).map((b) => (
                <option key={b.id} value={b.id}>{b.nama}</option>
              ))}
            </select>
          </>
        );
      default:
        return null;
    }
  };

  const currentData = dataOptions[selectedCategory] || [];
  const filteredData = currentData.filter((item) => {
    return Object.values(item).some((val) => {
      if (typeof val === "string") return val.toLowerCase().includes(searchTerm.toLowerCase());
      if (typeof val === "object" && val !== null && "nama" in val) return val.nama.toLowerCase().includes(searchTerm.toLowerCase());
      return false;
    });
  });

  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const selectedData = filteredData.slice(startIndex, startIndex + entriesPerPage);

  const renderTableRow = (item, isEditing = false) => {
    const createCell = (value, key) => {
      return isEditing ? (
        <input 
          className="border px-2 py-1 rounded-sm w-full" 
          value={editedData[key] || ""} 
          onChange={(e) => 
            setEditedData((prev) => ({ ...prev, [key]: e.target.value }))
          }
        />
      ) : (
        value
      )
    }

    switch (selectedCategory) {
      case "Balai":
        return (
          <>
            <td className="py-2 px-4">{createCell(item.kode, "kode")}</td>
            <td className="py-2 px-4">{createCell(item.nama, "nama")}</td>
            <td className="py-2 px-4">{item.wilayah}</td>
          </>
        );
      case "Korwil":
        return (
          <>
            <td className="py-2 px-4">{createCell(item.kode, "kode")}</td>
            <td className="py-2 px-4">{createCell(item.nama, "nama")}</td>
            <td className="py-2 px-4">{item.daops}</td>
          </>
        );
      case "Daops":
        return (
          <>
            <td className="py-2 px-4">{createCell(item.kode, "kode")}</td>
            <td className="py-2 px-4">{createCell(item.nama, "nama")}</td>
            <td className="py-2 px-4">{item.balai}</td>
          </>
        );
      case "Posko":
        return (
          <>
            <td className="py-2 px-4">{item.nama}</td>
            <td className="py-2 px-4">{item.daops}</td>
            <td className="py-2 px-4">{item.kecamatan}</td>
          </>
        );
      case "Wilayah":
        return (
          <>
            <td className="py-2 px-4">{item.kode}</td>
            <td className="py-2 px-4">{item.desa}</td>
            <td className="py-2 px-4">{item.kecamatan}</td>
            <td className="py-2 px-4">{item.kabupaten}</td>
            <td className="py-2 px-4">{item.provinsi}</td>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 bg-white shadow-xl rounded-xl mt-5 mb-5">
      <div className="flex justify-center items-center mb-4 flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 border rounded ${
              selectedCategory === category ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
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
          {(selectedCategory === "Balai" || selectedCategory === "Korwil" || selectedCategory === "Daops") && (
            <button
              onClick={() => {
                setShowModal(true);
                setNewData({});
              }}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            >
              <FaPlus />
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              {headers[selectedCategory].map((header) => (
                <th
                  key={header}
                  className={`py-2 px-4 ${header === "Aksi" ? "text-center w-[140px]" : "text-left"}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectedData.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                {renderTableRow(editIndex === index ? editedData : item, index === editIndex)}
                {selectedCategory !== "Posko" && selectedCategory !== "Wilayah" && (
                  <td className="py-2 text-center">
                    <div className="flex justify-center gap-2 items-center">
                      {/* {editIndex === index ? (
                        <button
                          onClick={() => {
                            setEditIndex(null);
                            setEditedData({});
                          }}
                          className="bg-green-600 text-white p-2 rounded-xl hover:bg-green-800"
                        >
                          Simpan
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setEditIndex(index);
                            setEditedData({ ...selectedData[index] });
                          }}
                          className="bg-[#DF6D14] text-white p-2 rounded-xl hover:bg-[#FCF596] hover:text-black"
                        >
                          <FiEdit size={20} />
                        </button>
                      )} */}
                      <button
                        onClick={async () => {
                          const confirmDelete = confirm("Yakin Ingin Menghapus Data?");
                          if (!confirmDelete) return;

                          try {
                            await deleteCategoryData(selectedCategory, item.id);
                            const updated = await getCategoryData(selectedCategory);
                            setDataOptions((prev) => ({ ...prev, [selectedCategory]: updated }));
                          } catch (err) {
                            alert("Gagal menghapus data: " + err.message);
                          }
                        }}
                        className="bg-red-600 text-white p-2 rounded hover:text-black"
                      >
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

      {showModal && (selectedCategory === "Balai" || selectedCategory === "Korwil" || selectedCategory === "Daops") && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold mb-2">Tambah {selectedCategory}</h2>
            {renderModalContent()}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                onClick={async () => {
                  try {
                    await postCategoryData(selectedCategory, newData)
                    setShowModal(false)
                    const updated = await getCategoryData(selectedCategory)
                    setDataOptions((prev) => ({ ...prev, [selectedCategory]: updated }))
                  } catch {
                    alert("Gagal menambahkan data!");
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800"
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