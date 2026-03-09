import { GiGraduateCap } from 'react-icons/gi';
import useFetchDashboard from '../../hooks/useFetchDashboard';
import Loading from '../Loading';
import ErrorAlert from '../ErrorAlert';
import TeacherStatCardsAndRecentPayment from './TeacherStatCardsAndRecentPayment';
import TeacherQuickAccessAndTuitions from './TeacherQuickAccessAndTuitions';

const TeacherDashboard = () => {
    const { loading, error, teacher } = useFetchDashboard();

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <Loading />
            </div>
        );
    } if (error) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <ErrorAlert error={error} />
            </div>
        );
    }

    return (
        <div className="space-y-6 py-10 px-8 bg-rose-50">
            {/* Welcome Header */}
            <div className="bg-linear-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                        <GiGraduateCap className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
                        <p className="text-purple-100 mt-1">Manage your tuitions and track student progress</p>
                    </div>
                </div>
            </div>

            {/* Stats Grid and Recent payment*/}
            <TeacherStatCardsAndRecentPayment teacher={teacher} />

            {/* Quick Actions And Tuition Component */}
            <TeacherQuickAccessAndTuitions teacher={teacher} />
        </div>
    );
};

export default TeacherDashboard;