import useAuthContext from '../../hooks/useAuthContext';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';

const Dashboard = () => {
    const { user } = useAuthContext();
    return (
        <div>
            {user.role === 'student' && <StudentDashboard />}
            {user.role === 'teacher' && <TeacherDashboard />}
        </div>
    );
};

export default Dashboard;