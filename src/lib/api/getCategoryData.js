import categoryEndpoints from "../constants/categoryEndpoints";
import { getAllPaginatedData } from "../api/getAllPaginatedData";

export async function getCategoryData(category, params = {}) {
  const endpointGetter = categoryEndpoints[category];
  if (!endpointGetter) return [];

  const endpoint =
    typeof endpointGetter === "function" ? endpointGetter(params) : endpointGetter;

  try {
    if (category === "Wilayah") {
      const baseUrl = `/api/proxy/sipp-karhutla/api_v2/${endpoint}`;
      const allData = await getAllPaginatedData(baseUrl);
      return allData.map((item) => ({
        id: item.id,
        nama: item.nama,
        kode: item.kode,
        desa: item.desa,
        kecamatan: item.kecamatan,
        kabupaten: item.kabupaten,
        provinsi: item.provinsi,
      }));
    }

    const res = await fetch(`/api/proxy/sipp-karhutla/api_v2/${endpoint}`);
    const json = await res.json();
    const data = json.data;

    switch (category) {
      case "Balai":
        return data.map((item) => ({
          id: item.id,
          kode: item.kode,
          nama: item.nama,
          wilayah: item.r_wilayah ? `Pulau ${item.r_wilayah.nama}` : "-",
          r_wilayah: item.r_wilayah || null,
        }));
      case "Korwil":
        return data.map((item) => ({
          id: item.id,
          kode: item.kode,
          nama: item.nama,
          daops: item.m_daops?.nama || "-",
        }));
      case "Daops":
        return data.map((item) => ({
          id: item.id,
          kode: item.kode,
          nama: item.nama,
          balai: item.r_balai?.nama || "-",
        }));
      case "Posko":
        return data.map((item) => ({
          nama: item.nama,
          daops: item.daops?.nama || "-",
          kecamatan: item.kecamatan?.nama || "-",
        }));
      default:
        return [];
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}