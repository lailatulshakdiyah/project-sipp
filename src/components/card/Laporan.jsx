"use client";

import { useState } from "react";

const ReportSection = ({ 
  title, 
  description, 
  titleClass = "text-lg font-semibold", 
  descriptionClass = "text-sm text-gray-500" 
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDownload = () => {
    if (!startDate || !endDate) {
      alert("Silakan pilih tanggal mulai dan tanggal selesai!");
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      alert("Tanggal selesai harus lebih besar dari tanggal mulai!");
      return;
    }

    if ((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) > 7) {
      alert("Maksimal rentang tanggal adalah 7 hari!");
      return;
    }

    alert(`Mengunduh laporan: ${title}\nDari: ${startDate} - Sampai: ${endDate}`);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      {/* Title */}
      <h2 className={titleClass}>{title}</h2>

      {/* Description */}
      <p className={descriptionClass}>
        Silakan pilih rentang tanggal rekapitulasi laporan dengan memilih <strong>Tanggal Mulai</strong> dan <strong>Tanggal Selesai</strong>.
        <br />
        <span className="text-red-500 text-sm">*Maksimal rentang tanggal adalah 7 hari.</span>
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

const Laporan = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <ReportSection 
        title="Rekapitulasi Laporan Per Rentang Tanggal" 
        description="Silakan pilih rentang tanggal rekapitulasi laporan dengan memilih Tanggal Mulai dan Tanggal Selesai."
        titleClass="text-xl font-bold text-accent" 
        descriptionClass="text-base text-gray-600"
      />
      <ReportSection 
        title="Laporan Ringkasan Patroli" 
        description="Silakan pilih rentang tanggal rekapitulasi laporan dengan memilih Tanggal Mulai dan Tanggal Selesai."
        titleClass="text-xl font-bold text-accent" 
        descriptionClass="text-base text-gray-600"
      />
    </div>
  );
};

export default Laporan;