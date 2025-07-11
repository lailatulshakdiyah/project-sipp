"use client"

import React, { useState } from "react";

export default function DateInput({ onDateChange }) {
  const [date, setDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });

  const handleChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    onDateChange(newDate);
  };

  return (
    <div className="w-full sm:w-auto flex justify-start sm:justify-end">
      <div className="flex flex-col gap-1">
        <label htmlFor="date" className="text-sm font-medium text-gray-700">
          Pilih Tanggal
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
    </div>
  );
}