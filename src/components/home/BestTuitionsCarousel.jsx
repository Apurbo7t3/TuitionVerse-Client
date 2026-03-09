import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import BestTuitionsCard from './BestTuitionsCard';
const BestTuitionsCarousel = ({ tutions }) => {
    return (
        <section className="pb-16 pt-10 bg-purple-100">
            <h2 className="text-4xl font-bold text-center mb-10 text-purple-800">
                Popular Tuitions
            </h2>
            <div className="max-w-7xl mx-auto px-6">
                <Swiper
                    spaceBetween={50}
                    slidesPerView={3}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >{
                        tutions.map(
                            (tuition) => (
                                <SwiperSlide>
                                    <BestTuitionsCard tuition={tuition} />
                                </SwiperSlide>
                            )
                        )
                    }
                </Swiper>
            </div>
        </section>
    );
};

export default BestTuitionsCarousel;