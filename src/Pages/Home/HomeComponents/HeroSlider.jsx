import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router";

const HeroSlider = () => {
  const slides = [
    {
      title: "Connect with Community",
      description: "Share and learn lessons from others' life experiences.",
      bgImage: "/image/community-hands.png",
    },
    {
      title: "Grow Through Reflection",
      description: "Preserve your wisdom and reflect on your journey.",
      bgImage: "/image/growth-hand-leaf.png",
    },
    {
      title: "Explore Shared Insights",
      description: "Discover meaningful lessons from around the world.",
      bgImage: "/image/community-smile.png",
    },
  ];

  return (
    <Swiper
      navigation={true}
      modules={[Navigation, Autoplay]}
      autoplay={{ delay: 6000 }}
      loop={true}
      className="mySwiper"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="h-screen flex items-center justify-center text-center text-white relative bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          >
            {/* Overlay */}
            {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}

            {/* Slide content */}
            <div className="relative max-w-3xl px-4">
              <h2 className="text-4xl sm:text-6xl font-bold mb-4">
                {slide.title}
              </h2>
              <p className="text-lg sm:text-2xl mb-6">{slide.description}</p>
              <Link
                to="/public-lessons"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
              >
                Explore Lessons
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
