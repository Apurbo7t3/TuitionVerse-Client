import {
    FiBookOpen,
    FiUser,
} from 'react-icons/fi';
import { GiTeacher, GiDuration } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const StudentClassroomCard = ({ classroom, user, getTaskIcon, getTaskStatusBadge }) => {
    return (
        <div>
            <div
                key={classroom.id}
                className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
                <div className="card-body p-6">
                    {/* Header with Subject and Teacher */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-purple-100">
                                <FiBookOpen className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">
                                    {classroom.tuition.subject}
                                </h2>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                    <GiTeacher className="w-4 h-4" />
                                    <span>{classroom.teacher_name}</span>
                                </div>
                            </div>
                        </div>
                        <div className="badge badge-outline badge-lg">
                            Class {classroom.tuition.class_detail}
                        </div>
                    </div>

                    {/* Schedule Info */}
                    <div className="mb-6 p-4 bg-purple-50 rounded-2xl">
                        <div className="flex items-center gap-2">
                            <FiUser className="w-4 h-4 text-purple-600" />
                            <div>
                                <p className="text-xs text-gray-500">Student</p>
                                <p className="text-sm font-medium">{user.first_name} {user.last_name}</p>
                            </div>
                        </div>
                    </div>

                    {/* Tasks Section */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-700">Tasks</h3>
                            <span className="text-sm text-gray-500">
                                {classroom.tasks.filter(t => t.status === 'Done').length}/{classroom.tasks.length} Completed
                            </span>
                        </div>

                        <div className="space-y-3">
                            {classroom.tasks.slice(0, 3).map((task) => (
                                <div key={task.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <div className="p-2 rounded-lg bg-white">
                                        {getTaskIcon(task.status)}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-sm text-gray-800">{task.title}</p>
                                        <p className="text-xs text-gray-500 line-clamp-1">{task.description}</p>
                                    </div>
                                    <span className={`badge ${getTaskStatusBadge(task.status)} badge-sm`}>
                                        {task.status}
                                    </span>
                                </div>
                            ))}

                            {classroom.tasks.length > 3 && (
                                <Link to={`/dashboard/classrooms/${classroom.tuition.id}/${classroom.id}`} >
                                    <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                                        View all {classroom.tasks.length} tasks →
                                    </button>
                                </Link>
                            )}

                            {classroom.tasks.length === 0 && (
                                <p className="text-center text-gray-500 py-4">No tasks assigned yet</p>
                            )}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="card-actions mt-6 pt-4 border-t border-gray-100">
                        <Link to={`/dashboard/classrooms/${classroom.tuition.id}/${classroom.id}`} >
                            <button className="w-full btn btn-sm bg-linear-to-r from-purple-600 to-pink-600 text-white border-0">
                                Go to Classroom
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentClassroomCard;