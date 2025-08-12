"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import favicon from "@/assets/img/sipp-favicon.png";
import HeaderLog from "@/components/header/HeaderLog";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/map/Map"), {
  ssr: false,
});
const PatrolStat = dynamic(() => import("@/components/card/PatrolStat"), {
  ssr: false,
});

const DEFAULT_CENTER = [-6.208763, 106.845599];

export default function Homepage() {
  const [isClient, setIsClient] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [markerData, setMarkerData] = useState([]);
  const [groupedData, setGroupedData] = useState({
    mandiri: 0,
    rutin: 0,
    terpadu: 0,
    pemadaman: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
  }, []);

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
    <div>
      <HeaderLog />
      {isClient && selectedDate && (
        <>
          <div className="h-screen w-full relative z-0">
            <Map
              selectedDate={selectedDate}
              markerData={markerData}
              DEFAULT_CENTER={DEFAULT_CENTER}
            />
          </div>

          <div className="mb-10 -mt-72">
            <PatrolStat selectedDate={selectedDate} groupedData={groupedData} />
          </div>
        </>
      )}

      <div className="max-w-screen-xl mx-auto flex items-center p-6 py-6 rounded-xl shadow-xl bg-white">
        {/* deskripsion sistem informasi */}
        <div className="flex-1">
          <h2 className="text-3xl font-semibold text-accent mb-2">
            SIPP Karhutla
          </h2>
          <p className="text-black text-xl text-justify">
            Sistem Informasi Patroli Pencegahan Kebakaran Hutan dan Lahan (SIPP
            Karhutla) merupakan sebuah sistem informasi pengelolaan data patroli
            pencegahan Karhutla yang terdiri dari Patroli Mandiri, Patroli
            Rutin, Patroli Terpadu, dan Pemadaman untuk mendukung pencegahan
            Karhutla yang efektif dan efisien.
          </p>
        </div>

        {/* Logo sistem informasi */}
        <div className="flex-shrink-0 ml-10">
          <Image
            src={favicon}
            alt="sipp-favicon"
            width={150}
            height={150}
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
