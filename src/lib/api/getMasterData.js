export const getMasterData = async () => {
  try {
    const res = await fetch("https://sipongi.menlhk.go.id/sipp-karhutla/api/lists/all", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Gagal fetch data master");

    return await res.json();
  } catch (err) {
    console.error("Fetch master data error:", err);
    return null;
  }
};