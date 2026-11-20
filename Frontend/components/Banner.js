
"use client";

import React from "react";
import Slider from "react-slick";

export default function BannerSlider() {

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 800,
    cssEase: "linear",
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
  };

  const images = [
    "/bannerImage/image2.png",
    "/bannerImage/image4.png",
    "/bannerImage/image1.png",
    "/bannerImage/image3.jpg",
    "/bannerImage/image6.png",
    "/bannerImage/image3.jpg",
  ];

  return (
    <div className="w-full mt-32 overflow-hidden shrink-0">
      <Slider {...settings} className="banner-slider">

        {images.map((image, index) => (
          <div key={index}>
            <div className=" w-full h-76 sm:h-63 md:h-88 lg:h-105 xl:h-120 overflow-hidden">
              <img
                src={image}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        ))}

      </Slider>
    </div>
  );
}
