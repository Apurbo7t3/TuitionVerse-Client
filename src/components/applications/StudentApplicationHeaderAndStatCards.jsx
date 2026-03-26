import {
    FiCheckCircle,
    FiClock,
} from 'react-icons/fi';

const StudentApplicationHeaderAndStatCards = ({ student }) => {
    return (
        <div className="mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-purple-700">Applications</h1>
                    <p className="text-purple-700 mt-2">Manage and track all your tuition applications</p>
                </div>

                {/* Stats Cards */}
                <div className="flex gap-4 w-full sm:w-auto">
                    <div className="stats shadow-lg bg-success/10 flex-1 sm:flex-initial">
                        <div className="stat">
                            <div className="stat-figure text-success">
                                <FiCheckCircle className="w-6 h-6" />
                            </div>
                            <div className="stat-title text-success">Approved</div>
                            <div className="stat-value text-success text-2xl">{student.applications.approved}</div>
                        </div>
                    </div>

                    <div className="stats shadow-lg bg-warning/10 flex-1 sm:flex-initial">
                        <div className="stat">
                            <div className="stat-figure text-warning">
                                <FiClock className="w-6 h-6" />
                            </div>
                            <div className="stat-title text-warning">Pending</div>
                            <div className="stat-value text-warning text-2xl">{student.applications.pending}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentApplicationHeaderAndStatCards;