"use client"

import useSWR from "swr";
import { Card } from './Card';
import { fetcher } from "@/lib/fetcher";
import { AuthProvider } from "@/context/AuthProvider";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function SectionGrid({filterRecipe}) {
  
  let { data,  error } = useSWR("/recipe/all/latest", fetcher);
  data = filterRecipe || data?.data || [];

  useEffect(() => {
    if (error) {
        toast.error("Internet Issue")
    }
    
  },[ error ])



  return (
    <div className=' flex py-5 bg-stone-100 flex-wrap justify-center items-center gap-4 px-7 lg:py-10 '>
    
      {
        data ?
          data?.map((item) => {
            return (

              <AuthProvider key={item?._id} >
                <Card item={item} />
              </AuthProvider>
            )
          })
          :
          <div>Loading Category...</div>
      }
    </div>
  )
}
