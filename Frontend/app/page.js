import BannerSlider from "@/components/Banner";
import CategoriesSection from "@/components/CategoriesSection";
import CategoriesType from "@/components/CategoriesTypes";
import CustomerReviews from "@/components/CustomerReviews";
import Footer from "@/components/Footer";
import HomeNavBar from "@/components/HomeNavbar";
import SectionGrid from "@/components/SectionGrid";




export default async function Home () {
  
   

  return (
    <div className="h-screen " >

      <HomeNavBar/>

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
