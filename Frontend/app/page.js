import BannerSlider from "@/components/Banner";
import CategoriesSection from "@/components/CategoriesSection";
import CategoriesType from "@/components/CategoriesTypes";
import CustomerReviews from "@/components/CustomerReviews";
import Footer from "@/components/Footer";
import HomeNavBar from "@/components/HomeNavbar";
import SectionGrid from "@/components/SectionGrid";
import { requireAuth } from "@/lib/auth/serverAuth";



export const dynamic = "force-dynamic";

export default async function Home () {
  
  const user = await requireAuth();
  
    console.log("User form requiredAuth in Server HomePage:", user);
  

  return (
    <div className="h-screen " >

      <HomeNavBar user={user} />

      {/* //category types */}
      <CategoriesType />

      {/* //banner */}
      <BannerSlider/>
      
      {/* //category */}
     
      <CategoriesSection />
 
      {/* Shows all Recipes in Carts*/}

      <SectionGrid  />

      {/* our Customer Reviews */}
      <CustomerReviews/>
      
   

    {/* Footer */}
      <Footer/>

    </div>
   
  );
}
