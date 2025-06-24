import categoryEndpoints from "../constants/categoryEndpoints";

export async function getCategoryData(category, params = {}) {
  const endpointGetter = categoryEndpoints[category];
  if (!endpointGetter) return [];

  const endpoint =
    typeof endpointGetter === "function" ? endpointGetter(params) : endpointGetter;

  try {
    const res = await fetch(`/api/proxy/sipp-karhutla/api_v2/${endpoint}`);
    const json = await res.json();
    console.log("APi Response:", json);

    const dataArray = Array.isArray(json.data)
      ? json.data
      : Array.isArray(json.data?.data)
      ? json.data.data
      : [];

    switch (category) {
      case "Balai":
        return json.data.map((item) => ({
          kode: item.kode,
          nama: item.nama,
          wilayah: item.r_wilayah ? `Pulau ${item.r_wilayah.nama}` : "-",
        }));
      case "Korwil":
        return json.data.map((item) => ({
          kode: item.kode,
          nama: item.nama,
          daops: item.m_daops?.nama || "-",
        }));
      case "Daops":
        return json.data.map((item) => ({
          kode: item.kode,
          nama: item.nama,
          balai: item.r_balai?.nama || "-",
        }));
      case "Posko":
        return json.data.map((item) => ({
          nama: item.nama,
          daops: item.daops?.nama || "-",
          kecamatan: item.kecamatan?.nama || "-",
        }));
      case "Wilayah":
        const rawData = Array.isArray(json.data?.data) ? json.data.data : [];
        return rawData.map((item) => ({
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