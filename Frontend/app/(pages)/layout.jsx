import CategoriesType from "@/components/CategoriesTypes";
import Footer from "@/components/Footer";
import HomeNavBar from "@/components/HomeNavbar"


export default async function Layout({children}){
    
    return (
        <main >
            <HomeNavBar/>
            <div className="flex flex-col">
        
                <CategoriesType/>
                {children}

            </div>
            <Footer/>
            
        </main>
        
            
   
     
    )
}