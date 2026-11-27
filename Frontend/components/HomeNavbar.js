"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthProvider";
import {
  Heart, Search, User, Upload, Menu, LogOutIcon, LayoutDashboard,
  ArrowUpFromLine, ThumbsUp, X, Home, Contact, UserCircle, Boxes,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { logOutUser } from "@/services/authServices";
import { toast } from "react-toastify";

const menuList = [
  { name: "Home", link: "/", icon: <Home /> },
  { name: "Dashboard", link: "/dashboard", icon: <LayoutDashboard /> },
  { name: "Profile", link: "/profile", icon: <User /> },
  { name: "Upload", link: "/upload", icon: <ArrowUpFromLine /> },
  { name: "Yours Like", link: "/like", icon: <ThumbsUp /> },
  { name: "Favourites", link: "/save-recipes", icon: <Heart /> },
  { name: "About", link: "/about", icon: <UserCircle /> },
  { name: "Contact", link: "/contact", icon: <Contact /> },
  { name: "All Category", link: "/all-categories", icon: <Boxes /> },
];

export default function HomeNavBar({ user: serverUser }) {
  // assumes AuthProvider exposes `user`; rename authUser's source if yours differs
  const { user: authUser, wait, setUser, saveData } = useAuth();
  const user = serverUser || authUser;

  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  if (wait) return null;

  const saveCount = Array.isArray(saveData?.data) ? saveData.data.length : 0;

  const searchText = (e) => {
    e.preventDefault();
    const query = search.trim();
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleUpload = () => {
    router.push(user ? "/upload" : "/login");
  };

  const isActive = (link) => pathname === link;

  const AccountButton = () =>
    user ? (
      <Link
        href="/profile"
        title="profile"
        aria-label="profile"
        className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all border-blue-500
          ${
            isActive("/profile")
              ? "border-blue-600 text-blue-600"
              : "bg-white border-blue-500 text-blue-400 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
          }`}
      >
        <img
          src={
            user?.imageURL
              ? user.imageURL.replace("=s96-c", "=s400-c")
              : "/defaultUserImage/defaultImage.png"
          }
          alt="Profile"
          className="rounded-full object-cover overflow-hidden w-10 h-10"
        />
      </Link>
    ) : (
      <Link
        href="/login"
        title="Login"
        aria-label="Login"
        className="px-4 py-2 bg-green-50 text-green-600 rounded-md font-bold"
      >
        Login
      </Link>
    );

  const FavouriteButton = () => (
    <Link
      href="/save-recipes"
      title="Saved recipes"
      aria-label={`Saved recipes: ${saveCount}`}
      className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-colors
        ${isActive("/save-recipes") ? "bg-red-50 text-red-600" : "text-red-500"}`}
    >
      <Heart size={22} className={isActive("/save-recipes") ? "fill-red-500" : ""} />
      {saveCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
          {saveCount > 99 ? "99+" : saveCount}
        </span>
      )}
    </Link>
  );

  return (
    <nav className="z-1000 fixed top-0 w-full border-b border-gray-200 bg-slate-900 text-white shadow-sm">
      <Aside
        menuList={menuList}
        pathname={pathname}
        toggle={toggle}
        setToggle={setToggle}
        setUser={setUser}
      />

      {/* MOBILE / TABLET */}
      <div className="lg:hidden">
        <div className="flex items-center gap-3 px-3 py-3 sm:px-5">
          <button onClick={() => setToggle(!toggle)}>
            <Menu />
          </button>

          <Link href="/" className="shrink-0">
            <Image
              src="/logo.svg"
              alt="Recipe Logo"
              width={120}
              height={45}
              priority
              className="h-9 w-auto object-contain hidden md:block"
            />
            <Image
              src="/mobileLogo.svg"
              alt="Recipe Logo"
              width={120}
              height={45}
              priority
              className="h-9 w-auto object-contain md:hidden"
            />
          </Link>

          <div className="min-w-0 flex-1">
            <SearchBar search={search} setSearch={setSearch} searchText={searchText} />
          </div>

          <AccountButton />
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:flex min-h-18 min-w-0 items-center justify-between gap-6 px-6 xl:px-12">
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.svg"
            alt="Recipe Logo"
            width={150}
            height={55}
            priority
            className="h-12 w-auto object-contain"
          />
        </Link>

        <div className="min-w-0 max-w-xs flex-1 md:max-w-xl">
          <SearchBar search={search} setSearch={setSearch} searchText={searchText} />
        </div>

        <div className="flex shrink-0 items-center gap-5">
          <FavouriteButton />
          <button
            onClick={handleUpload}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-95"
          >
            <Upload size={17} />
            Upload
          </button>
          <AccountButton />
        </div>
      </div>
    </nav>
  );
}

const SearchBar = ({ search, setSearch, searchText }) => (
  <form
    onSubmit={searchText}
    role="search"
    className="flex items-center overflow-hidden border border-gray-300 bg-gray-50 rounded-sm"
  >
    <input
      type="search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search recipes..."
      aria-label="Search recipes"
      className="min-w-0 flex-1 text-black px-3 py-2.5 text-sm outline-none bg-amber-50"
    />
    <button
      type="submit"
      className="flex items-center justify-center bg-blue-600 px-4 py-2.5 text-white hover:bg-blue-700"
    >
      <Search size={20} />
    </button>
  </form>
);

const Aside = ({ menuList, pathname, toggle, setToggle, setUser }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const confirmed = window.confirm("Do You Want to Logout?");
      if (!confirmed) return;

      const response = await logOutUser();

      if (response.success) {
        await fetch("/session", { method: "DELETE" }); // clears the Vercel cookie
        setUser(null);
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
    <div
      className={`fixed top-0 h-full z-1000 overflow-hidden md:flex flex-col items-center border-r border-gray-300 bg-white w-60 transition-all duration-500 ${
        toggle ? "translate-x-0" : "-translate-x-80"
      }`}
    >
      <div className="mr-20 flex">
        <img src="/logo.svg" alt="Logo" className="w-40 h-25 object-contain" />
        <button onClick={() => setToggle(!toggle)}>
          <X className="text-black ml-8" />
        </button>
      </div>

      <ul className="flex-1 w-full h-135 px-4 py-6 flex flex-col gap-5 overflow-hidden overflow-y-auto">
        {menuList?.map((item) => {
          const selected = pathname === item.link;
          return (
            <li key={item.link}>
              <Link
                href={item.link}
                className={`flex items-center gap-4 px-4 py-2 text-xl font-bold rounded-2xl whitespace-nowrap hover:bg-gray-200 transition ${
                  selected ? "bg-violet-500" : "text-black"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}

        <li className="mt-auto">
          <button
            onClick={handleLogout}
            type="button"
            className="w-full flex items-center gap-4 px-4 py-2 font-semibold text-xl rounded-2xl whitespace-nowrap hover:bg-red-100 transition"
          >
            <LogOutIcon />
            <span>LogOut</span>
          </button>
        </li>
      </ul>
    </div>
  );
};