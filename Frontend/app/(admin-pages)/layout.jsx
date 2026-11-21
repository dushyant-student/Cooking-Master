import SideBar from "@/components/SideBar";
import { requireAuth } from "@/lib/auth/serverAuth";
import { redirect } from "next/navigation";
import AdminNavBar from "@/components/Admin-NavBar";

export default async function Layout({ children }) {
  const user = await requireAuth();
 
  if ( !user ){
    redirect("/login");
  } 
  
  

  return (
    <>
      <div className="flex h-screen w-full overflow-hidden">
       
        <SideBar />
   
        <section className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
       
          <header className="z-50 h-16 w-full shrink-0">
            <AdminNavBar />
          </header>

         
          <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain">
            {children}
          </main>
        </section>
      </div>

    </>
  );
}