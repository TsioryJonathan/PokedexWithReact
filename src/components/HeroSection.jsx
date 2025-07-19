import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import HeroSlide from "@/constants/HeroSlide.jsx";
import { popularPokemon } from "@/constants/HeroSlide.jsx";

function HeroSection() {
    return (
        <div className="justify-center items-center">
            <img src="/src/assets/pokeball2.png" className="absolute h-50 right-0 top-1" alt="" />
            <img src="/src/assets/pokeball1.png" className="absolute h-60 left-0 top-58" alt="" />
            {/* <div className="flex flex-col items-center">
                <img src="/src/assets/pokemon2.png" className="absolute h-80  top-72" alt="" />
            </div> */}
            <section className={`w-full min-h-[80vh] bg-gradient-to-tl from-black-900 to-gray-200 px-6 py-10 flex items-center justify-center rounded-b-[35%] border-80 border-t-0 `}>

                <Swiper
                    modules={[Autoplay]}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    loop={true}
                    className="w-full max-w-7xl"
                >
                    {popularPokemon.map((name) => (
                        <SwiperSlide key={name}>
                            <HeroSlide pokemonName={name} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
        </div>
    );
}

export default HeroSection;
