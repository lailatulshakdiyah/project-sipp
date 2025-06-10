// File: src/app/api/listsk/route.js
import { NextResponse } from "next/server";

export async function GET(request) {
  const token = request.cookies.get("authToken")?.value;
  console.log("TOKEN DITERIMA DI ROUTE API:", token);

  if (!token) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const backendUrl = "https://sipongi.menlhk.go.id/sipp-karhutla/api/simadu/listsk";

  try {
    const backendRes = await fetch(backendUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const contentType = backendRes.headers.get("content-type");

    if (!backendRes.ok) {
      const text = await backendRes.text();
      return new NextResponse(JSON.stringify({ message: "Error from backend", error: text }), {
        status: backendRes.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (contentType?.includes("application/json")) {
      const data = await backendRes.json();
      return NextResponse.json(data);
    } else {
      const text = await backendRes.text();
      return new NextResponse(text, {
        status: 200,
        headers: { "Content-Type": contentType || "text/plain" },
      });
    }
  } catch (error) {
    console.error("Proxy error:", error);
    return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}