import { getDashBoardsDetails } from "@/services/dashBoardServices.js";
import {  BookOpen,  Bookmark,  Heart,  Plus,  ChefHat,  TrendingUp,  ArrowRight,  ThumbsUp,  Eye,  MessageCircleCheckIcon } from "lucide-react";
import Link from "next/link";

export default async function Dashboard() {


    const details = await getDashBoardsDetails();
    
    const status = [
        {
            title: "My Recipes",
            value: details?.status?.myPosts ?? 0,
            icon: BookOpen,
        },

        {
            title: "Total Engagement on My Posts",
            value: details?.status?.totalEngagement ?? 0,
            icon: Eye,
        },

        {
            title: "Likes on My Posts",
            value: details?.status?.likesOnMyPosts ?? 0,
            icon: ThumbsUp,
        },
        {
            title: "Total Comments on My Post",
            value: details?.status?.totalComments ?? 0,
            icon: MessageCircleCheckIcon,
        },
        {
            title: "How many Viewer's Save my Post",
            value: details?.status?.savesOnMyPosts ?? 0,
            icon: BookOpen,
        },

    ];

    
    const categorystatus = details?.categorystatus ?? [];

    // Maximum value for progress bar
    const maxCategoryValue = Math.max(
        ...categorystatus.map((item) => item.total),
        1
    );


    return (
        <div className="h-screen p-6  bg-gray-50">
        
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-orange-500">
                            Welcome back 👋
                        </p>

                        <h1 className="text-3xl font-bold text-gray-900">
                            Dashboard
                        </h1>

                        <div className="mb-6 flex items-center justify-between">
                            <p className="mt-1 text-sm text-gray-500">
                                See how users interact with your recipes
                            </p>
                        </div>

                    </div>
                    <Link href={'/upload'} >
                        <button className="flex items-center gap-2 rounded-xl bg-orange-500  px-5 py-2 md:py-3 text-sm font-semibold text-white hover:bg-orange-600">
                            <Plus size={18} />
                            Add Recipe
                        </button>
                    </Link>
                </div>


                {/* status */}
                <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2  ">

                    {status?.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div key={item.title} className="rounded-2xl border bg-white p-5  shadow-sm">
                                <div className="flex items-center justify-between">

                                    <div className="rounded-xl bg-orange-50 p-3 text-orange-500">
                                        <Icon size={22} />
                                    </div>

                                    <TrendingUp
                                        size={18}
                                        className="text-green-500"
                                    />
                                </div>

                                <h2 className="mt-5 text-2xl font-bold">
                                    {item.value}
                                </h2>

                                <p className="mt-1 text-sm font-medium text-gray-700">
                                    {item.title}
                                </p>
                            </div>
                        );
                    })}

                </div>


                {/* Quick Actions */}
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">

                    {/* Categories */}
                    <div className="rounded-2xl bg-white p-6 shadow-sm">

                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold">
                                    Popular Categories
                                </h2>
                            </div>

                            <BookOpen
                                size={22}
                                className="text-orange-500"
                            />
                        </div>


                        <div className="space-y-5">

                            {categorystatus.length > 0 ? (

                                categorystatus?.map((item) => {

                                    const percentage =
                                        (item.total / maxCategoryValue) * 100;

                                    return (
                                        <div key={item.categoryType}>

                                            <div className="mb-1 flex justify-between text-sm">

                                                <span className="font-medium">
                                                    {item.categoryType}
                                                </span>

                                                <span className="font-semibold">
                                                    {item.total} recipes
                                                </span>

                                            </div>


                                            <div className="h-2 overflow-hidden rounded-full bg-gray-100">

                                                <div
                                                    className="h-full rounded-full bg-orange-500 transition-all"
                                                    style={{
                                                        width: `${percentage}%`,
                                                    }}
                                                />

                                            </div>

                                        </div>
                                    );
                                })

                            ) : (

                                <p className="py-5 text-center text-sm text-gray-500">
                                    No categories available
                                </p>

                            )}

                        </div>

                    </div>


                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 gap-6">

                        <div className="h-fit rounded-2xl border bg-white p-5 shadow-sm">

                            <h2 className="text-lg font-bold">
                                Quick Actions
                            </h2>

                            <p className="mb-5 text-sm text-gray-500">
                                Manage your account
                            </p>


                            <div className="space-y-3">

                                {/* Add Recipe */}
                                <Link href={"/upload"} className="flex " >
                                    <button className="flex w-full items-center gap-3 rounded-xl bg-orange-50 p-4 text-left hover:bg-orange-100">

                                        <div className="rounded-lg bg-orange-500 p-2 text-white">
                                            <Plus size={18} />
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold">
                                                Add Recipe
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                Create a new recipe
                                            </p>
                                        </div>

                                    </button>
                                </Link>

                                {/* Saved Recipes */}
                                <Link href={"/save-recipes"} className="flex " >
                                    <button className="flex w-full items-center gap-3 rounded-xl bg-gray-50 p-4 text-left hover:bg-gray-100">

                                        <Bookmark size={20} />

                                        <div>
                                            <p className="text-sm font-semibold">
                                                My Saved Recipes
                                            </p>


                                            <p className="text-xs text-gray-500">
                                                View saved recipes
                                            </p>
                                        </div>

                                    </button>
                                </Link>


                                {/* Liked Recipes */}

                                <button className="flex w-full items-center gap-3 rounded-xl bg-gray-50 p-4 text-left hover:bg-gray-100">

                                    <Heart size={20} />
                                    <Link href={"/like"} >
                                        <div>
                                            <p className="text-sm font-semibold">
                                                My Liked Recipes
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                View liked recipes
                                            </p>
                                        </div>
                                    </Link>

                                </button>


                            </div>

                        </div>

                    </div>

                </div>


                {/* Create Recipe Banner */}
                <div className="my-10 rounded-2xl bg-orange-400 p-6 text-white">

                    <ChefHat size={35} />

                    <h2 className="mt-4 text-xl font-bold">
                        Create New Category🍴
                    </h2>

                    <p className="mt-2 text-sm text-orange-50">
                        Create delicious recipes and share them with
                        the food-loving community.
                    </p>
                    <Link href={"/create-category"} className="flex " >
                        <button className="mt-5 flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-orange-500">
                            Create New Category
                            <ArrowRight size={17} />
                        </button>
                    </Link>
                </div>



                {/* Create Category Recipe Banner */}
                <div className="my-10 rounded-2xl bg-violet-400 p-6 text-white">

                    <ChefHat size={35} />

                    <h2 className="mt-4 text-xl font-bold">
                        Check and Create New Recipes Recipes 🍴
                    </h2>

                    <p className="mt-2 text-sm text-orange-50">
                        Create delicious recipes and share them with
                        the food-loving community.
                    </p>
                    <Link href={"/upload"} className="flex " >
                        <button className="mt-5 flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-orange-500">
                            Create Recipe
                            <ArrowRight size={17} />
                        </button>
                    </Link>
                </div>
           
        </div>
    );
}

