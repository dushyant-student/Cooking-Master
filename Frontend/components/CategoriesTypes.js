"use client";

import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";


export default function CategoriesType() {

    const pathname = usePathname();
    const { allTypesCategories, categoryError, categoryisLoading } = useAuth() ;
    let data = allTypesCategories?.allCategories ;
    
    // data = [...new Set(data.map((item) => item.categoryType))];


    useEffect(() => {
        if (categoryError) {
            toast.error("Connection Failed");
            console.log("Error from category:- ", categoryError);
        }
    }, [categoryError]);

   
    return (
        <div className="fixed w-full top-16 lg:top-18 z-500 bg-white border overflow-x-auto border-b-2 pl-4">
         
            <ul className="flex gap-2 lg:gap-6 ">
                <Link
                    href="/all-categories"
                    className={` whitespace-nowrap my-4 px-2 font-bold border-b-2 rounded-md border py-1 ${pathname === "/all-categories"
                            ? "  bg-gray-200  "
                            : "  bg-gray-50"
                        }`}
                >
                    Categorie-wise
                </Link>
                


                {/* All */}
                <Link
                    href="/"
                    className={` whitespace-nowrap my-4 px-2 py-1 font-bold border-b-2 border rounded-md ${pathname === "/"
                            ? " bg-gray-200  "
                            : " bg-gray-50"
                        }`}
                >
                    All
                </Link>

                {data?.map((item, ind) => {

                    const selected =  pathname === `/category/${item.categoryType}`;

                    return (
                        <div className="flex flex-col justify-center" key={ind} >
                            <Link
                                href={`/category/${item.categoryType}`}
                                key={ind}
                                className={`whitespace-nowrap px-2 py-1 flex gap-2 border-b-2 border rounded-md ${selected
                                        ? " bg-gray-200  "
                                        : " bg-gray-50 "
                                    }`}
                            >
                                {item.categoryType}
                            </Link>

                        </div>
                    );
                })}

            </ul>

        </div>
    );
}