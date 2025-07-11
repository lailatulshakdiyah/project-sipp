export const deleteCategoryData = async (category, id) => {
  const endpointMap = {
    Balai: () => `balai/remove/${id}`,
    Korwil: () => `korwil/remove/${id}`,
    Daops: () => `daops/remove/${id}`,
  };

  const getPath = endpointMap[category];
  if (!getPath) throw new Error(`Endpoint not defined for ${category}`);

  const endpoint = `/api/proxy/sipp-karhutla/api_v2/${getPath()}`;
  console.log("Menghapus:", category, id, endpoint);

  const res = await fetch(endpoint, {
    method: "DELETE",
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Gagal menghapus data");
  }

  return res.json();
};