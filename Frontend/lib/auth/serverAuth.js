
import { cookies } from "next/headers";

export async function requireAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/me`,
      {
        method: "GET",
        headers: {
          Cookie: `token=${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.log("Auth failed:", response.status);
      return null;
    }

    const data = await response.json();

    if (!data.success) {
      return null;
    }

    return data.user;

  } catch (error) {
    console.error("requireAuth error:", error);
    return null;
  }
}
