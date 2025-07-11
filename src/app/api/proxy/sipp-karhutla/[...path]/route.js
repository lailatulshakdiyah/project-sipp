import { NextResponse } from "next/server";

function resolveBackendUrl(suffix) {
  if (suffix.startsWith("api_v2/")) {
    const subPath = suffix.replace(/^api_v2\//, "");
    return `https://sipongi.menlhk.go.id/sipp-karhutla/api_v2/${subPath}`;
  } else if (suffix.startsWith("simadu/")) {
    const subPath = suffix.replace(/^simadu\//, "");
    return `https://sipongi.menlhk.go.id/sipp-karhutla/api/simadu/${subPath}`;
  // } else  if (suffix.startsWith("api/")) {
  //   const subPath = suffix.replace(/^api\//, "");
  //   return `https://sipongi.menlhk.go.id/sipp-karhutla/api/${subPath}`;
  } else {
    return null;
  }
}

// ---------------- GET //
export async function GET(request, { params }) {
  const suffix = params.path.join("/");

  const searchParams = request.nextUrl.searchParams.toString();
  const fullPath = `${suffix}${searchParams ? `?${searchParams}` : ""}`;

  const backendUrl = resolveBackendUrl(fullPath);
  if (!backendUrl) {
    return new NextResponse("Invalid API path", { status: 400 });
  }

  const token = request.cookies.get("authToken")?.value;

  const backendRes = await fetch(backendUrl, {
    method: "GET",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
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
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// ---------------- POST //
export async function POST(request, { params }) {
  const suffix = params.path.join("/");
  const backendUrl = resolveBackendUrl(suffix);
  if (!backendUrl) {
    return new NextResponse("Invalid API path", { status: 400 });
  }

  const token = request.cookies.get("authToken")?.value;
  const bodyRaw = await request.text();
  const contentType = request.headers.get("content-type") || "";

  const headers = { "Content-Type": contentType };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const backendRes = await fetch(backendUrl, {
    method: "POST",
    headers,
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

  try {
    const parsed = JSON.parse(responseText);
    if (parsed?.data?.token) {
      response.cookies.set("authToken", parsed.data.token, {
        path: "/",
        httpOnly: true,
        maxAge: 60 * 60,
      });
    }
  } catch {}
  return response;
}

// ---------------- DELETE //
export async function DELETE(request, { params }) {
  const suffix = params.path.join("/");
  const backendUrl = resolveBackendUrl(suffix);
  if (!backendUrl) {
    return new NextResponse("Invalid API path", { status: 400 });
  }

  const token = request.cookies.get("authToken")?.value;

  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const backendRes = await fetch(backendUrl, {
    method: "DELETE",
    headers,
  });

  const responseText = await backendRes.text();

  return new NextResponse(responseText, {
    status: backendRes.status,
    headers: {
      "Content-Type": backendRes.headers.get("content-type") || "application/json",
    },
  });
}