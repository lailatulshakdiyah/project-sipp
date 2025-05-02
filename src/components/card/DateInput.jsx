'use client'

import { useState } from 'react'

export default function DateInput({ onDateSubmit }) {
  const [tanggal, setTanggal] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!tanggal) return
    onDateSubmit(tanggal)
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4 mb-6">
      <input
        type="date"
        value={tanggal}
        onChange={(e) => setTanggal(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Tampilkan
      </button>
    </form>
  )
}