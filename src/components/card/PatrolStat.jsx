import { FaRegUser } from 'react-icons/fa6';
import { LuCalendarDays } from 'react-icons/lu';
import { HiUsers } from 'react-icons/hi';
import { RiFireFill } from 'react-icons/ri';
import CountUp from 'react-countup';

export default function PatrolStat({ groupedData = {} }) {

  const patrolData = [
    {
      icon: <FaRegUser size={50} className="text-[#006BFF]" />,
      count: groupedData.mandiri || 0,
      description: 'Patroli Mandiri',
    },
    {
      icon: <LuCalendarDays size={55} className="text-[#F9C132]" />,
      count: groupedData.rutin || 0,
      description: 'Patroli Rutin',
    },
    {
      icon: <HiUsers size={55} className="text-[#52AF53]" />,
      count: groupedData.terpadu || 0,
      description: 'Patroli Terpadu',
    },
    {
      icon: <RiFireFill size={55} className="text-[#FF0000]" />,
      count: groupedData.pemadaman || 0,
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
                <CountUp end={item.count} duration={5.0} />
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