"use client"

import React, { useState } from 'react';

export default function DateInput({onDateChange}) {
  const [date, setDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });  

  const handleChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate); // format yyyy-mm-dd
    onDateChange(newDate);
  };

  return (
    <div className='w-full flex justify mt-4 px-24'>
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
        {date && (
          <p className="text-sm text-gray-600 mt-1"></p>
        )}
      </div>
    </div>
  );
};