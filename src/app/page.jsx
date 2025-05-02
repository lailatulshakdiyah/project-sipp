import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Image from "next/image";
import PatrolStat from "@/components/card/PatrolStat";
import KegiatanPatroli from "@/components/card/KegiatanPatroli";
import Map from "@/components/map/Map";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="h-screen w-full relative z-0">
        <Map />
      </div>

      {/* PatrolStat */}
      <div className="-mt-72 mb-10">
        <PatrolStat />
      </div>

      <h1 className="text-4xl font-bold text-accent text-center">Kegiatan Patroli</h1>
      
      {/* table kegiatan patroli */}
      <div>
        <KegiatanPatroli />
      </div>

      {/* footer section */}
      <Footer/>
    </main>
  );
}
