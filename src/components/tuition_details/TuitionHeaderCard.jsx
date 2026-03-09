import { FaCalendarAlt, FaChalkboardTeacher, FaClock, FaStar } from 'react-icons/fa';
import { GiDuration } from 'react-icons/gi';
import image from '../../assets/tuition.webp'

const TuitionHeaderCard = ({ tuition }) => {

    // Format days for display
    const dayMap = {
        'sat': 'Saturday',
        'sun': 'Sunday',
        'mon': 'Monday',
        'tue': 'Tuesday',
        'wed': 'Wednesday',
        'thu': 'Thursday',
        'fri': 'Friday'
    };

    // Calculate average rating
    const avgRating = tuition.reviews?.length
        ? (tuition.reviews.reduce((acc, review) => acc + review.rating, 0) / tuition.reviews.length).toFixed(1)
        : 0;

    return (
        <div>
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-purple-100">
                {/* Decorative Header with Subject */}
                <div className="h-32 bg-linear-to-r from-purple-400 to-purple-900 relative">
                    <div className="absolute -bottom-12 left-8 z-10">
                        <div className="w-24 h-24 bg-white rounded-full shadow-lg overflow-hidden">
                            <img src={tuition.image || image} alt=""
                                className="object-cover h-full" />
                        </div>
                    </div>
                </div>

                <div className="p-8 pt-16">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                                    {tuition.subject}
                                </span>
                                <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold">
                                    Class {tuition.class_detail}
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold text-gray-800 mb-2">
                                {tuition.subject} Tuition
                            </h1>
                            <div className="flex items-center gap-4 text-gray-600">
                                <div className="flex items-center gap-1">
                                    <FaStar className="text-yellow-400" />
                                    <span className="font-semibold">{avgRating}</span>
                                    <span className="text-gray-400">({tuition.reviews?.length || 0} reviews)</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <FaChalkboardTeacher className="text-purple-500" />
                                    <span>{tuition.teacher_name}</span>
                                </div>
                            </div>
                        </div>

                        {/* Price Tag */}
                        <div className="bg-linear-to-r from-purple-400 to-purple-900 text-white p-4 rounded-2xl shadow-lg">
                            <p className="text-sm opacity-90">Monthly Fee</p>
                            <p className="text-3xl font-bold">৳{tuition.price}</p>
                        </div>
                    </div>

                    {/* Schedule Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 p-4 bg-purple-50 rounded-2xl">
                        <div className="text-center">
                            <FaClock className="mx-auto text-purple-600 mb-1" />
                            <p className="text-xs text-gray-500">Start Time</p>
                            <p className="font-semibold text-gray-700">{tuition.time_from}</p>
                        </div>
                        <div className="text-center">
                            <FaClock className="mx-auto text-pink-600 mb-1" />
                            <p className="text-xs text-gray-500">End Time</p>
                            <p className="font-semibold text-gray-700">{tuition.time_to}</p>
                        </div>
                        <div className="text-center">
                            <FaCalendarAlt className="mx-auto text-purple-600 mb-1" />
                            <p className="text-xs text-gray-500">Days</p>
                            <p className="font-semibold text-gray-700 text-sm">
                                {tuition.days_in_week?.map(day => dayMap[day] || day).join(', ')}
                            </p>
                        </div>
                        <div className="text-center">
                            <GiDuration className="mx-auto text-pink-600 mb-1" />
                            <p className="text-xs text-gray-500">Duration</p>
                            <p className="font-semibold text-gray-700">{tuition.duration}</p>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mt-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-3">About This Tuition</h2>
                        <p className="text-gray-600 leading-relaxed">
                            {tuition.description}
                        </p>
                    </div>

                    {/* Availability Badge */}
                    <div className="mt-6 flex items-center">
                        <div className="mr-3 text-sm font-medium text-gray-700">Status:</div>
                        {tuition.available ? (
                            <div className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                Available for Enrollment
                            </div>
                        ) : (
                            <div className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                                Currently Unavailable
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TuitionHeaderCard;