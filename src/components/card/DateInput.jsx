"use client";

import { usePatroliDate } from "@/context/PatroliDateContext";

export default function DateInput() {
  const { selectedDate, setSelectedDate } = usePatroliDate();

  const handleChange = (e) => {
    const value = e.target.value; // yyyy-mm-dd
    const formatted = value.split("-").reverse().join("-"); // ke dd-mm-yyyy
    setSelectedDate(formatted);
  };

  const defaultInputValue = selectedDate.split("-").reverse().join("-");

  return (
    <input
      type="date"
      className="border p-2 rounded"
      onChange={handleChange}
      value={defaultInputValue}
    />
  );
}