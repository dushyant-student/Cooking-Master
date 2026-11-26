import { cookies } from 'next/headers'
import api from '@/lib/axios'

export async function requireAuth() {
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL
  if (!API_URL) {
    throw new Error('BACKEND_API_URL is missing')
  }

  try {
    const cookieStore = await cookies()
    const cookieHeader = cookieStore.toString()

    if (!cookieHeader) return null ;


   console.log(
    "All Server Cookies:",
    cookieStore.getAll().map(cookie => cookie.name)
    );
    
    const token = cookieStore.get("token")?.value;
    
    console.log("Token Available:", {token});
    
    console.log("Server Auth - Token Available:", !!token);
 

    const response = await fetch(`${API_URL.replace(/\/$/, '')}/auth/me`, {
      headers: { Cookie: cookieHeader },
      cache: 'no-store',
    })
    console.log('Server Auth - Status:', response.status, response.ok)

    if (!response.ok) {
      console.log('Server Auth - Authentication Failed')
    }

    const data = await response.json()
    console.log('Server Auth - User:', data)

    return data.user || null
  } catch (error) {
    console.error('RequireAuth Error:', error)
    return null
  }
}
