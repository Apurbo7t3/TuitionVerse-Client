import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import useAuthContext from '../hooks/useAuthContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const { loginUser, errorMsg, successMsg } = useAuthContext();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError
    } = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    });
    const onSubmit = async (data) => {
        console.log(data);
        try {
            const success = await loginUser(data);
            if (!success) {
                setError('root', {
                    message: errorMsg || 'Invalid username or password'
                });
            }
            if (success) {
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-white flex items-center justify-center p-4">
            {/* Main Login Card */}
            <div className="relative w-full max-w-md">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-purple-100">
                    {/* Header with Gradient */}
                    <div className="bg-linear-to-r from-purple-700 to-pink-900 p-8 text-white text-center relative">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative">
                            <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
                            <p className="text-purple-100">Sign in to continue your learning journey</p>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="p-8">
                        {/* Error/Success Messages */}
                        {errorMsg && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                                {errorMsg}
                            </div>
                        )}
                        {successMsg && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm">
                                {successMsg}
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Username Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Username
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaEnvelope className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        {...register('username', {
                                            required: 'Username is required',
                                            minLength: {
                                                value: 3,
                                                message: 'Username must be at least 3 characters'
                                            }
                                        })}
                                        className={`text-black w-full pl-10 pr-3 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${errors.username
                                            ? 'border-red-300 focus:ring-red-500'
                                            : 'border-gray-200'
                                            }`}
                                        placeholder="Enter your username"
                                    />
                                </div>
                                {errors.username && (
                                    <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        {...register('password', {
                                            required: 'Password is required',
                                            minLength: {
                                                value: 6,
                                                message: 'Password must be at least 6 characters'
                                            }
                                        })}
                                        className={`text-black w-full pl-10 pr-10 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${errors.password
                                            ? 'border-red-300 focus:ring-red-500'
                                            : 'border-gray-200'
                                            }`}
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        ) : (
                                            <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                                )}
                            </div>

                            {/* Forgot Password */}
                            <div className="flex items-center justify-between">
                                <Link
                                    to="/forgot-password"
                                    className="text-sm text-purple-600 hover:text-purple-800 transition"
                                >
                                    Forgot Password?
                                </Link>
                                <Link to="/resend-activation" className="text-sm text-purple-600 hover:text-purple-800 transition">
                                    Resend Activation
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-linear-to-r from-purple-700 to-pink-950 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Signing in...</span>
                                    </div>
                                ) : (
                                    'Sign In'
                                )}
                            </button>

                            {/* Register Link */}
                            <p className="text-center text-gray-600">
                                Don't have an account?{' '}
                                <Link
                                    to="/register"
                                    className="text-purple-600 hover:text-purple-800 font-semibold transition"
                                >
                                    Sign up now
                                </Link>
                            </p>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;