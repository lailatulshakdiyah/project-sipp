"use client"

import React, { useEffect, useState } from 'react'
import Header from '@/components/header/Header'
import Akses from '@/components/card/Akses'

export default function page() {
  const [categorizeData, setCategorizedData] = useState({
    Daops: [],
    Korwil: [],
    Balai: [],
    Pusat: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  const roleCategoryMap = {
    daops: "Daops",
    korwil: "Korwil",
    balai: "Balai",
    pusat: "Pusat",
    super: "Pusat",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/proxy/sipp-karhutla/api_v2/non_patroli/list', { 
          method: "GET",
          credentials: 'include',
        });

        if (!res.ok) {
          const text = await res.text();
          console.error('Respon error:', res.status, text);
          throw new Error(`HTTP ${res.status}`);
        }

        const json = await res.json();
        const list = json.data || [];

        const categorized = {
          Daops: [],
          Korwil: [],
          Balai: [],
          Pusat: [],
        }; 

        list.forEach((item) => {
          const roleName = item.r_role?.nama?.toLowerCase() || '';
          const user = item.m_user || {};

          const parsedItem = {
            nama: user.nama || '',
            nip: user.no_registrasi || '',
            email: user.email || '',
            organisasi: user.instansi || '',
            hakAkses: item.r_role?.nama || '',
          };

          const categoryKey = Object.keys(roleCategoryMap).find((key) =>
            roleName.includes(key)
          );

          if (categoryKey) {
            categorized[roleCategoryMap[categoryKey]].push(parsedItem);
          }
        });

        setCategorizedData(categorized);
      } catch (error) {
        console.error('Gagal fetch data:', error);
        setCategorizedData({
          Daops: [],
          Korwil: [],
          Balai: [],
          Pusat: [],
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <Header />
      <h1 className='text-4xl font-semibold text-accent text-center mt-10'>Manajemen Hak Akses</h1>

      <div>
        {isLoading ? (
          <p className='text-center mt-10'>Loading data...</p>
        ) : (
          <Akses categorizedData={categorizeData} />
        )}
      </div>
    </main>
  )
}
