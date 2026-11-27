import { cookies } from "next/headers";

export async function requireAuth() {
  const API_URL = process.env.BACKEND_API_URL;

  if (!API_URL) {
    console.error("BACKEND_API_URL is missing");
    return null;
  }

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    console.log("Server cookies:", cookieStore.getAll().map((c) => c.name));
    console.log("Token exists:", !!token);

    if (!token) return null;

    const response = await fetch(`${API_URL.replace(/\/$/, "")}/auth/me`, {
      method: "GET",
      headers: {
        Cookie: `token=${token}`,
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    console.log("Auth status:", response.status);

    if (!response.ok) {
      console.log("Auth error body:", await response.text());
      return null;
    }

    const data = await response.json();
    return data.success ? data.user : null;
  } catch (error) {
    console.error("RequireAuth error:", error);
    return null;
  }
}