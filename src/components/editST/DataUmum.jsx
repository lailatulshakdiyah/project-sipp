import { useEffect, useState } from "react";
import { getMasterData } from "@/lib/api/getMasterData";

export default function DataUmum({ formData = {}, handleChange, handleCheckbox }) {
  const [options, setOptions] = useState({
    kategoriPenugasan: [],
    satelitHotspot: [],
    inventoriPatroli: [],
    aktivitasHarian: [],
  });

  useEffect(() => {
  async function fetchDataUmumOptions() {
    try {
      const res = await getMasterData();
      const parsed = {
        kategoriPenugasan: (res?.data?.KategoriPatroli || []).map((item) => ({
          value: item.id,
          label: item.text,
        })),
        satelitHotspot: (res?.data?.Satelit || []).map((item) => ({
          value: item.id,
          label: item.text,
        })),
        inventoriPatroli: (res?.data?.Inventori || []).map((item) => ({
          value: item.id,
          label: item.text,
        })),
        aktivitasHarian: (res?.data?.AktivitasHarian || []).map((item) => ({
          value: item.id,
          label: item.text,
        })),
      };

      // Cek di konsol
      console.log("Parsed DataUmum Options:", parsed);

      setOptions(parsed);
    } catch (error) {
      console.error("Gagal mengambil data umum:", error);
    }
  }

  fetchDataUmumOptions();
}, []);

  return (
    <div className="space-y-4">
      {/* Dropdown Kategori Penugasan */}
      <div>
        <label className="block text-xl font-semibold mb-1">Kategori Penugasan</label>
        <select
            className="w-full border p-2 rounded"
            value={formData.KategoriPatroli || ""}
            onChange={(e) => handleChange("kategori_penugasan", e.target.value)}
            >
            <option value="">Pilih Kategori</option>
            {options.kategoriPenugasan.map((opt) => (
                <option key={opt.value} value={opt.value}>
                {opt.label}
                </option>
            ))}
            </select>
        </div>

      {/* Checkbox Satelit Hotspot */}
      <div>
        <label className="block text-xl font-semibold mb-1">Satelit Hotspot</label>
        <div className="grid grid-cols-2 gap-2">
          {options.satelitHotspot.map((item) => (
            <label key={item.id} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.satelit?.includes(item.value)}
                onChange={() => handleCheckbox("satelit", item.value)}
                className="mr-2"
                />
              {item.label}
            </label>
          ))}
        </div>
      </div>

      {/* Checkbox Inventori Patroli */}
      <div>
        <label className="block text-xl font-semibold mb-1">Inventori Patroli</label>
        <div className="grid grid-cols-2 gap-2">
          {options.inventoriPatroli.map((item) => (
            <label key={item.id} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.inventori_patroli?.includes(item.value)}
                onChange={() => handleCheckbox("inventori_patroli", item.value)}
                className="mr-2"
              />
              {item.label}
            </label>
          ))}
        </div>
      </div>

      {/* Checkbox Aktivitas Harian */}
      <div>
        <label className="block text-xl font-semibold mb-1">Aktivitas Harian</label>
        <div className="grid grid-cols-2 gap-2">
          {options.aktivitasHarian.map((item) => (
            <label key={item.id} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.aktivitas_harian?.includes(item.value)}
                onChange={() => handleCheckbox("aktivitas_harian", item.value)}
                className="mr-2"
              />
              {item.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};