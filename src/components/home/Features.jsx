import math from '../../assets/math.webp';
import physics from '../../assets/physics.webp';
import english from '../../assets/english.jpg';
import chemistry from '../../assets/chemistry.jpg';
import ict from '../../assets/ict.webp';
import biology from '../../assets/biology.jpg';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
const Features = () => {
    const slides = [
        {
            id: 1,
            title: "Mathematics",
            description: "Master algebra, calculus, and geometry with expert guidance.",
            image: math
        },
        {
            id: 2,
            title: "Physics",
            description: "Understand mechanics, electricity, and quantum physics.",
            image: physics
        },
        {
            id: 3,
            title: "Chemistry",
            description: "Explore reactions, periodic table, and organic chemistry.",
            image: chemistry
        },
        {
            id: 4,
            title: "Biology",
            description: "Dive into cells, genetics, ecosystems and enhace knowledge.",
            image: biology
        },
        {
            id: 5,
            title: "English",
            description: "Improve grammar, literature, and writing skills.",
            image: english
        },
        {
            id: 6,
            title: "ICT",
            description: "Learn programming, databases, and networking.",
            image: ict
        }
    ];

    return (
        <div className="py-10 bg-purple-50">
            <h1 className="text-3xl font-bold text-center text-purple-800">Learn Any Subject With US</h1>
            <div className="max-w-7xl mx-auto px-6">
                <Swiper
                    modules={[Autoplay]}
                    slidesPerView={3}
                    spaceBetween={30}
                    loop={true}
                    speed={8000}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="ease-linear!"
                >
                    {slides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div className="bg-white min-h-4/6 rounded-3xl p-3 shadow-xl border border-gray-100 overflow-hidden my-8">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="h-48 w-full object-cover rounded-2xl"
                                />
                                <div className="my-2 text-center">
                                    <h3 className="font-semibold text-2xl text-purple-800">
                                        {slide.title}
                                    </h3>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-lg text-gray-500">
                                        {slide.description}
                                    </h3>
                                </div>

                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Features;