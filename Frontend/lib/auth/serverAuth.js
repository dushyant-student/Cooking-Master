
import { cookies } from "next/headers";

export async function requireAuth() {
  const Api_Backend_Url = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  try {
    console.log("Backend URL:", Api_Backend_Url);

    if (!Api_Backend_Url) {
      throw new Error("Backend API URL is missing");
    }

    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    console.log("Token Available:", Boolean(token));

    if (!token) {
      console.log("JWT Token Not Found in Next.js Cookies");
      return null;
    }

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

    console.log("Auth API Status:", response.status);

    const responseText = await response.text();

    console.log("Auth API Response:", responseText);

    if (!response.ok) {
      return null;
    }

    const data = JSON.parse(responseText);

    console.log("Complete Auth Data:", data);

    console.log("User Object:", data.user);

    return data.user || null;

  } catch (error) {
    console.error("RequireAuth Error:", error);
    return null;
  }
}
