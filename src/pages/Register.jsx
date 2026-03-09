import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { GiGraduateCap, GiTeacher } from 'react-icons/gi';
import userApiClient from '../services/userApiClient';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            setError(null);

            await userApiClient.post('/auth/users/', {
                username: data.username,
                email: data.email,
                password: data.password,
                first_name: data.first_name,
                last_name: data.last_name,
                role: data.role
            });

            setSuccess('Registration successful! Please check your email to activate your account.');
            setTimeout(() => navigate('/login'), 4000);
        } catch (err) {
            const msg = err.response?.data
                ? Object.values(err.response.data).flat().join('\n')
                : 'Registration failed';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-purple-50 to-pink-50 flex items-center justify-center p-8">

            <div className='space-y-5 bg-white rounded-3xl overflow-hidden'>
                <div className="bg-linear-to-r from-purple-700 to-pink-900 p-8 text-white text-center relative">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative">
                        <h1 className="text-3xl font-bold mb-2">Welcome!</h1>
                        <p className="text-purple-100">Sign up to start your learning journey</p>
                    </div>
                </div>

                <div className="bg-white shadow-xl max-w-md w-full pb-8 px-9">
                    {success && (
                        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
                            {success}
                        </div>
                    )}
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm whitespace-pre-line">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                    {...register('first_name', { required: true })}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                    {...register('last_name', { required: true })}
                                />
                            </div>
                        </div>

                        <input
                            type="text"
                            placeholder="Username"
                            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                            {...register('username', { required: true })}
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                            {...register('email', { required: true })}
                        />

                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                className="input input-bordered w-full pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                {...register('password', { required: true, minLength: 8 })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-500"
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <label className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer ${watch('role') === 'student' ? 'border-purple-600 bg-purple-50' : 'border-gray-200'}`}>
                                <input type="radio" value="student" className="hidden" {...register('role', { required: true })} />
                                <GiGraduateCap className="text-purple-600" />
                                <span>Student</span>
                            </label>
                            <label className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer ${watch('role') === 'teacher' ? 'border-purple-600 bg-purple-50' : 'border-gray-200'}`}>
                                <input type="radio" value="teacher" className="hidden" {...register('role', { required: true })} />
                                <GiTeacher className="text-purple-600" />
                                <span>Teacher</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-linear-to-r from-purple-700 to-pink-950 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
                        >
                            {loading ? 'Creating...' : 'Register'}
                        </button>

                        <p className="text-center text-gray-600 ">
                            Already have an account?{' '}
                            <Link to="/login" className="text-purple-600 hover:text-purple-800 font-semibold transition">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;