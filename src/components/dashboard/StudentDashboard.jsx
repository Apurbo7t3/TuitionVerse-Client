import {
    FiBookOpen,
    FiClock,
    FiCheckCircle,
    FiDollarSign,
    FiCheckSquare
} from 'react-icons/fi';
import { GiGraduateCap, GiTeacher, GiDuration } from 'react-icons/gi';
import { FaTasks, FaCheckDouble } from 'react-icons/fa';
import StatCard from './StatCard';
import useAuthContext from '../../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import useFetchDashboard from '../../hooks/useFetchDashboard';
import Loading from '../Loading';
import ErrorAlert from '../ErrorAlert';
import TeacherDashboard from './TeacherDashboard';

const StudentDashboard = () => {
    const { user } = useAuthContext();
    const { loading, error, student } = useFetchDashboard();


    const getPaymentStatusBadge = (status) => {
        const statusConfig = {
            'PAID': 'bg-green-100 text-green-600',
            'PENDING': 'bg-yellow-100 text-yellow-600',
            'FAILED': 'bg-red-100 text-red-600',
            'CANCELLED': 'bg-gray-100 text-gray-600'
        };
        return statusConfig[status] || 'bg-gray-100 text-gray-600';
    };


    if (loading) {
        return <div className='min-h-screen bg-purple-50 flex justify-center items-center'>
            <Loading />
        </div>
    }
    if (error) {
        return <div className='min-h-screen bg-purple-50 flex justify-center items-center'>
            <ErrorAlert error={error} />
        </div>
    }

    return (
        <div className="space-y-6 py-8 px-8">
            {/* Welcome Section */}
            <div className="bg-linear-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                        <GiGraduateCap className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Welcome back, {user?.first_name || 'Student'}!</h1>
                        <p className="text-purple-100 mt-1">Track your learning progress and manage your tuitions.</p>
                    </div>
                </div>
            </div>

            {/* Stats Grid - Student Specific */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={FiBookOpen}
                    title="Total Task"
                    value={student.tasks.total}
                    subtitle={``}
                    bgColor="bg-purple-100"
                    iconColor="text-purple-600"
                />
                <StatCard
                    icon={GiGraduateCap}
                    title="Task Done"
                    value={student.tasks.done}
                    subtitle=""
                    bgColor="bg-blue-100"
                    iconColor="text-blue-600"
                />
                <StatCard
                    icon={FaTasks}
                    title="Task Pending"
                    value={student.tasks.pending}
                    subtitle=''
                    bgColor="bg-green-100"
                    iconColor="text-green-600"
                />
                <StatCard
                    icon={FiDollarSign}
                    title="Task Failed"
                    value={student.tasks.failed}
                    subtitle=""
                    bgColor="bg-pink-100"
                    iconColor="text-pink-600"
                />
            </div>

            {/* Second Row Stats - More Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    icon={FiCheckCircle}
                    title="Total Application"
                    value={student.applications.total}
                    subtitle=""
                    bgColor="bg-green-100"
                    iconColor="text-green-600"
                    size="small"
                />
                <StatCard
                    icon={FiClock}
                    title="Application Approved"
                    value={student.applications.approved}
                    subtitle=""
                    bgColor="bg-yellow-100"
                    iconColor="text-yellow-600"
                    size="small"
                />
                <StatCard
                    icon={FiCheckSquare}
                    title="Application Pending"
                    value={student.applications.pending}
                    subtitle=""
                    bgColor="bg-green-100"
                    iconColor="text-green-600"
                    size="small"
                />
            </div>


            {/* Payment History */}
            <div className="bg-white rounded-3xl shadow-lg p-6 border border-purple-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Payments</h3>
                <div className="overflow-x-auto ">
                    <table className="w-full table-fixed">
                        <thead>
                            <tr className="text-center text-gray-500 text-sm border-b border-gray-200">
                                <th className="pb-3">Tuition</th>
                                <th className="pb-3">Amount</th>
                                <th className="pb-3">Status</th>
                                <th className="pb-3">Transaction ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {student.payments.total > 0 ? (
                                <tr className="border-b border-gray-100 text-center">
                                    <td className="py-3 font-medium text-black">{student.payments.list[0].tuition_subject || 'Tuition'}</td>
                                    <td className="py-3 font-semibold text-black">৳{student.payments.list[0].amount}</td>
                                    <td className="py-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusBadge(student.payments.list[0].status)}`}>
                                            {student.payments.list[0].status}
                                        </span>
                                    </td>
                                    <td className="py-3 text-gray-500 text-sm">{student.payments.list[0].transaction_id}</td>
                                </tr>
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-4 text-center text-gray-500">No payment history</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Link to="/dashboard/payments" className="block text-center mt-4 text-purple-600 hover:text-purple-800">
                    View Payment History →
                </Link>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl shadow-lg p-6 border border-purple-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link to="/tuitions" className="bg-purple-50 hover:bg-purple-100 rounded-xl p-4 text-center transition">
                        <FiBookOpen className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                        <span className="text-sm font-medium text-black">Browse Tuitions</span>
                    </Link>
                    <Link to="/dashboard/applications" className="bg-pink-50 hover:bg-pink-100 rounded-xl p-4 text-center transition">
                        <FiClock className="w-6 h-6 text-pink-600 mx-auto mb-2" />
                        <span className="text-sm font-medium text-black">My Applications</span>
                    </Link>
                    <Link to="/dashboard/payments" className="bg-green-50 hover:bg-green-100 rounded-xl p-4 text-center transition">
                        <FiDollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
                        <span className="text-sm font-medium text-black">Make Payment</span>
                    </Link>
                    <Link to="/dashboard/classrooms" className="bg-blue-50 hover:bg-blue-100 rounded-xl p-4 text-center transition">
                        <GiGraduateCap className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <span className="text-sm font-medium text-black">My Classes</span>
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default StudentDashboard;