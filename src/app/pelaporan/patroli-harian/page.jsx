// page.jsx
"use client"

import React, { useEffect, useState } from 'react';
// import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import PatroliTable1 from '@/components/card/PatrolTable1';

export default function Page() {
  const [suratTugas, setSuratTugas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuratTugas = async () => {
      try {
        const res = await fetch('/api/listsk'); 
        const data = await res.json();
        setSuratTugas(data.data || []);
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
      <Header />
      <h1 className='text-4xl font-semibold text-accent text-center mt-10'>Daftar Surat Tugas</h1>
      
      <div>
        {loading ? (
          <p className="text-center my-10">Loading data...</p>
        ) : (
          <PatroliTable1 data={suratTugas} />
        )}
      </div>

      {/* <Footer /> */}
    </main>
  );
}