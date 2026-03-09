import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi';

export const PaymentSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => navigate('/dashboard/payments'), 5000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen bg-linear-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiCheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h1>
                <p className="text-gray-600 mb-4">Your payment has been processed successfully.</p>
                <p className="text-sm text-gray-500 mb-6">Redirecting to dashboard in 5 seconds...</p>
                <Link to="/student/dashboard" className="btn bg-linear-to-r from-purple-600 to-pink-600 text-white">
                    Go to Dashboard
                </Link>
            </div>
        </div>
    );
};

export const PaymentFailed = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiXCircle className="w-10 h-10 text-red-600" />
                </div>
                <h1 className="text-2xl font-bold text-red-600 mb-2">Payment Failed</h1>
                <p className="text-gray-600 mb-4">Something went wrong. Please try again.</p>
                <Link to="/dashboard/payments" className="btn bg-linear-to-r from-purple-600 to-pink-600 text-white">
                    Try Again
                </Link>
            </div>
        </div>
    );
};

export const PaymentCancelled = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 text-center">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiClock className="w-10 h-10 text-yellow-600" />
                </div>
                <h1 className="text-2xl font-bold text-yellow-600 mb-2">Payment Cancelled</h1>
                <p className="text-gray-600 mb-4">You have cancelled the payment.</p>
                <Link to="/student/dashboard" className="btn bg-linear-to-r from-purple-600 to-pink-600 text-white">
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
};