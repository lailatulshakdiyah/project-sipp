"use client";

import Link from "next/link";

export default function AkunPage() {
  return (
    <main>
      <h1>Akun</h1>
      <ul>
        <li>
          <Link href="/akun/profile">Profile</Link>
        </li>
        <li>
          <Link href="/akun/logout">Logout</Link>
        </li>
      </ul>
    </main>
  );
}
