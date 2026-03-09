import {
    FiBookOpen,
    FiUsers,
    FiDollarSign,
} from 'react-icons/fi';
import { GiBlackBook } from 'react-icons/gi';

const TeacherStatCardsAndRecentPayment = ({ teacher }) => {
    // Stats cards data
    const stats = [
        {
            icon: FiBookOpen,
            title: "Total Tuitions",
            value: teacher.total_tuitions,
            subtitle: `${teacher.active_tuitions} active`,
            bgColor: "bg-blue-100",
            iconColor: "text-blue-600"
        },
        {
            icon: GiBlackBook,
            title: "Active Classrooms",
            value: teacher.total_classrooms,
            subtitle: `${teacher.total_students} students`,
            bgColor: "bg-green-100",
            iconColor: "text-green-600"
        },
        {
            icon: FiUsers,
            title: "Applications",
            value: teacher.total_applications,
            subtitle: `${teacher.pending_applications} pending`,
            bgColor: "bg-purple-100",
            iconColor: "text-purple-600"
        },
        {
            icon: FiDollarSign,
            title: "Total Earnings",
            value: `৳${teacher.total_earnings.toLocaleString()}`,
            subtitle: "Last 30 days",
            bgColor: "bg-yellow-100",
            iconColor: "text-yellow-600"
        }
    ];
    // Stat Card Component
    const StatCard = ({ icon: Icon, title, value, subtitle, bgColor, iconColor }) => (
        <div className="stat bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm">{title}</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
                    <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
                </div>
                <div className={`p-4 rounded-xl ${bgColor}`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
            </div>
        </div>
    );
    return (
        <div className='space-y-6'>
            {/* Stats Grid and Recent payment*/}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Recent Payment */}
            {teacher.recent_payments.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <FiDollarSign className="text-purple-600" />
                        Recent Payment
                    </h3>
                    <div className="bg-purple-50 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-800">
                                    {teacher.recent_payments[0].subject}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Student: {teacher.recent_payments[0].student}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                    {teacher.recent_payments[0].date}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-purple-600">
                                    ৳{teacher.recent_payments[0].amount}
                                </p>
                                <span className="badge badge-success badge-sm mt-1">Paid</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default TeacherStatCardsAndRecentPayment;