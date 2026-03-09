import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Star } from 'lucide-react';

const ReviewCarousel = ({ reviews = [] }) => {
    return (
        <div>
            <section className="py-20 bg-purple-50">
                <h2 className="text-4xl font-bold text-center mb-16 text-purple-800">
                    What Students Say
                </h2>

                <div className="gap-10 max-w-7xl mx-auto px-6">
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
                    >{reviews.map((review) => (
                        <SwiperSlide>
                            <div key={review.id} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                                <div className="flex gap-1 text-yellow-500 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-5 h-5 ${i < review.rating ? "fill-yellow-400" : ""}`} />
                                    ))}
                                </div>
                                <p className="text-gray-600">"{review.comment}"</p>
                                <div className="mt-4 font-semibold text-gray-800">{review.student_name}</div>
                                <div className="text-gray-500 text-sm">Student</div>
                            </div>

                        </SwiperSlide>
                    ))}
                    </Swiper>
                </div>
            </section>
        </div>
    );
};

export default ReviewCarousel;