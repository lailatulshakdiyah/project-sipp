"use client"

import PatroliTable2 from '@/components/card/PatrolTable2'
import Header from '@/components/header/Header'
import React, { useEffect, useState } from 'react'

export default function Page() {
  const [suratTugas, setSuratTugas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuratTugas = async () => {
      try {
        const res = await fetch('/api/listsk');
        const data = await res.json();
        setSuratTugas(data.data || [])
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuratTugas();
  }, []);

  return (
    <main>
      <Header/>
      <h1 className='text-4xl font-semibold text-accent text-center mt-10'>Daftar Surat Tugas</h1>

      <div>
        {loading ? (
          <p className='text-accent my-10 text-center'>Loading data...</p>
        ) : (
          <PatroliTable2 data={suratTugas} />
        )}
      </div>
    </main>
  )
}
