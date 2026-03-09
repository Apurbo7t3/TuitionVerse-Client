import { Link } from 'react-router-dom';
import {
    FiBookOpen,
    FiUsers,
    FiBriefcase
} from 'react-icons/fi';
import { GiBlackBook, GiGraduateCap } from 'react-icons/gi';
const TeacherQuickAccessAndTuitions = ({ teacher }) => {
    return (
        <div className='space-y-6'>
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link to="/dashboard/classrooms" className="bg-indigo-100 hover:bg-purple-200 rounded-xl p-4 text-center transition">
                        <FiBookOpen className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                        <span className="text-sm text-black font-medium">My Tuitions</span>
                    </Link>
                    <Link to="/dashboard/applications" className="bg-blue-50 hover:bg-blue-100 rounded-xl p-4 text-center transition">
                        <FiUsers className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <span className="text-sm text-black font-medium">Applications</span>
                    </Link>
                    <Link to="/dashboard/classrooms" className="bg-green-50 hover:bg-green-100 rounded-xl p-4 text-center transition">
                        <GiBlackBook className="w-6 h-6 text-green-600 mx-auto mb-2" />
                        <span className="text-sm text-black font-medium">Classrooms</span>
                    </Link>
                    <Link to="/dashboard/create" className="bg-orange-100 hover:bg-yellow-100 rounded-xl p-4 text-center transition">
                        <FiBriefcase className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                        <span className="text-sm text-black font-medium">Post Tuition</span>
                    </Link>
                </div>
            </div>

            {/* Recent Tuitions List (Simple) */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Your Tuitions</h3>
                    <Link to="/dashboard/classrooms" className="text-sm text-purple-600 hover:text-purple-800">
                        View All →
                    </Link>
                </div>
                <div className="space-y-3">
                    {teacher.tuitions.slice(0, 3).map((tuition) => (
                        <div key={tuition.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${tuition.available ? 'bg-green-100' : 'bg-gray-200'}`}>
                                    <FiBookOpen className={`w-4 h-4 ${tuition.available ? 'text-green-600' : 'text-gray-500'}`} />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800">{tuition.subject}</p>
                                    <p className="text-xs text-gray-500">Class {tuition.class_detail} • ৳{tuition.price}</p>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row items-center gap-2">
                                <span className={`text-xs px-2 py-1 rounded-full ${tuition.available ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-600'}`}>
                                    {tuition.available ? 'Active' : 'Inactive'}
                                </span>
                                {tuition.classroom && (
                                    <span className=" text-xs text-center py-1 rounded-full bg-green-500 px-2">Student Assigned</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeacherQuickAccessAndTuitions;