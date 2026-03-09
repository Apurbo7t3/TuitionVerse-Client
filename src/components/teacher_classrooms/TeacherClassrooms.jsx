import { Link } from 'react-router-dom';
import { FiUsers, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import useFetchDashboard from '../../hooks/useFetchDashboard';
import Loading from '../../components/Loading';

const TeacherClassrooms = () => {
    const { loading, teacher } = useFetchDashboard();
    if (loading) return <div className='h-screen flex justify-center items-center'><Loading /></div>;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-purple-700 mb-6">My Tuitions</h1>

            <div className="grid gap-4">
                {teacher.tuitions?.map(tuition => (
                    <div key={tuition.id} className="bg-white rounded-xl shadow p-5">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-lg font-semibold">{tuition.subject}</h2>
                                <p className="text-sm text-gray-500">Class {tuition.class_detail} • ৳{tuition.price}</p>

                                <div className="flex gap-4 mt-3 text-sm">
                                    <span className="flex items-center gap-1">
                                        <FiUsers className="text-purple-600" />
                                        {tuition.total_applications} applications
                                    </span>
                                    {tuition.classroom ? (
                                        <span className="flex items-center gap-1 text-green-600">
                                            <FiCheckCircle /> 1 student enrolled
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1 text-yellow-600">
                                            <FiXCircle /> No student
                                        </span>
                                    )}
                                </div>
                            </div>

                            <Link
                                to={`/dashboard/classrooms/${tuition.id}`}
                                className="btn btn-sm bg-purple-600 text-white hover:bg-purple-700"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeacherClassrooms;