import {
    FiClock,
    FiCheckCircle,
    FiAlertCircle,
    FiXCircle
} from 'react-icons/fi';
import useAuthContext from '../../hooks/useAuthContext';
import useFetchDashboard from '../../hooks/useFetchDashboard';
import Loading from '../../components/Loading';
import ErrorAlert from '../../components/ErrorAlert';
import StudentClassroomCard from './StudentClassroomCard';

const StudentClassrooms = () => {
    const { user } = useAuthContext();
    const { loading, error, student } = useFetchDashboard();
    console.log(student.enrolled_classrooms);

    const getTaskStatusBadge = (status) => {
        const badges = {
            'Done': 'badge-success',
            'Pending': 'badge-warning',
            'Failed': 'badge-error'
        };
        return badges[status] || 'badge-ghost';
    };

    const getTaskIcon = (status) => {
        switch (status) {
            case 'Done':
                return <FiCheckCircle className="w-4 h-4 text-green-600" />;
            case 'Pending':
                return <FiClock className="w-4 h-4 text-yellow-600" />;
            case 'Failed':
                return <FiXCircle className="w-4 h-4 text-red-600" />;
            default:
                return <FiAlertCircle className="w-4 h-4 text-gray-600" />;
        }
    };


    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <ErrorAlert error={error} />
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-purple-700">My Classrooms</h1>
                <p className="text-gray-600 mt-2">
                    View all your approved tuition classrooms and tasks
                </p>
            </div>

            {/* Classrooms Grid */}
            {student.enrolled_classrooms.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl shadow">
                    <div className="text-6xl mb-4">🏫</div>
                    <h3 className="text-xl font-semibold text-gray-700">No classrooms yet</h3>
                    <p className="text-gray-500 mt-2">
                        Your approved tuitions will appear here as classrooms
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {student.enrolled_classrooms.map((classroom) => (
                        <StudentClassroomCard
                            classroom={classroom}
                            user={user}
                            getTaskIcon={getTaskIcon}
                            getTaskStatusBadge={getTaskStatusBadge} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default StudentClassrooms;