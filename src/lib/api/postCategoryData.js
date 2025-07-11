import API from "./index";

export const postCategoryData = async (category, payload, action = "add") => {
  const endpointMap = {
    Balai: {
      add: "balai/add",
      save: "balai/save",
    },
    Korwil: {
      add: "korwil/add",
      save: "korwil/save",
    },
    Daops: {
      add: "daops/add",
      save: "daops/save",
    },
  };

  const endpointPath = endpointMap[category]?.[action];

  if (!endpointPath) {
    throw new Error(`Endpoint not defined for ${category} - ${action}`);
  }

  const endpoint = `/api/proxy/sipp-karhutla/api_v2/${endpointPath}`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Gagal mengirim data");
  }

  return res.json();
}