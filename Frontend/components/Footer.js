"use client";

import Link from "next/link";
// import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";

export default function Footer() {

    return (
        <footer className="bg-gray-800 z-0 text-gray-300">
            {/* Footer */}
            <section className="bg-gray-800 text-white pt-8 text-center">

                <p className="font-semibold">
                Made with ❤️ for Food Lovers
                </p>

                <p className="text-red-300 text-sm mt-2">
                © 2026 Your Food Recipe Creater App. All rights reserved.
                </p>

            </section>

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 py-6">

                    {/* Logo / About */}
                    <div className="flex flex-col justify-center items-center">

                        <h2 className="text-3xl font-bold text-white">
                            Food<span className="text-orange-500">Hub</span>
                        </h2>

                        <p className="mt-4 text-sm leading-10 text-gray-400">
                            Discover delicious recipes, share your favorite
                            dishes and explore new flavors with our food
                            community.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-4 mt-6">
                            <a
                                href="#"
                                className="p-2 rounded-full bg-gray-800 hover:bg-orange-500 hover:text-white transition"
                            >
                                {/* <Facebook size={18} /> */}
                            </a>

                            <a
                                href="#"
                                className="p-2 rounded-full bg-gray-800 hover:bg-orange-500 hover:text-white transition"
                            >
                                {/* <Instagram size={18} /> */}
                            </a>

                            <a
                                href="#"
                                className="p-2 rounded-full bg-gray-800 hover:bg-orange-500 hover:text-white transition"
                            >
                                {/* <Twitter size={18} /> */}
                            </a>

                            <a
                                href="#"
                                className="p-2 rounded-full bg-gray-800 hover:bg-orange-500 hover:text-white transition"
                            >
                                {/* <Youtube size={18} /> */}
                            </a>
                        </div>

                    </div>

                <div className="sm:gap-10 md:gap-15">

                    <div className="flex justify-around  " >
                        {/* Quick Links */}
                        <div className=" " >
                            <h3 className="text-lg font-semibold text-white mb-5">
                                Quick Links
                            </h3>

                            <ul className="text-sm md:text-xl space-y-3  gap-2  ">
                                <li>
                                    <Link
                                        href="/"
                                        className="hover:text-orange-500 transition"
                                    >
                                        Home
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/contact"
                                        className="hover:text-orange-500 transition"
                                    >
                                        Contact
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/about"
                                        className="hover:text-orange-500 transition"
                                    >
                                        about
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/upload"
                                        className="hover:text-orange-500 transition"
                                    >
                                        Upload
                                    </Link>
                                </li>
                            </ul>
                        </div>


                        {/* Categories */}
                        <div className=" " >
                            <h3 className="text-lg font-semibold text-white mb-5 ">
                                Categories
                            </h3>

                            <ul className="space-y-3 text-sm md:text-xl gap-2 ">
                                <li>
                                    <Link
                                        href="/all-categories"
                                        className="hover:text-orange-500 transition"
                                    >
                                    All
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/category/veg"
                                        className="hover:text-orange-500 transition"
                                    >
                                        Vegetarian
                                    </Link>
                                </li>


                                <li>
                                    <Link
                                        href="/category/non-veg"
                                        className="hover:text-orange-500 transition"
                                    >
                                        Non-Vegetarian
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/category/breakfast"
                                        className="hover:text-orange-500 transition"
                                    >
                                        Breakfast
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/category/dessert"
                                        className="hover:text-orange-500 transition"
                                    >
                                        Desserts
                                    </Link>
                                </li>
                            </ul>
                        </div>

                    </div>


                    {/* Contact */}
                    <div className="flex flex-col justify-center items-center " >
                        <h1 className="font-extrabold text-lg text-white mb- gap-2 ">
                            Contact Us
                        </h1>

                        <p className="text-sm sm:col-span-2 text-gray-400 leading-6">
                            Have a recipe or suggestion? We'd love to hear
                            from you.
                        </p>

                        <div className="flex items-center gap-3 mt-5">
                            {/* <Mail size={18} className="text-orange-500" /> */}

                        
                        </div>
                    </div>

                </div>
            </div>


            {/* Bottom Footer */}
            <div className="border-t border-gray-800  ">

                <div className="max-w-7xl mx-auto px-6 py-2 flex flex-col md:flex-row justify-between items-center gap-3">

                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} FoodHub. All rights reserved.
                    </p>

                    <div className="flex gap-6 text-sm text-gray-500">

                        <Link
                            href="/privacy-policy"
                            className="hover:text-orange-500 transition"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/terms"
                            className="hover:text-orange-500 transition"
                        >
                            Terms & Conditions
                        </Link>

                    </div>

                </div>

            </div>

        </footer>
    );
}