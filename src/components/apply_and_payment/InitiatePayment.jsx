import React, { useState } from 'react';
import { FiX, FiPhone, FiMapPin } from 'react-icons/fi';

import userAuthApiClient from '../../services/userAuthApiClient';

const InitiatePayment = ({ tuition, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        phone: '',
        address: ''
    });
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await userAuthApiClient.post('/payment/initiate/', {
                tuition_id: tuition.id,
                phone: formData.phone,
                address: formData.address
            });

            if (response.data.payment_url) {
                window.location.href = response.data.payment_url;
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Payment initiation failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-purple-700">Complete Payment</h2>
                    <button onClick={onClose} className="btn btn-sm btn-ghost btn-circle">
                        <FiX className="text-xl" />
                    </button>
                </div>

                <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600">Tuition: <span className="font-semibold">{tuition.subject}</span></p>
                    <p className="text-sm text-gray-600">Amount: <span className="font-semibold text-purple-600">৳{tuition.price}</span></p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <FiPhone className="inline mr-1" /> Phone Number
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="01XXXXXXXXX"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <FiMapPin className="inline mr-1" /> Address
                        </label>
                        <textarea
                            required
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            placeholder="Your full address"
                            rows="3"
                            className="textarea textarea-bordered w-full"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn bg-linear-to-r from-purple-600 to-pink-600 text-white w-full"
                    >
                        {loading ? 'Processing...' : `Pay ৳${tuition.price}`}
                    </button>
                </form>

                <p className="text-xs text-gray-500 text-center mt-3">
                    Secure payment via SSLCommerz
                </p>
            </div>
        </div>
    );
};

export default InitiatePayment;