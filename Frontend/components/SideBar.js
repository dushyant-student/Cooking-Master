
"use client";

import Link from "next/link";
import { ArrowUpFromLine, LayoutDashboard, User, PackageOpen, ThumbsUp, LogOutIcon, ClipboardList, Heart, Menu, X, Save, SaveAll, Bookmark } from "lucide-react";
import { logOutUser } from "@/services/authServices";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthProvider";

export default function SideBar() {
  const { setUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const menuList = [
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
  ];

  const LogOut = async () => {
    try {
      const Yes = window.confirm("Do You Want to logOut ?");

      if (!Yes) {
        return;
      }

      const response = await logOutUser();

      if (response.success) {
        setUser(null);

        router.replace("/");

        router.refresh();

        toast.success("Logout Successfully");

      }

    } catch (err) {
      console.log("Logout Error:", err);
      toast.error("Server failed");
    }
  };

  return (
    <>
      <div
        className={`hidden sticky h-screen w-80 shrink-0 z-1000 overflow-hidden md:flex flex-col items-center border-r border-gray-300 bg-white transition-all duration-500 `}
      >
        {/* Logo */}
        <div className="mr-20">

          <img
            src="/logo.svg"
            alt="Logo"
            className="w-40 h-25 object-contain"
          />

        </div>


        {/* Menu */}
        <ul className="flex-1 w-full px-6 py-6 flex flex-col gap-5 overflow-hidden overflow-y-auto " >
          {menuList?.map((item, ind) => {
            const selected = pathname === item.link;

            return (
              <li key={ind}>
                <Link
                  href={item.link}
                  className={` flex items-center gap-4 px-4 py-2 text-xl font-bold rounded-2xl whitespace-nowrap transition
                    ${selected ? "bg-violet-600 text-white" : ""}
                  `}
                >
                  {item.icon}

                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}

          {/* Logout */}
          <li className="mt-auto">
            <button
              onClick={LogOut}
              type="button"
              className=" w-full flex items-center gap-4 px-4 py-2 font-semibold text-xl rounded-2xl whitespace-nowrap hover:bg-red-100 transition
              "
            >
              <LogOutIcon />

              <span>LogOut</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
