import { cookies } from "next/headers";

export const getDashBoardsDetails = async () => {
    const Api_Backend_Url = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    if (!Api_Backend_Url){
        return ;
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        throw new Error("Unauthorized: Token not found");
    }

    const response = await fetch(
        `${Api_Backend_Url}/dashboard-details/all`,
        {
            method: "GET",
            headers: {
                Cookie: `token=${token}`,
            },
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error(`Dashboard API failed: ${response.status}`);
    }
    
    return response.json();
};