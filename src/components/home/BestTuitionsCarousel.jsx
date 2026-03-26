import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import BestTuitionsCard from './BestTuitionsCard';

const BestTuitionsCarousel = ({ tutions }) => {
    return (
        <section className="pb-16 pt-10 bg-purple-100 overflow-hidden">
            <h2 className="text-4xl font-bold text-center mb-10 text-purple-800">
                Popular Tuitions
            </h2>
            <div className="max-w-7xl mx-auto px-6">
                <div className="relative pb-12">
                    <Swiper
                        spaceBetween={24}
                        slidesPerView={3}
                        autoplay={{ delay: 2500, disableOnInteraction: false }}
                        loop={true}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper"
                        style={{ overflow: 'visible' }}
                    >
                        {tutions.map((tuition) => (
                            <SwiperSlide key={tuition.id} className="h-auto">
                                <BestTuitionsCard tuition={tuition} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <style jsx>{`
                .mySwiper .swiper-pagination {
                    bottom: -2rem !important;
                    position: absolute;
                }
                .mySwiper .swiper-slide {
                    height: auto;
                    display: flex;
                }
                .mySwiper .swiper-slide > * {
                    width: 100%;
                }
                /* Navigation arrows - clean, no background */
                .mySwiper .swiper-button-prev,
                .mySwiper .swiper-button-next {
                    color: #7c3aed;
                    background: transparent;
                    width: 40px;
                    height: 40px;
                    transition: all 0.2s;
                }
                .mySwiper .swiper-button-prev::after,
                .mySwiper .swiper-button-next::after {
                    font-size: 1.5rem;
                    font-weight: bold;
                }
                .mySwiper .swiper-button-prev:hover,
                .mySwiper .swiper-button-next:hover {
                    color: #5b21b6;
                    transform: scale(1.1);
                }
                /* Optional: add a slight shadow on hover if desired, but no background */
                /* Hide navigation arrows on small screens */
                @media (max-width: 640px) {
                    .mySwiper .swiper-button-prev,
                    .mySwiper .swiper-button-next {
                        display: none;
                    }
                }
            `}</style>
        </section>
    );
};

export default BestTuitionsCarousel;