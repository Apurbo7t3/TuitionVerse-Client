import {
    FiBookOpen,
    FiUser,
    FiArrowRight,
    FiList
} from 'react-icons/fi';
import { GiTeacher } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const StudentClassroomCard = ({ classroom, user, getTaskIcon, getTaskStatusBadge }) => {
    // Show only the first task
    const tasksToShow = classroom.tasks.slice(0, 1);

    return (
        <div className="h-full">
            <div
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 h-full flex flex-col overflow-hidden"
            >
                <div className="p-6 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-purple-100">
                                <FiBookOpen className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
                                    {classroom.tuition.subject}
                                </h2>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                    <GiTeacher className="w-4 h-4" />
                                    <span className="line-clamp-1">{classroom.teacher_name}</span>
                                </div>
                            </div>
                        </div>
                        <div className="px-3 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-sm whitespace-nowrap">
                            Class {classroom.tuition.class_detail}
                        </div>
                    </div>

                    {/* Schedule Info */}
                    <div className="mb-6 p-4 bg-purple-50 rounded-2xl">
                        <div className="flex items-center gap-2">
                            <FiUser className="w-4 h-4 text-purple-600" />
                            <div>
                                <p className="text-xs text-gray-500">Student</p>
                                <p className="text-sm font-medium truncate">{user.first_name} {user.last_name}</p>
                            </div>
                        </div>
                    </div>

                    {/* Tasks Section */}
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-gray-700">Tasks</h3>
                            <span className="text-sm text-gray-500">
                                {classroom.tasks.filter(t => t.status === 'Done').length}/{classroom.tasks.length} Completed
                            </span>
                        </div>

                        <div className="space-y-3">
                            {tasksToShow.length === 0 ? (
                                <div className="flex items-center justify-center p-4 bg-gray-50 rounded-xl">
                                    <p className="text-sm text-gray-400">No tasks yet</p>
                                </div>
                            ) : (
                                tasksToShow.map((task) => (
                                    <div key={task.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                        <div className="p-2 rounded-lg bg-white">
                                            {getTaskIcon(task.status)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-sm text-gray-800 truncate">{task.title}</p>
                                            <p className="text-xs text-gray-500 line-clamp-1">{task.description}</p>
                                        </div>
                                        <span className={`badge ${getTaskStatusBadge(task.status)} badge-sm`}>
                                            {task.status}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Push buttons to bottom */}
                    <div className="">
                        {/* Always show View all tasks button */}
                        <Link to={`/dashboard/classrooms/${classroom.tuition.id}/${classroom.id}`} className=''>
                            <button className="w-full mb-3 py-2 text-sm font-medium rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-50 transition-all flex items-center justify-center gap-2">
                                <FiList className="w-4 h-4" />
                                View all tasks →
                            </button>
                        </Link>

                        {/* Main classroom button */}
                        <Link to={`/dashboard/classrooms/${classroom.tuition.id}/${classroom.id}`}>
                            <button className="w-full py-2.5 text-sm font-medium rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 focus:outline-none flex items-center justify-center gap-2">
                                Go to Classroom
                                <FiArrowRight className="w-4 h-4" />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentClassroomCard;