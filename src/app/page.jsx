"use client";

import Header from "@/components/header/Header";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/map/Map"), {
  ssr: false,
});
const PatrolStat = dynamic(() => import("@/components/card/PatrolStat"), {
  ssr: false,
});
const KegiatanPatroli = dynamic(
  () => import("@/components/card/KegiatanPatroli"),
  {
    ssr: false,
  }
);
const DateInput = dynamic(() => import("@/components/card/DateInput"), {
  ssr: false,
});

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(null);
  const flyToRef = useRef(null);
  const [markerData, setMarkerData] = useState([]);
  const [groupedData, setGroupedData] = useState({
    mandiri: 0,
    rutin: 0,
    terpadu: 0,
    pemadaman: 0,
  });

  const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
  }, []);

  useEffect(() => {
    const updateOnlineStatus = () => {
      if (typeof navigator !== "undefined") {
        setIsOnline(navigator.onLine);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("online", updateOnlineStatus);
      window.addEventListener("offline", updateOnlineStatus);

      return () => {
        window.removeEventListener("online", updateOnlineStatus);
        window.removeEventListener("offline", updateOnlineStatus);
      };
    }
  }, []);

  const fetchData = async (tanggal) => {
    if (!tanggal) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://sipongi.menlhk.go.id/sipp-karhutla/api/karhutla/list?tanggal_patroli=${tanggal}`
      );

      if (response.status === 503) {
        throw new Error("Layanan sedang tidak tersedia");
      }

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
              const kategori = (item.kategori_patroli ?? "")
                .trim()
                .toLowerCase();
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
        Pemadaman: "pemadaman",
      };

      parsedData.forEach((item) => {
        const aksiKey = aksiMap[item.aksi];
        if (aksiKey) grouped[aksiKey]++;
      });

      setGroupedData(grouped);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOnline && selectedDate) {
      fetchData(selectedDate);
    } else if (!isOnline) {
      setError("Tidak ada koneksi internet");
    }
  }, [selectedDate, isOnline]);

  if (!isOnline) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen text-red-600">
        <h1 className="text-2xl font-bold">⚠ Tidak Ada Koneksi Internet</h1>
        <p>Silahkan periksa jaringan Anda untuk melanjutkan.</p>
      </main>
    );
  }

  return (
    <main>
      <Header />

      <div className="h-screen w-full relative z-0">
        {selectedDate && (
          <Map
            selectedDate={selectedDate}
            markerData={markerData}
            flyToRef={flyToRef}
          />
        )}
      </div>

      <div className="-mt-72 mb-10">
        <PatrolStat selectedDate={selectedDate} groupedData={groupedData} />
      </div>

      <div className="w-full py-6 sm:px-6 lg:px-8 mt-12 mb-4">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-5xl font-bold text-accent text-center">
            Kegiatan Patroli
          </h1>
          <div className="sticky w-full mx-auto">
            <div className="rounded-lg p-4 sm:p-6 lg:p-8 bg-white flex justify-start ml-6 pl-8">
              <DateInput onDateChange={setSelectedDate} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <KegiatanPatroli
          onFlyTo={flyToRef}
          selectedDate={selectedDate}
          data={markerData}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </main>
  );
}
