"use client";
import React from "react";
import Slider from "react-slick";



export default function BannerSlider() {
 
const settings = { dots: true, infinite: true, autoplay: true, autoplaySpeed: 2000, speed: 800, cssEase: "linear",};

  return (
    <Slider z-0 {...settings} className="mt-17 overflow-hidden shrink-0 "  >

      <div className="w-full h-100">
        <img className="object-cover h-full overflow-hidden" src={"/bannerImage/image2.png"} />
      </div>

      <div className="w-full h-100" >
        <img className="object-cover h-full overflow-hidden" src={"/bannerImage/image4.png"} />
      </div>

      <div className="w-full h-100" >
        <img className="object-cover h-full overflow-hidden" src={"/bannerImage/image1.png"} />
      </div>    

      <div className="w-full h-100" >
        <img className="object-cover h-full overflow-hidden" src={"/bannerImage/image3.jpg"} />
      </div>

      <div className="w-full h-100" >
        <img className="object-cover h-full overflow-hidden" src={"/bannerImage/image6.png"} />
      </div>

      <div className="w-full h-100" >
        <img className="object-cover h-full overflow-hidden" src={"/bannerImage/image3.jpg"} />
      </div>

      
    </Slider>
  );
}