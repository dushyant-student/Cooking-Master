import { cookies } from "next/headers";

export async function requireAuth() {
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  if (!API_URL) {
    console.error("BACKEND API URL is missing");
    return null;
  }

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    console.log("Server cookies:", cookieStore.getAll().map((c) => c.name));
    console.log("Token exists:", !!token);

    if (!token) return null;

    const url = `${API_URL.replace(/\/$/, "")}/auth/me`;
    console.log("Calling:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Cookie: `token=${token}`,
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    console.log("Auth status:", response.status);

    if (!response.ok) {
      const text = await response.text();
      console.log("Auth error body:", text);
      return null;
    }

    const data = await response.json();
    console.log("Auth data:", data);

    return data.success ? data.user : null;
  } catch (error) {
    console.error("RequireAuth error:", error);
    return null;
  }
}