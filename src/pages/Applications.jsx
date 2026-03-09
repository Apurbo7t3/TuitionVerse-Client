import useAuthContext from '../hooks/useAuthContext';
import StudentApplications from '../components/applications/StudentApplications';
import TeacherApplications from '../components/applications/TeacherApplications';

const Applications = () => {
    const { user } = useAuthContext();
    return (
        <div>
            {user.role === 'student' && <StudentApplications />}
            {user.role === 'teacher' && <TeacherApplications />}
        </div>
    );
};

export default Applications;