"use client"

import Link from "next/link";

export default function ManajemenPenggunaPage() {
  return (
    <main>
      <h1>Manajemen Pengguna</h1>
      <ul>
        <li><Link href="/manajemen-pengguna/penugasan">Penugasan</Link></li>
        <li><Link href="/manajemen-pengguna/personil-patroli">Personil Patroli</Link></li>
        <li><Link href="/manajemen-pengguna/wilayah">Wilayah</Link></li>
        <li><Link href="/manajemen-pengguna/hak-akses">Hak Akses</Link></li>
      </ul>
    </main>
  );
}