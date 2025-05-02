"use client";
import { RiFireFill } from "react-icons/ri";
import CountUp from "react-countup";

export default function PatrolStat() {
  const patrolData = [
    {
      icon: <RiFireFill size={80} className="text-[#52AF53]" />, 
      count: 15,
      description: "Rendah",
    },
    {
      icon: <RiFireFill size={80} className="text-[#F9C132]" />,
      count: 10,
      description: "Sedang",
    },
    {
      icon: <RiFireFill size={80} className="text-[#FF0000]" />,
      count: 12,
      description: "Tinggi",
    },
  ];

  return (
    <div className="sticky max-w-screen-xl mx-auto px-8 py-7 rounded-xl shadow-xl bg-[#FBFBFB]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {patrolData.map((item, index) => (
          <div key={index} className="flex items-center bg-[#FBFBFB] p-5 px-20">
            {/* Ikon */}
            <div className="mr-4 flex-shrink-0">{item.icon}</div>

            {/* Bagian Kanan: Count dan Deskripsi */}
            <div className="flex flex-col">
              {/* Count */}
              <p className="text-3xl font-bold text-accent">
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
