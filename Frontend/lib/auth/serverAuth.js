import { cookies } from "next/headers";

export async function requireAuth() {
  const Api_Backend_Url = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  try {
    if (!Api_Backend_Url) {
      throw new Error("RequireAuth Backend API URL is missing");
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const response = await fetch(
      `${Api_Backend_Url}/auth/me`,
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
    console.log("sererverAUth....Data;- ",data)
    return data.user || null;

  } catch (error) {
    console.error("RequireAuth Error:", error);
    return null;
  }
}
