// import { cookies } from 'next/headers'; 
// import { NextResponse } from 'next/server';

// export function middleware(request) {
//   const { pathname } = request.nextUrl;

//   if (
//     pathname.startsWith('/_next') ||
//     pathname.startsWith('/favicon.ico') ||
//     pathname.startsWith('/assets') || // jika kamu punya folder assets public
//     pathname.startsWith('/api/proxy')
//   ) {
//     return NextResponse.next();
//   }

//   const token = request.cookies.get('authToken')?.value;

//   // Izinkan akses ke halaman login ("/") walaupun tidak ada token
//   if (token && pathname === '/homepage') {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   // Proteksi semua halaman lain kecuali "/"
//   if (!token && pathname !== "/homepage" && !pathname.startsWith("/_next")) {
//     return NextResponse.redirect(new URL('/homepage', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/:path*'],
// };

import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 1) Selalu lewati (skip) semua request ke /api/proxy
  if (pathname.startsWith("/api/proxy")) {
    return NextResponse.next();
  }

  // 2) Juga lewati _next, favicon, assets, dsb.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/assets")
  ) {
    return NextResponse.next();
  }

  // 3) Logika proteksi halaman biasa Anda…
  const token = request.cookies.get("authToken")?.value;
  if (!token && pathname !== "/homepage") {
    return NextResponse.redirect(new URL("/homepage", request.url));
  }
  if (token && pathname === "/homepage") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|assets).*)"],
};