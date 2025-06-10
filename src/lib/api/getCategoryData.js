import categoryEndpoints from "../constants/categoryEndpoints";

export async function getCategoryData(category) {
  const endpoint = categoryEndpoints[category];
  if (!endpoint) return [];

  try {
    const res = await fetch(`/api/proxy/sipp-karhutla/api_v2/${endpoint}`);
    const json = await res.json();

    // Sesuaikan transformasi data sesuai struktur masing-masing kategori
    switch (category) {
      case "Balai":
        return json.data.map((item) => ({
          kode: item.kode,
          nama: item.nama,
          wilayah: item.wilayah?.nama || "-",
        }));
      case "Korwil":
        return json.data.map((item) => ({
          kode: item.kode,
          nama: item.nama,
          daops: item.daops?.nama || "-",
        }));
      case "Daops":
        return json.data.map((item) => ({
          kode: item.kode,
          nama: item.nama,
          balai: item.balai?.nama || "-",
        }));
      case "Posko":
        return json.data.map((item) => ({
          nama: item.nama,
          daops: item.daops?.nama || "-",
          kecamatan: item.kecamatan?.nama || "-",
        }));
      case "Wilayah":
        return json.data.map((item) => ({
          kode: item.kode,
          desa: item.desa,
          kecamatan: item.kecamatan,
          kabupaten: item.kabupaten,
          provinsi: item.provinsi,
        }));
      default:
        return [];
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}