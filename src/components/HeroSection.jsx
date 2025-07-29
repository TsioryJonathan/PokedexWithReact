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
        ${isDark ? "bg-slate-950" : "bg-slate-400"}
        pb-20 pt-24 md:pt-28
      `}
    >
      {/* Soft layered gradients */}
      {isDark ? (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(255,255,255,0.09),transparent_60%)] opacity-40" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_75%,rgba(255,255,255,0.06),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.05),transparent_30%,transparent_70%,rgba(255,255,255,0.04))]" />
          <div className="pointer-events-none absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-slate-950 to-transparent" />
        </>
      ) : (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(0,0,0,0.07),transparent_60%)] opacity-40" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_75%,rgba(0,0,0,0.04),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.04),transparent_30%,transparent_70%,rgba(0,0,0,0.02))]" />
          <div className="pointer-events-none absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-gray-300 to-transparent" />
        </>
      )}

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
