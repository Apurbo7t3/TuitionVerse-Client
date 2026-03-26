import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Star } from 'lucide-react';

const ReviewCarousel = ({ reviews = [] }) => {
    return (
        <section className="py-12 bg-purple-50 overflow-hidden">
            <h2 className="text-4xl font-bold text-center mb-8 text-purple-800">
                What Students Say
            </h2>
            <div className="max-w-7xl mx-auto px-6">
                <div className="relative pb-12">
                    <Swiper
                        spaceBetween={24}
                        slidesPerView={3}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="reviewSwiper"
                        style={{ overflow: 'visible' }}
                    >
                        {reviews.map((review) => (
                            <SwiperSlide key={review.id} className="h-auto">
                                <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition h-full flex flex-col">
                                    <div className="flex gap-1 text-yellow-500 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${i < review.rating ? "fill-yellow-400" : ""}`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 flex-1">"{review.comment}"</p>
                                    <div className="mt-4">
                                        <div className="font-semibold text-gray-800">{review.student_name}</div>
                                        <div className="text-gray-500 text-sm">Student</div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <style jsx>{`
                .reviewSwiper .swiper-pagination {
                    bottom: -2rem !important;
                    position: absolute;
                }
                .reviewSwiper .swiper-slide {
                    height: auto;
                    display: flex;
                }
                .reviewSwiper .swiper-slide > * {
                    width: 100%;
                }
                /* Clean navigation arrows - no background */
                .reviewSwiper .swiper-button-prev,
                .reviewSwiper .swiper-button-next {
                    color: #7c3aed;
                    background: transparent;
                    width: 40px;
                    height: 40px;
                    transition: all 0.2s;
                }
                .reviewSwiper .swiper-button-prev::after,
                .reviewSwiper .swiper-button-next::after {
                    font-size: 1.5rem;
                    font-weight: bold;
                }
                .reviewSwiper .swiper-button-prev:hover,
                .reviewSwiper .swiper-button-next:hover {
                    color: #5b21b6;
                    transform: scale(1.1);
                }
                /* Hide arrows on small screens */
                @media (max-width: 640px) {
                    .reviewSwiper .swiper-button-prev,
                    .reviewSwiper .swiper-button-next {
                        display: none;
                    }
                }
            `}</style>
        </section>
    );
};

export default ReviewCarousel;