import { cookies } from "next/headers";

export async function requireAuth() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const response = await fetch(
      `${process.env.BACKEND_API_URL}/api/auth/me`,
      {
        method: "GET",
        headers: {
          Cookie: `token=${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) return null;

    const data = await response.json();

    return data.user || null;

  } catch (error) {
    console.error("RequireAuth Error:", error);
    return null;
  }
}