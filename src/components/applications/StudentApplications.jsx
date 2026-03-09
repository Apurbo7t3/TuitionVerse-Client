import useAuthContext from '../../hooks/useAuthContext';
import useFetchDashboard from '../../hooks/useFetchDashboard';
import Loading from '../../components/Loading';
import ErrorAlert from '../../components/ErrorAlert';
import StudentApplicationsGrid from './StudentApplicationsGrid';
import StudentApplicationHeaderAndStatCards from './StudentApplicationHeaderAndStatCards';

const StudentApplications = () => {

    const { user } = useAuthContext();
    const { loading, error, student } = useFetchDashboard();
    const paidTuitions = new Set(student.payments.list
        .map(p => p.tuition));

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
        <div className="min-h-screen p-6">
            {/* Header Section and Stat Cards */}
            <StudentApplicationHeaderAndStatCards student={student} />

            {/* Applications Grid*/}
            <StudentApplicationsGrid student={student} user={user} paidTuitions={paidTuitions} />

            {/* Empty State */
                user.roll === 'student' && (student.applications.total === 0 && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="text-6xl mb-4 opacity-20">📄</div>
                        <h3 className="text-xl font-semibold text-base-content/50">No applications found</h3>
                        <p className="text-base-content/30 mt-2">Start by applying to some tuitions</p>
                        <button className="btn btn-primary mt-4">Browse Tuitions</button>
                    </div>

                ))}
        </div>
    );
};

export default StudentApplications;