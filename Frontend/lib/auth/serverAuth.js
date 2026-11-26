import { cookies } from "next/headers";

export async function requireAuth() {
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  try {
    if (!API_URL) {
      throw new Error("BACKEND_API_URL is missing");
    }

   const cookieStore = await cookies();

    console.log(
      "All Server Cookies:",
      cookieStore.getAll().map(cookie => cookie.name)
    );

    const token = cookieStore.get("token")?.value;

    console.log("Token Available:", Boolean(token));

    console.log("Server Auth - Token Available:", !!token);

    if (!token) {
      return null;
    }

    const response = await fetch(
      `${API_URL.replace(/\/$/, "")}/auth/me`,
      {
        method: "GET",
        headers: {
          Cookie: `token=${token}`,
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    console.log("Server Auth - Status:", response.status);

    if (!response.ok) {
      console.log("Server Auth - Authentication Failed");
      return null;
    }

    const data = await response.json();

    console.log("Server Auth - User:", data.user);

    return data.user || null;

  } catch (error) {
    console.error("RequireAuth Error:", error);
    return null;
  }
}