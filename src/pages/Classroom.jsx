import useAuthContext from '../hooks/useAuthContext';
import StudentClassrooms from '../components/student_classroom/StudentClassroom';
import TeacherClassrooms from '../components/teacher_classrooms/TeacherClassrooms';

const Classrooms = () => {
    const { user } = useAuthContext();
    return (
        <div>
            {user.role === 'student' && <StudentClassrooms />}
            {user.role === 'teacher' && <TeacherClassrooms />}
        </div>
    );
};

export default Classrooms;