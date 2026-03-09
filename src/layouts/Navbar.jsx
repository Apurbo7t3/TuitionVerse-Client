import { useEffect, useState } from "react";
import {
    BookOpen,
    User,
    LayoutDashboard,
    LogOut,
    Menu,
    X,
    Search,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import DefaultImage from '../assets/profile.jpg'
import Loading from "../components/Loading";
import userAuthApiClient from "../services/userAuthApiClient";


const Navbar = () => {

    const bg = 'bg-linear-to-r from-purple-500 to-purple-900';

    const { logoutUser, user } = useAuthContext();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate()

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/tuitions?search=${encodeURIComponent(searchQuery)}`);
        }
        setSearchQuery('');
    };

    const loadProfile = async () => {
        try {
            setLoading(true);
            if (user) {
                if (user.role === 'student') {
                    const response = await userAuthApiClient.get('/api/student/profile/');
                    setUserDetails(response.data);
                } if (user.role === 'teacher') {
                    const response = await userAuthApiClient.get('/api/teacher/profile/');
                    setUserDetails(response.data);
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => { loadProfile() }, [user]);

    return (
        <nav className={`${bg} backdrop-blur-lg sticky top-0 z-50 shadow-md border-b border-purple-700/30`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <a
                        href="/"
                        className="md:text-2xl font-bold text-white flex items-center gap-2 hover:opacity-80 transition"
                    >
                        <BookOpen className="w-6 h-6" />
                        TuitionVerse
                    </a>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-white/90 hover:text-white font-medium transition">
                            Home
                        </Link>
                        <Link to="/tuitions" className="text-white/90 hover:text-white font-medium transition">
                            Tuitions
                        </Link>
                        <Link to="/about" className="text-white/90 hover:text-white font-medium transition">
                            About
                        </Link>
                    </div>

                    {/* Right Section */}
                    {user ? (
                        <div className="flex items-center gap-4">

                            {/* Search Box (Desktop) */}
                            <form
                                onSubmit={handleSearch}
                                className="hidden md:flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 focus-within:ring-2 focus-within:ring-purple-300 transition border border-white/20"
                            >
                                <Search className="w-4 h-4 text-white/70" />
                                <input
                                    type="text"
                                    placeholder="Search here.."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-transparent outline-none text-white placeholder-white/50 px-2 text-sm w-40"
                                />
                            </form>

                            {/* Profile Dropdown */}
                            {loading ?
                                (<Loading />)
                                : (
                                    <div className="relative">
                                        <button
                                            onClick={toggleDropdown}
                                            className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-300 hover:border-white hover:scale-105 transition"
                                        >
                                            <img
                                                src={userDetails?.profile_picture || DefaultImage}
                                                alt="User"
                                                className="w-full h-full object-cover"
                                            />
                                        </button>

                                        {isDropdownOpen && (
                                            <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-xl py-2 border border-purple-100 animate-fadeIn">
                                                <div className="px-4 py-2 border-b border-purple-100">
                                                    <p className="font-semibold text-purple-900">{`${user.first_name} ${user.last_name}`}</p>
                                                    <p className="text-xs text-purple-600">Welcome back 👋</p>
                                                </div>

                                                <Link to='/dashboard/profile'
                                                    href="/profile"
                                                    className="flex items-center gap-2 px-4 py-2 text-purple-700 hover:bg-purple-50 transition"
                                                    onClick={() => setIsDropdownOpen(false)}
                                                >
                                                    <User className="w-4 h-4" /> Profile
                                                </Link>

                                                <Link to='/dashboard'
                                                    href="/dashboard"
                                                    className="flex items-center gap-2 px-4 py-2 text-purple-700 hover:bg-purple-50 transition"
                                                    onClick={() => setIsDropdownOpen(false)}
                                                >
                                                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                                                </Link>

                                                <button
                                                    className="flex items-center gap-2 w-full px-4 py-2 text-red-500 hover:bg-red-50 transition"
                                                    onClick={() => { setIsDropdownOpen(false), logoutUser(), navigate('/login') }}
                                                >
                                                    <LogOut className="w-4 h-4" /> Logout
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}


                            {/* Mobile Menu Button */}
                            <button
                                onClick={toggleMobileMenu}
                                className="md:hidden p-2 rounded-md text-white/90 hover:bg-white/10 transition"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="w-6 h-6" />
                                ) : (
                                    <Menu className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    ) : (
                        <div className="flex">
                            <Link to={'/register'}>
                                <button className="bg-white text-sm text-purple-600 btn rounded-2xl mx-2">
                                    Register
                                </button>
                            </Link>
                            <Link to={'/login'}>
                                <button className="bg-white text-purple-600 btn rounded-2xl mx-2">
                                    login
                                </button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white/95 backdrop-blur-sm py-4 px-4 border-t border-purple-100 space-y-3">

                        {/* Mobile Search */}
                        <form
                            onSubmit={handleSearch}
                            className="flex items-center bg-purple-50 rounded-full px-3 py-2 border border-purple-200"
                        >
                            <Search className="w-4 h-4 text-purple-500" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent outline-none px-2 text-sm w-full text-purple-900 placeholder-purple-400"
                            />
                        </form>

                        <Link to="/"
                            className="block py-2 text-purple-700 hover:text-purple-900 hover:bg-purple-50 px-2 rounded font-medium"
                            onClick={toggleMobileMenu}
                        >
                            Home
                        </Link>
                        <Link to="/tuitions"
                            className="block py-2 text-purple-700 hover:text-purple-900 hover:bg-purple-50 px-2 rounded font-medium"
                            onClick={toggleMobileMenu}
                        >
                            Tuitions
                        </Link>
                        <Link to="/about"
                            className="block py-2 text-purple-700 hover:text-purple-900 hover:bg-purple-50 px-2 rounded font-medium"
                            onClick={toggleMobileMenu}
                        >
                            About
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;