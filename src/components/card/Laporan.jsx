"use client";

import { useState } from "react";

const ReportSection = ({
  title,
  downloadUrl,        
  filenamePrefix, 
  limitRange = true,    
  titleClass = "text-lg font-semibold",
  descriptionClass = "text-sm text-gray-500",
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDownload = () => {
    if (!startDate || !endDate) {
      alert("Silakan pilih tanggal mulai dan tanggal selesai!");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      alert("Tanggal selesai harus lebih besar dari tanggal mulai!");
      return;
    }

    if (limitRange) {
      const rangeInDays = (end - start) / (1000 * 60 * 60 * 24);
      if (rangeInDays > 7) {
        alert("Maksimal rentang tanggal adalah 7 hari!");
        return;
      }
    }

    const fullUrl = `${downloadUrl}?start=${startDate}&end=${endDate}`;
    const filename = `${filenamePrefix}_${startDate}_sampai_${endDate}.xlsx`;

    const a = document.createElement("a");
    a.href = fullUrl;
    a.download = filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      {/* Title */}
      <h2 className={titleClass}>{title}</h2>

      {/* Description */}
      <p className={descriptionClass}>
        Silakan pilih rentang tanggal rekapitulasi laporan dengan memilih <strong>Tanggal Mulai</strong> dan <strong>Tanggal Selesai</strong>.
        {limitRange && (
          <>
            <br />
            <span className="text-red-500 text-sm">*Maksimal rentang tanggal adalah 7 hari.</span>
          </>
        )}
      </p>

      {/* Form Input Tanggal dan Tombol */}
      <div className="grid grid-cols-3 gap-4 items-end mt-4">
        {/* Tanggal Mulai */}
        <div>
          <label className="block text-sm font-bold mb-1">Tanggal Mulai</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* Tanggal Selesai */}
        <div>
          <label className="block text-sm font-bold mb-1">Tanggal Selesai</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* Button Unduh */}
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-3 py-3 rounded-xl hover:bg-blue-700 transition text-md w-full"
        >
          Unduh Laporan
        </button>
      </div>
    </div>
  );
};

export default function Laporan() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <ReportSection
        title="Rekapitulasi Laporan Per Rentang Tanggal"
        description="Silakan pilih rentang tanggal laporan."
        downloadUrl="https://sipongi.menlhk.go.id/sipp-karhutla/api/karhutla/downloadrange"
        filenamePrefix="Rekap_Laporan_Patroli"
        titleClass="text-xl font-bold text-accent"
        descriptionClass="text-base text-gray-600"
        limitRange={true}
      />
      <ReportSection
        title="Laporan Ringkasan Patroli"
        description="Silakan pilih rentang tanggal laporan ringkasan patroli tanpa batas maksimal rentang hari."
        downloadUrl="https://sipongi.menlhk.go.id/sipp-karhutla/api/simadu/downloadRingkasan"
        filenamePrefix="Ringkasan_Patroli"
        titleClass="text-xl font-bold text-accent"
        descriptionClass="text-base text-gray-600"
        limitRange={false}
      />
    </div>
  );
};