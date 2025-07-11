export async function getAllPaginatedData(baseUrl) {
  let allData = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const res = await fetch(`${baseUrl}&page=${page}&per_page=${perPage}`);
    if (!res.ok) {
      console.error(`Failed to fetch page ${page}:`, res.statusText);
      break;
    }

    let json;
    try {
      json = await res.json();
    } catch (err) {
      console.error(`Error parsing JSON on page ${page}:`, err);
      break;
    }

    const pageData = json?.data?.data || json?.data || [];
    if (pageData.length === 0) break;

    allData.push(...pageData);

    const totalPage = Number(json.data?.total_page || 1);
    if (page >= totalPage) break;

    page++;
  }

  return allData;
}