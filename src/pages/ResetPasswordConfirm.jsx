import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiLock, FiEye, FiEyeOff, FiCheckCircle } from 'react-icons/fi';
import userApiClient from '../services/userApiClient';

const ResetPasswordConfirm = () => {
    const { uid, token } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const newPassword = watch('new_password');

    const onSubmit = async (data) => {
        setLoading(true);
        setError(null);
        try {
            await userApiClient.post('/auth/users/reset_password_confirm/', {
                uid,
                token,
                new_password: data.new_password
            });
            setSuccess('Password changed successfully!');
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8">
                <h1 className="text-2xl font-bold text-purple-700 text-center mb-6">Set New Password</h1>

                {success && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center gap-2">
                        <FiCheckCircle />
                        <span className="text-sm">{success} Redirecting...</span>
                    </div>
                )}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="New Password"
                            className="input input-bordered w-full pr-10"
                            {...register('new_password', {
                                required: true,
                                minLength: { value: 8, message: 'Min 8 characters' }
                            })}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-500"
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                    {errors.new_password && (
                        <p className="text-xs text-red-500 -mt-2">{errors.new_password.message}</p>
                    )}

                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        className="input input-bordered w-full"
                        {...register('confirm_password', {
                            required: true,
                            validate: value => value === newPassword || 'Passwords do not match'
                        })}
                    />
                    {errors.confirm_password && (
                        <p className="text-xs text-red-500 -mt-2">{errors.confirm_password.message}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn bg-linear-to-r from-purple-600 to-pink-600 text-white w-full"
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>

                    <p className="text-center text-sm">
                        <Link to="/login" className="text-purple-600 hover:underline">Back to Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordConfirm;
