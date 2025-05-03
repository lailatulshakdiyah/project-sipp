"use client"

import { FaRegUser } from 'react-icons/fa6';
import { LuCalendarDays } from 'react-icons/lu';
import { HiUsers } from 'react-icons/hi';
import { RiFireFill } from 'react-icons/ri';
import CountUp from 'react-countup';
import { useEffect, useState } from 'react';

export default function PatrolStat() {
  const [counts, setCounts] = useState({
    mandiri: 0,
    rutin: 0,
    terpadu: 0,
    pemadaman: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPatroliData = async (tanggal) => {
    if (!tanggal) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://sipongi.menlhk.go.id/sipp-karhutla/api/karhutla/list?tanggal_patroli=07-02-2025");
      if (!response.ok) throw new Error("Gagal mengambil data");
      const result = await response.json();
      setData(result.data ?? {});
      const data = result.data.flat();

      const grouped = {
        mandiri: 0,
        rutin: 0,
        terpadu: 0,
        pemadaman: 0,
      };

      data.forEach(item => {
        const jenis = item.id_regu_tim_patroli?.[0]?.jenis_patroli?.toLowerCase();
        if (jenis === "mandiri") grouped.mandiri += 1;
        else if (jenis === "rutin") grouped.rutin += 1;
        else if (jenis === "terpadu") grouped.terpadu += 1;
        else if (jenis === "pemadaman") grouped.pemadaman += 1;
      });

      setCounts(grouped);
    } catch (err) {
      console.error("Gagal fetch data patroli:", err);
    }
  }; 

  useEffect(() => {
    fetchPatroliData();
  }, []);

  const patrolData = [
    {
      icon: <FaRegUser size={50} className="text-[#006BFF]" />,
      count: 15,
      description: 'Patroli Mandiri',
    },
    {
      icon: <LuCalendarDays size={55} className="text-[#F9C132]" />,
      count: 10,
      description: 'Patroli Rutin',
    },
    {
      icon: <HiUsers size={55} className="text-[#52AF53]" />,
      count: 12,
      description: 'Patroli Terpadu',
    },
    {
      icon: <RiFireFill size={55} className="text-[#FF0000]" />,
      count: 0,
      description: 'Pemadaman',
    },
  ];

  return (
    <div className="sticky max-w-screen-xl mx-auto px-6 py-6 rounded-xl shadow-xl bg-[#FBFBFB]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {patrolData.map((item, index) => (
          <div
            key={index}
            className="flex items-center bg-[#FBFBFB] p-4"
          >
            {/* Ikon */}
            <div className="mr-4 flex-shrink-0">{item.icon}</div>

            {/* Bagian Kanan: Count dan Deskripsi */}
            <div className="flex flex-col">
              {/* Count */}
              <p className="text-2xl font-bold text-accent">
                <CountUp end={item.count} duration={1.5} />
              </p>
              {/* Deskripsi */}
              <p className="text-accent text-md font-semibold">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}