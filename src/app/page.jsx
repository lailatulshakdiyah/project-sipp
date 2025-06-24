"use client";

// import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { useState, useEffect, useRef } from "react";
import PatrolStat from "@/components/card/PatrolStat";
import KegiatanPatroli from "@/components/card/KegiatanPatroli";
import Map from "@/components/map/Map";
import DateInput from "@/components/card/DateInput";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });

  const flyToRef = useRef();
  const [markerData, setMarkerData] = useState([]);
  const [groupedData, setGroupedData] = useState({
    mandiri: 0,
    rutin: 0,
    terpadu: 0,
    pemadaman: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (tanggal) => {
    if (!tanggal) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://sipongi.menlhk.go.id/sipp-karhutla/api/karhutla/list?tanggal_patroli=${tanggal}`
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();

      const parsedData = result.data
      .flat()
      .filter((item) => item.laporanDarat && item.laporanDarat.length > 0) 
      .map((item) => {
        const daerahPatroli =
          typeof item.id_daerah_patroli === "object"
            ? item.id_daerah_patroli
            : item.regu_patroli?.daerah ?? {};

        const reguPatroli = item.regu_patroli ?? {};
        const laporan = item.laporanDarat?.[0];

        return {
          nama_daops: daerahPatroli?.nama_daops || "-",
          kegiatan: item.kategori_patroli || "-",
          daerah: laporan?.desa_kelurahan || "-",
          ketua_regu: reguPatroli?.ketua?.nama || "-",
          jenis: item.kategori_patroli || "-",
          aksi: (() => {
            const kategori = (item.kategori_patroli ?? "").trim().toLowerCase();
            if (kategori === "patroli mandiri") return "Patroli Mandiri";
            if (kategori === "patroli rutin") return "Patroli Rutin";
            if (kategori === "patroli terpadu") return "Patroli Terpadu";
            if (kategori === "pemadaman") return "Pemadaman";
            return "-";
          })(),
          lat: laporan?.latitude ? parseFloat(laporan.latitude) : null,
          lng: laporan?.longitude ? parseFloat(laporan.longitude) : null,
          nama: laporan?.desa_kelurahan,
          kode_laporan: item?.id_laporan_header,
            // ? `${laporan.desa_kelurahan}, ${laporan.kecamatan}, ${laporan.kabupaten}`
            // : "-",
        };
      });

      setMarkerData(parsedData);

      const grouped = {
        mandiri: 0,
        rutin: 0,
        terpadu: 0,
        pemadaman: 0,
      };

      const aksiMap = {
        "Patroli Mandiri": "mandiri",
        "Patroli Rutin": "rutin",
        "Patroli Terpadu": "terpadu",
        "Pemadaman": "pemadaman",
      }

      parsedData.forEach((item) => {
        const aksiKey = aksiMap[item.aksi];
        if (aksiKey) grouped[aksiKey]++;
      });

      setGroupedData(grouped);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
      setMarkerData([]);
      setGroupedData({ mandiri: 0, rutin: 0, terpadu: 0, pemadaman: 0 });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]);

  return (
    <main>
      <Header />
      <div className="h-screen w-full relative z-0">
        <Map selectedDate={selectedDate} markerData={markerData} flyToRef={flyToRef}/>
      </div>

      {/* PatrolStat */}
      <div className="-mt-72 mb-10">
        <PatrolStat selectedDate={selectedDate} groupedData={groupedData} />
      </div>

      <h1 className="text-4xl font-bold text-accent text-center">
        Kegiatan Patroli
      </h1>

      {/* input date */}
      <div>
        <DateInput onDateChange={setSelectedDate} />
      </div>

      {/* table kegiatan patroli */}
      <div>
        <KegiatanPatroli
          onFlyTo={flyToRef}
          selectedDate={selectedDate}
          data={markerData}
          isLoading={isLoading}
          error={error}
        />
      </div>

      {/* footer section */}
      {/* <Footer /> */}
    </main>
  );
}
