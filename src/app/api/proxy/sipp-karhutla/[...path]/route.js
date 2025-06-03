// File: src/app/api/proxy/sipp-karhutla/[...path]/route.js
// File: src/app/api/proxy/sipp-karhutla/[...path]/route.js
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  // Gabungkan sisa path: [ 'api_v2', 'auth', 'login' ] → 'api_v2/auth/login'
  const suffix = params.path.join("/");

  // Karena base URL baru: http://203.99.108.16/api-sipp-v2
  // Maka kita ingin memanggil: http://203.99.108.16/api-sipp-v2/auth/login
  // Path lengkap: /api-sipp-v2/{suffix tanpa "api_v2/"}
  // Jika suffix selalu diawali "api_v2/", kita bisa buang bagian itu:
  const pathWithoutApiV2 = suffix.replace(/^api_v2\//, ""); 
  const backendUrl = `http://203.99.108.16/api-sipp-v2/${pathWithoutApiV2}`;

  const bodyRaw = await request.text();
  const contentType = request.headers.get("content-type") || "";

  const backendRes = await fetch(backendUrl, {
    method: "POST",
    headers: { "Content-Type": contentType },
    body: bodyRaw,
  });

  const responseText = await backendRes.text();
  const setCookieHeader = backendRes.headers.get("set-cookie");

  const response = new NextResponse(responseText, {
    status: backendRes.status,
    headers: {
      "Content-Type": backendRes.headers.get("content-type") || "application/json",
    },
  });

  // Jika backend mengirim Set-Cookie (misal authToken=…), set ke browser
  if (setCookieHeader) {
    const match = setCookieHeader.match(/authToken=([^;]+);?/);
    if (match) {
      response.cookies.set("authToken", match[1], {
        path: "/",
        httpOnly: true,
        maxAge: 60 * 60,
      });
    }
  }

  return response;
}

export async function GET(request, { params }) {
  const suffix = params.path.join("/");
  const pathWithoutApiV2 = suffix.replace(/^api_v2\//, "");
  const backendUrl = `http://203.99.108.16/api-sipp-v2/${pathWithoutApiV2}`;

  const token = request.cookies.get("authToken")?.value;

  const backendRes = await fetch(backendUrl, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  let data;
  try {
    data = await backendRes.json();
  } catch {
    const text = await backendRes.text();
    return new NextResponse("Error parsing JSON", { status: 500 });
  }

  return new NextResponse(JSON.stringify(data), {
    status: backendRes.status,
    headers: { "Content-Type": "application/json" },
  });
}

// src/app/api/proxy/sipp-karhutla/[...path]/route.js
// import { NextResponse } from "next/server";

// export async function GET(request, { params }) {
//   return NextResponse.json({
//     pesan: "GET terdeteksi",
//     pathParams: params.path,
//   });
// }

// export async function POST(request, { params }) {
//   return NextResponse.json({
//     pesan: "POST terdeteksi",
//     pathParams: params.path,
//   });
// }