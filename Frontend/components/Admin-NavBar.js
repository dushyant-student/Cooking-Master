
"use client";

import { useAuth } from "@/context/AuthProvider";
import { logOutUser } from "@/services/authServices";
import { Heart, LayoutDashboard, LogOutIcon, Menu, Search,  User, X, ArrowUpFromLine, ClipboardList, PackageOpen, Bookmark, HomeIcon, Play,} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AdminNavBar() {
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(false);
  const { user ,setUser , refreshUser } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const menu = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  const menuList = [
    {
      name: "Home",
      link: "/",
      icon: <HomeIcon />,
    },
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      name: "Profile",
      link: "/profile",
      icon: <User />,
    },
    {
      name: "Upload",
      link: "/upload",
      icon: <ArrowUpFromLine />,
    },
    {
      name: "Total Post",
      link: "/total-posts",
      icon: <ClipboardList />,
    },
    {
      name: "Category",
      link: "/create-category",
      icon: <PackageOpen />,
    },
    {
      name: "Yours Like",
      link: "/like",
      icon: <Heart />,
    },
    {
      name: "Favourites",
      link: "/save-recipes",
      icon: <Bookmark />,
    },
    {
      name: "Videos",
      link: "/total-videos",
      icon: <Play />,
    },
    
  ];


  useEffect(()=>{
    setToggle(false);
  },[pathname])


  const searchText = (e) => {
    e.preventDefault();

    const query = search.trim();
    if (!query) return;

    router.push(`/search?q=${encodeURIComponent(query)}`);
    setSearch("");
  };

  

  return (
    <>
      <nav className="sticky top-0 z-50 shrink-0 flex h-16 w-full items-center justify-between gap-4 border-b border-gray-200 bg-white px-4 md:px-8">

        {/* MOBILE MENU */}
        <button
          onClick={() => setToggle(true)}
          className="shrink-0 md:hidden"
          aria-label="Open sidebar"
        >
          <Menu />
        </button>

        {/* DESKTOP LINKS */}
        <ul className="hidden items-center gap-6 md:flex">
          {menu.map((item) => (
            <li key={item.link}>
              <Link
                href={item.link}
                className={`font-semibold ${
                  pathname === item.link
                    ? "text-black"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* SEARCH */}
        <form
          onSubmit={searchText}
          className="ml-auto min-w-0 flex flex-1"
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search recipe"
            className="w-full min-w-0 rounded-l-md px-4 py-2 outline-none
            border border-gray-300 bg-white 
            transition-all duration-300
            focus-within:border-green-500
            "
          />

          <button
            type="submit"
            className="rounded-r-md border border-l-0 border-gray-300 px-3 hover:bg-gray-100"
          >
            <Search size={19} />
          </button>
        </form>

        {/* ACCOUNT */}
        {
          pathname === "/profile" ? "" :
        <Link
          href="/profile"
          aria-label="Account"
          className="shrink-0 rounded-full border border-gray-300 "
        >
          {
            user?.imageURL ? 
            <img src={user?.imageURL } className="w-8 h-8 rounded-full object-cover" />
            :
            <User size={30}  />

          }
        </Link>

        }
      </nav>

      {/* MOBILE SIDEBAR */}
      <AdminAside menuList={menuList} toggle={toggle} setToggle={setToggle} pathname={pathname} refreshUser ={refreshUser } setUser={setUser} />

    </>
  );
}





function AdminAside({ menuList, toggle, setToggle, pathname, refreshUser ,setUser }) {

  const router = useRouter();

  const handleLogout = async () => {
    try {
      const Confirm = window.confirm("Do You Want to Logout?");
      if (!Confirm) return;

      const response = await logOutUser();

      if (response.success) {

        setUser(null);

        await refreshUser();

        setToggle(false);

        router.replace("/");
        router.refresh();

        toast.success("Logout Successfully");
      }

    } catch (err) {
      console.log("Logout Failed", err);
      toast.error("Logout Failed");
    }
  };


  return (
    <>
     
      <div
        onClick={() => setToggle(false)}
        className={`fixed inset-0 z-60 bg-black/40 transition-opacity md:hidden ${
          toggle
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-70 flex w-60 flex-col border-r border-gray-200 bg-white transition-transform duration-300 md:hidden ${
          toggle ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        
        <div className="flex h-16 shrink-0 items-center justify-between border-b px-4">
          <img
            src="/logo.svg"
            alt="Logo"
            className="h-12 w-32 object-contain"
          />

          <button onClick={() => setToggle(false)} aria-label="Close sidebar">
            <X />
          </button>
        </div>

        
        <ul className="flex-1 space-y-2 overflow-y-auto p-4">
          {menuList.map((item) => {
            const selected = pathname === item.link;

            return (
              <li key={item.link}>
                <Link
                  href={item.link}
                  onClick={() => setToggle(false)}
                  className={`flex items-center gap-4 rounded-md px-4 py-3 font-semibold transition ${
                    selected
                      ? "bg-orange-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>


        {/* LOGOUT */}
        <div className="border-t p-4">
          <button
            onClick={handleLogout}
            type="button"
            className="flex w-full items-center gap-3 rounded-md px-4 py-3 font-semibold text-red-600 hover:bg-red-50"
          >
            <LogOutIcon size={20} />
            LOGOUT
          </button>
        </div>
      </aside>
    </>
  );
}
