"use client";

import { useRouter } from "next/navigation";
import { ChefHat, Home, Search, Carrot, Leaf, Soup, Salad } from "lucide-react";

export default function AlgoliyaNotFound() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#fffefa] overflow-hidden relative flex justify-center">

      <div className="w-full max-w-275 pb-8 text-center">
        <div className="relative mx-auto w-full max-w-212.5 h-97 md:h-117">
          <div className=" absolute left-1/2 top-13 -translate-x-1/2 w-162 h-83 max-w-[90%] bg-[#fff8e9] rounded-[45%_55%_48%_52%] rotate-3  "/>

          {/* Small decorative tomato */}
          <div className="absolute left-[20%] top-[35%] hidden md:block">
            <div className="w-16 h-16 rounded-full border-[3px] border-[#e4d9bd] relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Leaf
                  className="w-7 h-7 text-[#e4d9bd]"
                  strokeWidth={1.5}
                />
              </div>
            </div>
          </div>

          {/* Small decorative carrot */}
          <Carrot
            className=" absolute right-[18%] top-[50%] hidden md:block w-16 h-16 text-[#e4d9bd] rotate-30   "
            strokeWidth={1.5}
          />

          {/* Small decorative leaves */}
          <Leaf
            className=" absolute left-[28%] top-[25%] hidden md:block w-10 h-10 text-[#e4d9bd] rotate-[-20deg]   "
            strokeWidth={1.5}
          />

          <Leaf
            className=" absolute right-[28%] top-[25%] hidden md:block w-9 h-9 text-[#e4d9bd] rotate-30  "
            strokeWidth={1.5}
          />

        
          <div
            className="  absolute  right-[12%]  top-21  md:right-[16%]  md:top-20  rotate-[5deg]  z-20  "
          >

            {/* Sign pole */}
            <div
              className=" absolute left-1/2 top-13 -translate-x-1/2 w-5 h-52 bg-linear-to-r from-[#93602c] via-[#c48a4c] to-[#875523] rounded-b-lg shadow-md  "
            />

            {/* Wooden sign */}
            <div
              className=" relative w-60 h-21 bg-[#bd8040] border-[6px] border-[#8c5729] rounded-xl shadow-lg flex items-center justify-center overflow-hidden   "
            >

              {/* Wood lines */}
              <div className="absolute left-4 right-4 top-5 border-t border-[#dca463]" />
              <div className="absolute left-4 right-4 bottom-5 border-t border-[#9d642f]" />

              {/* Nail */}
              <div className="absolute left-5 top-1/2 w-2 h-2 rounded-full bg-[#70451f]" />
              <div className="absolute right-5 top-1/2 w-2 h-2 rounded-full bg-[#70451f]" />

              <span className="relative z-10 text-[28px] font-black tracking-wide text-[#4e321c]">
                NOT FOUND
              </span>
            </div>
          </div>

          <div  className=" absolute left-1/2 bottom-[55px] -translate-x-1/2 w-[330px] h-[175px] z-10  ">

            {/* Basket handle */}
            <div className="  absolute  left-[50px]  top-[-75px]  w-[230px]  h-[170px]  border-[17px]  border-[#a9652d]  rounded-[50%]  rotate-[-8deg]    "/>

            {/* Basket body */}
            <div className=" absolute   bottom-0   left-0   w-full   h-[145px]   bg-gradient-to-br   from-[#d18b43]   via-[#a9632c]   to-[#82471f]   rounded-[45%_45%_25%_25%]   border-[7px]   border-[#8b5025]   shadow-[0_20px_30px_rgba(90,50,20,0.2)]   overflow-hidden   "
            >

              {/* Basket weave */}
              <div className="absolute inset-3 opacity-40">

                <div className="absolute inset-0 grid grid-cols-7 gap-1">
                  {Array.from({ length: 35 }).map((_, i) => (
                    <div
                      key={i}
                      className="
                        border-l-[3px]
                        border-[#e3a35e]
                        rotate-[8deg]
                      "
                    />
                  ))}
                </div>

                <div className="absolute inset-0 flex flex-col justify-around">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="border-t-[3px] border-[#e3a35e]"
                    />
                  ))}
                </div>

              </div>
            </div>
          </div>

          {/* VEGETABLES  */}

          {/* Tomato */}
          <div
            className=" absolute left-[27%] bottom-[55px] w-[82px] h-[75px] rounded-[50%] bg-gradient-to-br from-[#f15c3b] to-[#bd3827] border-4 border-[#a92f22] z-30 shadow-md  "
          >
            <div className="absolute -top-5 left-7">
              <Leaf
                className="w-9 h-9 text-[#4c8634]"
                strokeWidth={3}
              />
            </div>
          </div>

          {/* Yellow bell pepper */}
          <div className="   absolute   left-[42%]   bottom-[45px]   w-[80px]   h-[115px]   rounded-[45%_45%_40%_40%]   bg-gradient-to-br   from-[#ffd43b]   to-[#eda80d]   border-4   border-[#d89409]   z-30   shadow-md   rotate-[3deg] "
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
              <div className="w-5 h-10 bg-[#4d7d2d] rounded-full rotate-[-12deg]" />
            </div>
          </div>

          {/* Lettuce */}
          <div className="absolute right-[27%] bottom-[50px] z-30">
            <div className="flex items-end">
              <div className="w-20 h-20 rounded-full bg-[#78ad3d] border-4 border-[#61912e]" />
              <div className="w-20 h-24 rounded-full bg-[#8fbe4b] border-4 border-[#689831] -ml-7" />
              <div className="w-20 h-20 rounded-full bg-[#6ca336] border-4 border-[#588b2c] -ml-7" />
            </div>
          </div>

          {/* Garlic */}
          <div className="   absolute   right-[38%]   bottom-[38px]   w-[70px]   h-[70px]   bg-[#f5f1e7]   rounded-[50%_50%_45%_45%]   border-4   border-[#ded8c9]   z-40   shadow-md "
          >
            <div className="absolute left-1/2 -translate-x-1/2 top-[-20px] w-4 h-7 bg-[#d8cdb7] rounded-full" />
          </div>

          {/* Red chilli */}
          <div className="   absolute   right-[23%]   bottom-[55px]   w-[105px]   h-[38px]   bg-gradient-to-r   from-[#d93528]   to-[#ef5a3b]   rounded-[100%]   rotate-[-15deg]   z-40 "
          >
            <div className="absolute right-[-10px] top-[-15px] w-7 h-7 border-t-4 border-[#4c8634] rounded-full" />
          </div>

          {/*  LITTLE HERBS  */}

          <Leaf className="   absolute   left-[37%]   bottom-[30px]   w-10 h-10   text-[#76a83c]   rotate-[-35deg]   z-50 "
          />

          <Leaf className="   absolute   right-[27%]   bottom-[25px]   w-11 h-11   text-[#76a83c]   rotate-[30deg]   z-50 "
          />

        </div>

        {/*  CONTENT  */}

        <section className="relative z-50">

          <h1 className="   text-[42px]   sm:text-[52px]   md:text-[64px]   font-extrabold   tracking-tight   text-[#111827] "
          >
            Recipe Not Found
          </h1>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mt-5 mb-7">

            <div className="w-[150px] sm:w-[210px] border-t-2 border-dashed border-[#efa92d]" />

            <div className="   w-12 h-12   rounded-full   bg-[#fffefa]   flex   items-center   justify-center "
            >
              <ChefHat
                className="w-9 h-9 text-[#efa92d]"
                strokeWidth={2}
              />
            </div>

            <div className="w-[150px] sm:w-[210px] border-t-2 border-dashed border-[#efa92d]" />

          </div>

          {/* Description */}
          <p className="text-[18px] sm:text-[21px] text-[#626975] leading-8">
            Oops! The recipe you’re looking for doesn’t exist
            <br className="hidden sm:block" />
            or has been removed.
          </p>

          <p className="mt-3 text-[18px] sm:text-[21px] text-[#626975]">
            Let’s find something delicious for you!
          </p>

          {/* Buttons */}
          <div
            className="
              mt-10
              flex
              flex-col
              sm:flex-row
              items-center
              justify-center
              gap-5
            "
          >

            {/* Back Home */}
            <button
              onClick={() => router.push("/")} className="   w-full   sm:w-[278px]   h-[70px]   rounded-2xl   bg-[#56862e]   hover:bg-[#487324]   text-white   text-[18px]   font-bold   flex   items-center   justify-center   gap-3   shadow-sm   transition-all   duration-300   hover:-translate-y-1   hover:shadow-lg "
            >
              <Home className="w-7 h-7 fill-white" />
              Back to Home
            </button>

            {/* Browse */}
            <button
              onClick={() => router.push("/")}
              className=" w-full sm:w-[278px] h-[70px] rounded-2xl bg-white border-2 border-[#719654] text-[#304c25] text-[18px] font-bold flex items-center justify-center gap-3 transition-all duration-300 hover:bg-[#f5f8f0] hover:-translate-y-1 hover:shadow-lg "
            >
              <Search className="w-7 h-7" />
              Browse Recipes
            </button>

          </div>

        </section>

        {/*  BOTTOM DECORATION  */}

        <div className="relative mt-24 h-[90px]">

          {/* Green curved background */}
          <div
            className=" absolute left-[-10%] right-[-10%] bottom-[-30px] h-[100px] bg-[#f1f6df] rounded-[50%_50%_0_0] "   />

          {/* Decorative icons */}
          <div
            className=" relative z-10 flex items-center justify-center gap-8 sm:gap-12 text-[#abc983] "  >
            <Leaf className="w-10 h-10 rotate-[-25deg]" />
            <Carrot className="w-10 h-10 rotate-[15deg]" />
            <Salad className="w-11 h-11" />
            <Soup className="w-10 h-10 rotate-[-10deg]" />
            <ChefHat className="w-11 h-11" />
            <Leaf className="w-10 h-10 rotate-[25deg]" />
            <Salad className="w-11 h-11" />
          </div>

        </div>

      </div>
    </main>
  );
}