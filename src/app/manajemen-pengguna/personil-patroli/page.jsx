"use client";

import Personil from '@/components/card/Personil';
import Header from '@/components/header/Header';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/proxy/sipp-karhutla/api_v2/user/list', { cache: 'no-store' })
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Gagal mengambil data: ${text}`)
        }
        const json = await res.json()
        console.log("Respon dari API:", json)

        const parsedData = Array.isArray(json.data)
          ? json.data.map((item) => ({
              id: item.id ?? "",
              nama: item.nama ?? "-",
              nip: item.no_registrasi ?? "-",
              email: item.email ?? "-",
              noHp: item.no_telepon ?? "-",
            }))
          : [];

        setData(parsedData)
      } catch (error) {
        console.error('Error saat fetch:', error)
        setErrorMsg(error.message || "Terjadi kesalahan saat mengambil data")
      } finally {
        setLoading(false)
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <Header />
      <h1 className="text-4xl font-semibold text-accent text-center mt-10">Personil Terdaftar</h1>
      <div>
        {loading ? (
          <p className="text-center mt-6">Loading data...</p>
        ) : errorMsg ? (
          <p className="text-center mt-6 text-red-500">{errorMsg}</p>
        ) : data.length === 0 ? (
          <p className="text-center mt-6">Tidak ada data personil</p>
        ) : (
          <Personil initialData={data} />
        )}
      </div>
    </main>
  );
}
