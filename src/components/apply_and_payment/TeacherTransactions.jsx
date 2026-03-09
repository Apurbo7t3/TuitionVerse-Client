import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiUser, FiBookOpen, FiCheckCircle, FiClock } from 'react-icons/fi';
import Loading from '../../components/Loading';
import userAuthApiClient from '../../services/userAuthApiClient';

const TeacherTransactions = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [totalEarned, setTotalEarned] = useState(0);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setLoading(true);
                const response = await userAuthApiClient.get('/payment/history/');
                setTransactions(response.data);

                const total = response.data.reduce((sum, t) => sum + t.amount, 0);
                setTotalEarned(total);
            } catch (err) {
                console.error('Error fetching transactions:', err);
                setError(err.response?.data?.detail || 'Failed to load transactions');
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) return <div className="min-h-screen flex justify-center items-center">
        <Loading />
    </div>;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* Header with Total */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-purple-700">Transaction History</h1>
                <div className="mt-4 bg-white rounded-xl shadow p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-purple-100 rounded-full">
                            <FiDollarSign className="w-8 h-8 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Earnings</p>
                            <p className="text-3xl font-bold text-gray-800">৳{totalEarned.toLocaleString()}</p>
                            <p className="text-xs text-gray-400 mt-1">{transactions.length} transactions</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            {/* Transactions List */}
            {transactions.length === 0 ? (
                <div className="bg-white rounded-xl shadow p-12 text-center">
                    <FiDollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-700">No transactions yet</h3>
                    <p className="text-gray-500 mt-2">When students pay, your earnings will appear here</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tuition</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {transactions.map((tx) => (
                                    <tr key={tx.transaction_id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {formatDate(tx.date)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <FiUser className="text-gray-400" />
                                                <span className="text-sm font-medium text-gray-800">
                                                    {tx.student_name || 'Student'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <FiBookOpen className="text-gray-400" />
                                                <span className="text-sm text-gray-600">
                                                    {tx.tuition_subject || `Tuition #${tx.tuition_id}`}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-semibold text-green-600">
                                                ৳{tx.amount.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-mono text-gray-500">
                                                {tx.transaction_id?.substring(0, 12)}...
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherTransactions;