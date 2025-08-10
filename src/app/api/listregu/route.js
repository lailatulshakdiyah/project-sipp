import { NextResponse } from "next/server";

// Tambahkan fungsi normalisasi
function sanitizeNomorSK(nomor) {
  return nomor
    .replace(/\/0(\d)(?=\/|$)/g, '/$1')
    .replace(/\.PINANG_BANJAR$/i, '')
    .replace(/-1$/i, '')
    .replace(/DALKARHUT\.(\d+)/, 'DALKARHUT-$1');
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const nomor_sk = searchParams.get("nomor_sk");

  if (!nomor_sk) {
    return NextResponse.json({ error: "nomor_sk wajib diisi" }, { status: 400 });
  }

  const sanitizedNomorSK = sanitizeNomorSK(nomor_sk);
  const encodedNomorSK = encodeURIComponent(nomor_sk);
  const url = `https://sipongi.menlhk.go.id/sipp-karhutla/api/simadu/listlaporan?nomor_sk=${encodedNomorSK}`;

  console.log("Nomor SK (original):", nomor_sk);
//   console.log("Nomor SK (sanitize):", sanitizedNomorSK);
  console.log("URL tujuan:", url);

  try {
    const res = await fetch(url);

    if (!res.ok) {
      const text = await res.text();
      console.error("Gagal fetch dari backend:", res.status, text);
      return NextResponse.json({ error: "Gagal dari server SIPP", detail: text }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Gagal mengambil data", detail: err.message }, { status: 500 });
  }
}