import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

import HeroSlide from "./HeroSlide";
import { popularPokemon } from "@/constants/HeroSlide";
import assets from "@/assets/assets";
import ScrollToDexButton from "./ui/ScrollToDex";
import useDarkTheme from "@/hooks/useDarkTheme";

function HeroSection() {
  const isDark = useDarkTheme();
  return (
    <section
      className={`
        relative w-full overflow-hidden min-h-screen
        ${isDark ? "bg-slate-950/40" : "bg-slate-400/40"}
        pb-20 pt-24 md:pt-28
      `}
    >
      {/* Top bar with logo */}
      <div className="absolute top-0 inset-x-0 flex justify-center pt-4 z-30">
        <div
          className="
          flex flex-col items-center gap-1 px-6 py-2 rounded-2xl
          backdrop-blur-md 
          
        "
        >
          <img
            src={assets.pokemonLogo}
            alt="Pokémon"
            className="h-16 md:h-18 object-cover drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
            draggable="false"
          />
        </div>
      </div>

      {/* Slides container */}
      <div className="relative max-w-7xl mx-auto min-h-[66vh] flex items-center px-5 md:px-10">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 4500, disableOnInteraction: true }}
          loop
          speed={650}
          className="w-full"
        >
          {popularPokemon.map((name) => (
            <SwiperSlide key={name}>
              <HeroSlide pokemonName={name} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Scroll cue */}
      <ScrollToDexButton />
    </section>
  );
}

export default HeroSection;
