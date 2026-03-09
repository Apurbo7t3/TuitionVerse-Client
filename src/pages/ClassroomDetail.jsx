import useAuthContext from '../hooks/useAuthContext';
import StudentClassroomDetails from '../components/student_classroom/StudentClassroomDetails';
import TeacherClassroomDetails from '../components/teacher_classrooms/TeacherClassroomDetails';

const ClassroomDetail = () => {
    const { user } = useAuthContext();
    return (
        <div>
            {user.role === 'student' && <StudentClassroomDetails />}
            {user.role === 'teacher' && <TeacherClassroomDetails />}
        </div>
    );
};

export default ClassroomDetail;