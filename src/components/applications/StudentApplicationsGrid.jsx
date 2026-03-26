import {
    FiCheckCircle,
    FiClock,
    FiStar,
    FiUser,
    FiBookOpen
} from 'react-icons/fi';

const StudentApplicationsGrid = ({ student, user, paidTuitions }) => {
    const getStatusBadge = (status) => {
        if (status) return {
            icon: FiCheckCircle,
            color: 'text-green-600 bg-green-50',
            text: 'Approved',
        };
        else return {
            icon: FiClock,
            color: 'text-amber-600 bg-amber-50',
            text: 'Pending',
        };
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {student.applications.list.map((app) => {
                    const status = getStatusBadge(app.is_approved);
                    const StatusIcon = status.icon;
                    return (
                        <div
                            key={app.id}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden"
                        >
                            <div className="p-6">
                                {/* Header */}
                                <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2.5 rounded-xl ${status.color}`}>
                                            <StatusIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold text-gray-800 line-clamp-1">
                                                {app.tuition.subject}
                                            </h2>
                                            <p className="text-xs text-gray-400">ID: #{app.id}</p>
                                        </div>
                                    </div>
                                    <div className="px-3 py-1.5 text-xs text-center font-semibold rounded-full bg-linear-to-r from-purple-600 to-purple-700 text-white shadow-sm">
                                        {app.tuition.class_detail} class
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center text-sm">
                                        <FiUser className="w-4 h-4 text-gray-400 mr-3" />
                                        <span className="text-gray-600">Student:</span>
                                        <span className="font-medium ml-auto text-gray-800">{user.first_name}</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <FiBookOpen className="w-4 h-4 text-gray-400 mr-3" />
                                        <span className="text-gray-600">Subject:</span>
                                        <span className="font-medium ml-auto text-gray-800">{app.tuition.subject}</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <FiUser className="w-4 h-4 text-gray-400 mr-3" />
                                        <span className="text-gray-600">Teacher:</span>
                                        <span className="font-medium ml-auto text-gray-800">{app.tuition.teacher_name}</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                        <div className="flex items-center gap-1">
                                            <FiStar className="w-4 h-4 text-amber-400 fill-amber-400" />
                                            <span className="text-sm font-semibold text-gray-800">৳{app.tuition.price}</span>
                                        </div>
                                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}>
                                            <StatusIcon className="w-3.5 h-3.5" />
                                            {status.text}
                                        </div>
                                    </div>
                                </div>

                                {/* Button */}
                                <button className="w-full mt-2 py-2.5 text-sm font-medium rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 focus:outline-none">
                                    {paidTuitions.has(app.id) ? 'Paid' : app.is_approved ? 'Not Paid' : 'Wait For Approval'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StudentApplicationsGrid;