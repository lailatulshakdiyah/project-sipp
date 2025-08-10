"use client";

import { useEffect, useState } from "react";
import { getMasterData } from "@/lib/api/getMasterData";
import DataDarat from "../editST/DataDarat";
import DataUmum from "../editST/DataUmum";
import Observasi from "../editST/Observasi";

export default function EditSuratTugasModal({ item, onClose, onSave }) {
  const [tab, setTab] = useState("dataUmum");
  const [formData, setFormData] = useState({
    kategori_penugasan: item.kategoriPatroli || "",
    satelit: item.satelit || [],
    inventori: item.inventori || [],
    aktivitas: item.aktivitas || [],
    data_darat: {
      lokasi: {
        lat: "",
        lng: "",
        desa: "",
        kecamatan: "",
        kabupaten: "",
        provinsi: "",
      }
    }
    // tambahkan field lainnya sesuai kebutuhan
  });

  const [options, setOptions] = useState({
    kategoriPenugasan: [],
    kondisiLain: {
      kondisi_lapang: [],
      potensi_karhutla: [],
      ffcm_kkas: [],
      fwi_ick: [],
      dc_kk: [],
      aktivitas_masyarakat: [],
    },
    cuacaDropdown: item.cuaca || [],
    aksesibilitas: item.aksebilitas || "",
  });

  // Fungsi handle input biasa
  const handleChange = (fieldName, value) => {
  setFormData((prev) => ({
    ...prev,
    [fieldName]: value,
  }));
};


  // Fungsi handle checkbox
  const handleCheckbox = (name, value) => {
    setFormData((prev) => {
      const current = prev[name] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return {
        ...prev,
        [name]: updated,
      };
    });
  };

  const handleNestedChange = (path, value) => {
    setFormData((prevData) => {
      const keys = path.split(".");
      const updatedData = { ...prevData };
      let current = updatedData;

      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          current[key] = value;
        } else {
          if (!current[key]) current[key] = {};
          current = current[key];
        }
      });

      return updatedData;
    });
  };

  useEffect(() => {
    async function fetchMasterData() {
      try {
        const data = await getMasterData();
        console.log("📦 Data mentah dari getMasterData:", data);
        setOptions((prev) => ({
          ...prev,
          kategoriPenugasan: data.kategoriPatroli || [],
          kondisiLain: {
            kondisi_lapang: data.GC_Kondisi || [],
            potensi_karhutla: data.PotensiKarhutla || [],
            ffcm_kkas: data.FFMC_KKAS || [],
            fwi_ick: data.FWI_ICK || [],
            dc_kk: data.DC_KK || [],
            aktivitas_masyarakat: data.AktivitasMasyarakat || [],
          },
        }));
      } catch (error) {
        console.error("Gagal mengambil master data:", error);
      }
    }
    fetchMasterData();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
      <div className="bg-white p-6 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Edit Surat Tugas - {item.nomor}</h2>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b pb-2">
          {["dataUmum", "dataDarat", "observasi"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`font-medium ${tab === t ? "text-blue-600 border-b-2 border-blue-600" : ""}`}
            >
              {t === "dataUmum" ? "Data Umum" : t === "dataDarat" ? "Data Darat" : "Observasi"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {tab === "dataUmum" && (
          <DataUmum
            item={item}
            formData={formData}
            options={options}
            handleChange={handleChange}
            handleCheckbox={handleCheckbox}
          />
        )}
        {tab === "dataDarat" && 
          <DataDarat 
            item={item} 
            options={options} 
            formData={formData} 
            onChange={handleNestedChange}
            handleChange={handleChange} 
            handleCheckbox={handleCheckbox}
          /> 
        }

        {tab === "observasi" && <Observasi item={item} />}

        {/* Actions */}
        <div className="flex justify-end mt-6 space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Batal
          </button>
          <button
            onClick={() => {
              console.log("📨 Data yang akan disimpan:", formData);
              // onSave({...formData, ...dataDarat, ...observasi})
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}