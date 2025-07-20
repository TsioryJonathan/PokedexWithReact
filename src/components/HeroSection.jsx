import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

import HeroSlide from "@/components/HeroSlide";
import popularPokemon from "@/constants/HeroSlide";

function HeroSection() {
  return (
    <section
      aria-label="Featured Pokémon carousel"
      className="relative w-full overflow-hidden"
    >
      {/* Background principal */}
      <div
        className="absolute inset-0 -z-10
        bg-[radial-gradient(circle_at_30%_35%,rgba(255,255,255,0.07),transparent_55%)]
        before:absolute before:inset-0 before:bg-gradient-to-br
        before:from-slate-950 before:via-slate-900 before:to-slate-800/90
        before:-z-10"
      />

      {/* Orbes décoratives */}
      <div className="pointer-events-none absolute -top-44 -right-40 w-[38rem] h-[38rem] rounded-full bg-gradient-to-br from-amber-400/10 via-fuchsia-500/5 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 -left-60 w-[46rem] h-[46rem] rounded-full bg-gradient-to-tr from-sky-400/10 via-indigo-500/10 to-transparent blur-3xl" />

      {/* Pokeballs décoratives (si tu veux les garder) */}
      <img
        src="/src/assets/pokeball2.png"
        alt=""
        aria-hidden="true"
        className="absolute right-4 top-4 h-40 opacity-30 rotate-12 select-none pointer-events-none"
        draggable="false"
      />
      <img
        src="/src/assets/pokeball1.png"
        alt=""
        aria-hidden="true"
        className="absolute left-4 top-1/3 h-56 opacity-20 -rotate-6 select-none pointer-events-none"
        draggable="false"
      />

      {/* Conteneur principal */}
      <div
        className="
          relative
          mx-auto
          max-w-[1350px]
          px-4 sm:px-8
          py-14 md:py-20
          flex
          items-center
          min-h-[70vh]
          md:min-h-[75vh]
        "
      >
        <Swiper
          modules={[Autoplay, Pagination]}
          // autoplay amélioré
          autoplay={{ delay: 5200, disableOnInteraction: false }}
          speed={850}
          loop
          pagination={{
            clickable: true,
            bulletClass:
              "swiper-pagination-bullet !bg-slate-500 !opacity-60 hover:!opacity-100 transition",
            bulletActiveClass: "!bg-amber-400 !opacity-100",
          }}
          className="w-full"
          onSwiper={(swiper) => {
            // Pause autoplay si l’utilisateur survole
            swiper.el.addEventListener("mouseenter", () =>
              swiper.autoplay.stop()
            );
            swiper.el.addEventListener("mouseleave", () =>
              swiper.autoplay.start()
            );
          }}
        >
          {popularPokemon.map((name) => (
            <SwiperSlide key={name}>
              <HeroSlide pokemonName={name} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Masque arrondi bas (optionnel) */}
      <div
        className="absolute bottom-0 left-0 w-full h-24
        bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}

export default HeroSection;
