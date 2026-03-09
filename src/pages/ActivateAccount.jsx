import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import userApiClient from '../services/userApiClient';

const ActivateAccount = () => {
    const { uid, token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const activateAccount = async () => {
            try {
                await userApiClient.post('/auth/users/activation/', { uid, token });
                setStatus('success');
                setMessage('Your account has been activated successfully!');
                setTimeout(() => navigate('/login'), 3000);
            } catch (err) {
                setStatus('error');
                setMessage(err.response?.data?.detail || 'Activation failed. The link may be invalid or expired.');
            }
        };

        activateAccount();
    }, [uid, token, navigate]);

    return (
        <div className="min-h-screen bg-linear-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 text-center">
                {status === 'loading' && (
                    <>
                        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <h2 className="text-xl font-semibold text-gray-700">Activating your account...</h2>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiCheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-green-600 mb-2">Success!</h2>
                        <p className="text-gray-600 mb-4">{message}</p>
                        <p className="text-sm text-gray-500">Redirecting to login...</p>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiXCircle className="w-8 h-8 text-red-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-red-600 mb-2">Activation Failed</h2>
                        <p className="text-gray-600 mb-6">{message}</p>
                        <Link
                            to="/login"
                            className="btn bg-linear-to-r from-purple-600 to-pink-600 text-white"
                        >
                            Go to Login
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default ActivateAccount;