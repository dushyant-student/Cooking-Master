
import SideBar from "@/components/SideBar";
import AdminNavBar from "@/components/Admin-NavBar";
import { requireAuth } from "@/lib/auth/serverAuth";
import { redirect } from "next/navigation";

// This layout uses cookies, so render dynamically.
export const dynamic = "force-dynamic";

export default async function Layout({ children }) {

  const user = await requireAuth();

  console.log("User in Server Layout:", user);

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">

      {/* DESKTOP SIDEBAR */}
      <SideBar user={user} />

      <section className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">

        {/* NAVBAR */}
        <header className="z-50 h-16 w-full shrink-0">
          <AdminNavBar user={user} />
        </header>

        {/* PAGE CONTENT */}
        <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain">
          {children}
        </main>

      </section>

    </div>
  );
}
