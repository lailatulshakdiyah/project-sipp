"use client";

import Link from "next/link";

export default function PelaporanPage() {
  return (
    <main>
      <h1>Pelaporan</h1>
      <ul>
        <li>
          <Link href="/pelaporan/patroli-harian">Patroli Harian</Link>
        </li>
        <li>
          <Link href="/pelaporan/laporan-patroli">Laporan Patroli</Link>
        </li>
      </ul>
    </main>
  );
}
