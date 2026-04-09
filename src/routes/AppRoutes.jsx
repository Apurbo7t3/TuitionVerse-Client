import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Tuition from '../pages/Tuition';
import TuitionDetailsPage from '../pages/TuitionDetails';
import LoginPage from '../pages/login';
import DashboardLayout from '../layouts/DashboardLayout';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../components/dashboard/Dashboard';
import Applications from '../pages/Applications';
import PaymentHistory from '../pages/PaymentHistory';
import Classroom from '../pages/Classroom';
import ClassroomDetail from '../pages/ClassroomDetail';
import Profile from '../pages/Profile';
import CreateTuition from '../pages/CreateTuition';
import TeacherClassroomDetails from '../components/teacher_classrooms/TeacherClassroomDetails';
import TeacherTransactions from '../components/apply_and_payment/TeacherTransactions';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPasswordConfirm from '../pages/ResetPasswordConfirm';
import ResendActivation from '../pages/ResendActivation';
import ActivateAccount from '../pages/ActivateAccount';
import { PaymentCancelled, PaymentFailed, PaymentSuccess } from '../components/apply_and_payment/PaymentStatus';
import AboutUsPage from '../pages/AboutUsPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
                <Route path="/resend-activation" element={<ResendActivation />} />
                <Route path="/activate/:uid/:token" element={<ActivateAccount />} />
                <Route path='/tuitions' element={<Tuition />} />
                <Route path="/tuitions/:id" element={<PrivateRoute><TuitionDetailsPage /></PrivateRoute>} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/payment-failed" element={<PaymentFailed />} />
                <Route path="/payment-cancelled" element={<PaymentCancelled />} />
                <Route path='/about' element={<AboutUsPage />} />
            </Route>
            <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
                <Route path="" element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path='applications' element={<Applications />} />
                <Route path='payments' element={<PaymentHistory />} />
                <Route path='classrooms' element={<Classroom />} />
                <Route path="classrooms/:tuitionId/:classroomId" element={<ClassroomDetail />} />
                <Route path="classrooms/:id" element={<TeacherClassroomDetails />} />
                <Route path='create' element={<CreateTuition />} />
                <Route path="earnings" element={<TeacherTransactions />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;