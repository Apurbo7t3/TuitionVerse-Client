import {
    FiBarChart2,
    FiBookOpen,
    FiDollarSign,
    FiClock,
    FiLogOut
} from "react-icons/fi";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { GiTeacher, GiGraduateCap } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import { CgProfile } from "react-icons/cg";


const Sidebar = () => {
    const { user, logoutUser } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/');
    };

    const teacherMenu = [
        { to: '/dashboard', icon: FiBarChart2, label: 'Dashboard' },
        { to: '/dashboard/profile', icon: CgProfile, label: 'My Profile' },
        { to: '/dashboard/classrooms', icon: FiBookOpen, label: 'My Tuitions' },
        { to: '/dashboard/create', icon: RiStickyNoteAddLine, label: 'Create Tuition' },
        { to: '/dashboard/applications', icon: FiClock, label: 'Applications' },
        { to: '/dashboard/earnings', icon: FiDollarSign, label: 'Earnings' },
    ];

    const studentMenu = [
        { to: '/dashboard', icon: FiBarChart2, label: 'Dashboard' },
        { to: '/dashboard/profile', icon: CgProfile, label: 'My Profile' },
        { to: '/tuitions', icon: FiBookOpen, label: 'Browse Tuitions' },
        { to: '/dashboard/applications', icon: FiClock, label: 'My Applications' },
        { to: '/dashboard/classrooms', icon: GiGraduateCap, label: 'My Classrooms' },
        { to: '/dashboard/payments', icon: FiDollarSign, label: 'Payments' },
    ];

    const menuItems = user?.role === 'teacher' ? teacherMenu : studentMenu;

    return (
        <div className="drawer-side">
            <label
                htmlFor="dashboard-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
            ></label>

            <aside className="menu bg-white w-72 min-h-full p-4 text-gray-700 shadow-xl">
                {/* Header */}
                <div className="flex items-center gap-3 mb-2 px-2 py-4">
                    <div className="w-10 h-10 bg-linear-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                        {user?.role === 'teacher' ? (
                            <GiTeacher className="h-5 w-5 text-white" />
                        ) : (
                            <GiGraduateCap className="h-5 w-5 text-white" />
                        )}
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">TuitionVerse</h1>
                        <p className="text-xs text-gray-500 capitalize">{user?.role} Account</p>
                    </div>
                </div>

                {/* User Info */}
                <div className="bg-linear-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-2">
                    <p className="text-sm text-gray-600">Logged in as</p>
                    <p className="font-semibold text-gray-800">{user?.first_name} {user?.last_name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                </div>

                {/* Menu */}
                <ul className="menu menu-md gap-2">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <Link
                                to={item.to}
                                className="flex items-center gap-3 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition"
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        </li>
                    ))}

                </ul>
                {/* Divider  */}
                <hr className="min-w-full border border-gray-400 mt-auto" />

                {/* Logout Button */}
                <li>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 text-red-500 hover:bg-red-50 rounded-xl transition"
                    >
                        <FiLogOut className="h-4 w-4" />
                        Logout
                    </button>
                </li>

                {/* Footer */}
                <div className="mt-auto pt-6 text-xs text-gray-400 text-center">
                    © 2025 TuitionVerse
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;