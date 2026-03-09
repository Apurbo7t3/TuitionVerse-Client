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
            color: 'badge-success',
            text: 'Approved',
            bg: 'bg-success/10',
            textColor: 'text-success'
        }
        else return {
            icon: FiClock,
            color: 'badge-warning',
            text: 'Pending',
            bg: 'bg-warning/10',
            textColor: 'text-warning'
        }
    };
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    student.applications.list.map((app) => {
                        const status = getStatusBadge(app.is_approved);
                        const StatusIcon = status.icon;
                        return (
                            <div
                                key={app.id}
                                className="card bg-purple-50 text-black border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
                            >
                                {/* Card Header */}
                                <div className="card-body p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-3 rounded-xl ${status.bg}`}>
                                                <StatusIcon className={`w-6 h-6 ${status.textColor}`} />
                                            </div>
                                            <div>
                                                <h2 className="card-title text-lg font-bold line-clamp-1">
                                                    {app.tuition.subject}
                                                </h2>
                                                <p className="text-sm text-black">ID: #{app.id}</p>
                                            </div>
                                        </div>
                                        <div className="w-24 px-3 py-2 text-center text-white font-semibold text-sm rounded-2xl bg-linear-to-tr from bg-purple-700 to-rose-600">
                                            {app.tuition.class_detail} class
                                        </div>
                                    </div>

                                    {/* Application Details */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-3 text-sm">
                                            <FiUser className="w-4 h-4 text-black" />
                                            <span className="text-black">Student:</span>
                                            <span className="font-medium ml-auto">{user.first_name}</span>
                                        </div>

                                        <div className="flex items-center gap-3 text-sm">
                                            <FiBookOpen className="w-4 h-4 text-black" />
                                            <span className="text-black">Subject:</span>
                                            <span className="font-medium ml-auto">{app.tuition.subject}</span>
                                        </div>

                                        <div className="flex items-center gap-3 text-sm">
                                            <FiUser className="w-4 h-4 text-black" />
                                            <span className="text-black">Teacher:</span>
                                            <span className="font-medium ml-auto">{app.tuition.teacher_name}</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <FiStar className="w-4 h-4 text-warning" />
                                                <span className="text-sm font-semibold">৳{app.tuition.price}</span>
                                            </div>
                                            <div className={`badge ${status.color} badge-md gap-2`}>
                                                <StatusIcon className="w-3 h-3" />
                                                {status.text}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Actions */}
                                    <div className="card-actions justify-end mt-2 pt-4 border-t border-base-200">
                                        <button
                                            className="btn btn-ghost btn-sm gap-2 w-full text-white bg-linear-to-tr from bg-purple-700 to-rose-600">
                                            {paidTuitions.has(app.id) ? 'Paid' : app.is_approved ? 'Not Paid' : 'Wait For Approval'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default StudentApplicationsGrid;