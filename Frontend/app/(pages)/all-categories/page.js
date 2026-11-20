"use client";

import Link from "next/link";
import { Loader2, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthProvider";


export default function CategoriesPage() {

    let { allTypesCategories, categoryisLoading ,categoryError} = useAuth();
   
    allTypesCategories = allTypesCategories?.allCategories;

    if (categoryError) {
        console.log("Error in Categories All", categoryError)
        toast.error( "Internet Issue categories please Refresh Page Again ");

        return (
            <div className="flex flex-col justify-center items-center gap-6" >
                <h1>Failed to load posts Page / Newtwork Issue</h1>
            </div>
        )

    }


    if (categoryisLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={22} />
                    <span className="font-medium">
                        Loading categories...
                    </span>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 px-5 mt-25 py-10">

            {/* Header */}
            <div className="mx-auto mb-5 max-w-7xl text-center">

                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-500">
                    Explore Recipes
                </p>

                <h1 className="text-4xl font-bold text-gray-900">
                    All Categories
                </h1>

                <p className="mx-auto mt-3 max-w-2xl text-gray-500">
                    Explore delicious recipes by category and find
                    something perfect for your next meal.
                </p>

            </div>

            {/* Categories */}
            <div className="mx-auto max-w-7xl">

                {allTypesCategories?.length === 0 ? (
                    <div className="rounded-xl bg-white py-20 text-center shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-700">
                            No categories found
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Categories will appear here once they are added.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                        {allTypesCategories?.map((category) => (

                            <Link
                                key={category._id}
                                href={`/category/${category?.categoryType}`}
                                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >

                                {/* Image */}
                                <div className="relative h-52 overflow-hidden">

                                    <img
                                        src={category.imageURL}
                                        alt={category.categoryType}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/20" />

                                </div>

                                {/* Content */}
                                <div className="p-5 text-center">

                                    <h2 className="text-xl font-bold capitalize text-gray-800 transition group-hover:text-blue-500">
                                        {category.categoryType}
                                    </h2>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Explore {category.categoryType} recipes
                                    </p>

                                </div>

                            </Link>

                        ))}

                    </div>
                )}

            </div>
        </main>
    );
}