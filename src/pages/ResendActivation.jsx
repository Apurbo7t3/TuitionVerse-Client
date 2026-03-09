import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FiMail, FiCheckCircle } from 'react-icons/fi';
import userApiClient from '../services/userApiClient';

const ResendActivation = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        setError(null);
        try {
            await userApiClient.post('/auth/users/resend_activation/', { email: data.email });
            setSuccess('Activation link has been resent to your email.');
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to resend activation');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8">
                <h1 className="text-2xl font-bold text-purple-700 text-center mb-2">Resend Activation</h1>
                <p className="text-gray-600 text-center mb-6">Enter your email to receive activation link</p>

                {success && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center gap-2">
                        <FiCheckCircle />
                        <span className="text-sm">{success}</span>
                    </div>
                )}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="input input-bordered w-full"
                        {...register('email', { required: true })}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn bg-linear-to-r from-purple-600 to-pink-600 text-white w-full"
                    >
                        {loading ? 'Sending...' : 'Resend Activation'}
                    </button>

                    <p className="text-center text-sm">
                        <Link to="/login" className="text-purple-600 hover:underline">Back to Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ResendActivation;