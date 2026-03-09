import { FaGraduationCap, FaStar } from 'react-icons/fa';
import { GiTeacher } from 'react-icons/gi';

const TeacherInfoCard = ({ tuition }) => {

    const avgRating = tuition.reviews?.length
        ? (tuition.reviews.reduce((acc, review) => acc + review.rating, 0) / tuition.reviews.length).toFixed(1)
        : 0;

    return (
        <div>
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-purple-100">
                <div className="bg-linear-to-r from-purple-400 to-purple-900 p-6 text-white">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                            <GiTeacher className="w-8 h-8 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">{tuition.teacher_name}</h3>
                            <p className="text-purple-100">{tuition.subject} Specialist</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-4">
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-purple-50 p-3 rounded-xl text-center">
                            <FaGraduationCap className="mx-auto text-purple-600 mb-1" />
                            <p className="text-xs text-gray-500">Subject</p>
                            <p className="font-semibold text-gray-700 text-sm">{tuition.subject}</p>
                        </div>
                        <div className="bg-pink-50 p-3 rounded-xl text-center">
                            <FaStar className="mx-auto text-yellow-500 mb-1" />
                            <p className="text-xs text-gray-500">Rating</p>
                            <p className="font-semibold text-gray-700">{avgRating} ★</p>
                        </div>
                    </div>

                    {/* Class Details */}
                    <div className="bg-gray-50 p-4 rounded-xl">
                        <h4 className="font-semibold text-gray-700 mb-2">Class Details</h4>
                        <p className="text-sm text-gray-600">
                            Class: {tuition.class_detail}<br />
                            Duration: {tuition.duration}<br />
                            Days: {tuition.days_in_week?.length} days/week
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherInfoCard;