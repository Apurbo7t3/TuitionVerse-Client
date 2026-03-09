import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    FiBookOpen,
    FiCalendar,
    FiClock,
    FiDollarSign,
    FiCheckCircle,
    FiXCircle,
    FiAlertCircle,
    FiArrowLeft
} from 'react-icons/fi';
import { GiTeacher, GiDuration } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext';
import authApiClient from '../../services/auth-api-client';
import Loading from '../../components/Loading';
import ErrorAlert from '../../components/ErrorAlert';

const StudentClassroomDetails = () => {
    const { tuitionId, classroomId } = useParams();
    const { authTokens } = useAuthContext();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tuition, setTuition] = useState(null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchClassroomData = async () => {
            try {
                setLoading(true);

                const tuitionResponse = await authApiClient.get(`/tuitions/${tuitionId}/`);
                const tasksResponse = await authApiClient.get(`/tuitions/${tuitionId}/classroom/${classroomId}/tasks/`);
                setTuition(tuitionResponse.data);
                setTasks(tasksResponse.data);
            } catch (err) {
                console.error('Error fetching classroom details:', err);
                setError(err.response?.data?.detail || 'Failed to load classroom details');
            } finally {
                setLoading(false);
            }
        };

        if (authTokens) {
            fetchClassroomData();
        }
    }, [tuitionId, classroomId, authTokens]);

    const getDayFullName = (dayCode) => {
        const days = {
            'mon': 'Monday',
            'tue': 'Tuesday',
            'wed': 'Wednesday',
            'thu': 'Thursday',
            'fri': 'Friday',
            'sat': 'Saturday',
            'sun': 'Sunday'
        };
        return days[dayCode] || dayCode;
    };

    const formatTime = (timeString) => {
        if (!timeString) return '';
        const time = new Date(`2000-01-01T${timeString}`);
        return time.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const getTaskStatusIcon = (status) => {
        switch (status) {
            case 'Done':
                return <FiCheckCircle className="w-5 h-5 text-green-500" />;
            case 'Pending':
                return <FiClock className="w-5 h-5 text-yellow-500" />;
            case 'Failed':
                return <FiXCircle className="w-5 h-5 text-red-500" />;
            default:
                return <FiAlertCircle className="w-5 h-5 text-gray-500" />;
        }
    };

    const getTaskStatusBadge = (status) => {
        switch (status) {
            case 'Done':
                return 'badge-success';
            case 'Pending':
                return 'badge-warning';
            case 'Failed':
                return 'badge-error';
            default:
                return 'badge-ghost';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <Loading />
            </div>
        );
    }

    if (error || !tuition) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <ErrorAlert error={error || 'Classroom not found'} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-purple-50 to-pink-50 p-6">
            <div className="max-w-5xl mx-auto">
                {/* Back Button */}
                <Link
                    to="/dashboard/classrooms"
                    className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6 transition-colors"
                >
                    <FiArrowLeft className="w-5 h-5" />
                    <span>Back to Classrooms</span>
                </Link>

                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    {/* Header with Subject */}
                    <div className="bg-linear-to-r from-purple-600 to-pink-600 px-8 py-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                                <FiBookOpen className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">{tuition.subject}</h1>
                                <p className="text-purple-100 mt-1">Class {tuition.class_detail}</p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        {/* Teacher Info */}
                        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                            <div className="p-3 rounded-xl bg-purple-100">
                                <GiTeacher className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Teacher</p>
                                <p className="text-lg font-semibold text-gray-800">{tuition.teacher_name}</p>
                            </div>
                        </div>

                        {/* Schedule Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <div className="p-4 bg-purple-50 rounded-2xl">
                                <div className="flex items-center gap-3 mb-2">
                                    <FiCalendar className="w-5 h-5 text-purple-600" />
                                    <span className="text-sm text-gray-600">Days</span>
                                </div>
                                <p className="font-medium text-gray-800">
                                    {tuition.days_in_week.map(getDayFullName).join(', ')}
                                </p>
                            </div>

                            <div className="p-4 bg-purple-50 rounded-2xl">
                                <div className="flex items-center gap-3 mb-2">
                                    <FiClock className="w-5 h-5 text-purple-600" />
                                    <span className="text-sm text-gray-600">Time</span>
                                </div>
                                <p className="font-medium text-gray-800">
                                    {formatTime(tuition.time_from)} - {formatTime(tuition.time_to)}
                                </p>
                            </div>

                            <div className="p-4 bg-purple-50 rounded-2xl">
                                <div className="flex items-center gap-3 mb-2">
                                    <GiDuration className="w-5 h-5 text-purple-600" />
                                    <span className="text-sm text-gray-600">Duration</span>
                                </div>
                                <p className="font-medium text-gray-800">{tuition.duration}</p>
                            </div>

                            <div className="p-4 bg-purple-50 rounded-2xl">
                                <div className="flex items-center gap-3 mb-2">
                                    <FiDollarSign className="w-5 h-5 text-purple-600" />
                                    <span className="text-sm text-gray-600">Price</span>
                                </div>
                                <p className="font-medium text-gray-800">৳{tuition.price.toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Description */}
                        {tuition.description && (
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">About This Class</h3>
                                <p className="text-gray-600 leading-relaxed">{tuition.description}</p>
                            </div>
                        )}

                        {/* Tasks Section */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Tasks</h3>
                                <span className="text-sm text-gray-500">
                                    {tasks.filter(t => t.status === 'Done').length}/{tasks.length} Completed
                                </span>
                            </div>

                            {tasks.length === 0 ? (
                                <div className="text-center py-8 bg-gray-50 rounded-2xl">
                                    <p className="text-gray-500">No tasks assigned yet</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {tasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                        >
                                            <div className="p-2 rounded-lg bg-white">
                                                {getTaskStatusIcon(task.status)}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h4 className="font-medium text-gray-800">{task.title}</h4>
                                                    <span className={`badge ${getTaskStatusBadge(task.status)} badge-sm`}>
                                                        {task.status}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600">{task.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentClassroomDetails;