// pages/MyApprovedTuitions.jsx
import { useState } from 'react';
import { FiCheckCircle, FiClock, FiDollarSign } from 'react-icons/fi';
import useFetchDashboard from '../hooks/useFetchDashboard';
import Loading from '../components/Loading';
import ErrorAlert from '../components/ErrorAlert';
import InitiatePayment from '../components/apply_and_payment/InitiatePayment';

const PaymentHistory = () => {
    const { loading, error, student } = useFetchDashboard();
    const [selectedTuition, setSelectedTuition] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const handlePayNow = (tuition) => {
        setSelectedTuition(tuition);
        setShowPaymentModal(true);
    };

    // Get s paid tuitions
    const paidTuitionIds = new Set(
        student.payments.list.map(p => p.tuition)
    );

    // Filter only approved applications
    const approvedTuitions = student.applications.list.filter(app => app.is_approved === true);

    const formatCurrency = (amount) => {
        return `৳${amount.toLocaleString()}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <ErrorAlert error={error} />
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-purple-700">My Approved Tuitions</h1>
                <p className="text-gray-600 mt-2">
                    View all your approved tuitions and payment status
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="stat bg-purple-50 rounded-2xl shadow">
                    <div className="stat-figure text-purple-600">
                        <FiCheckCircle className="w-8 h-8" />
                    </div>
                    <div className="stat-title">Total Approved</div>
                    <div className="stat-value text-2xl text-purple-600">{approvedTuitions.length}</div>
                </div>

                <div className="stat bg-green-50 rounded-2xl shadow">
                    <div className="stat-figure text-green-600">
                        <FiDollarSign className="w-8 h-8" />
                    </div>
                    <div className="stat-title">Paid</div>
                    <div className="stat-value text-2xl text-green-600">
                        {approvedTuitions.filter(app => paidTuitionIds.has(app.tuition.id)).length}
                    </div>
                </div>

                <div className="stat bg-yellow-50 rounded-2xl shadow">
                    <div className="stat-figure text-yellow-600">
                        <FiClock className="w-8 h-8" />
                    </div>
                    <div className="stat-title">Pending Payment</div>
                    <div className="stat-value text-2xl text-yellow-600">
                        {approvedTuitions.filter(app => !paidTuitionIds.has(app.tuition.id)).length}
                    </div>
                </div>
            </div>

            {/* Approved Tuitions List */}
            {student.applications.total === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl shadow">
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="text-xl font-semibold text-gray-700">No approved tuitions yet</h3>
                    <p className="text-gray-500 mt-2">Your approved applications will appear here</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {student.applications.list.map((app) => {
                        const isPaid = paidTuitionIds.has(app.tuition.id);

                        return (
                            <div
                                key={app.id}
                                className={`card bg-white shadow hover:shadow-lg transition-shadow ${isPaid ? 'border-l-4 border-green-500' : 'border-l-4 border-yellow-500'
                                    }`}
                            >
                                <div className="card-body p-6">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        {/* Left Section */}
                                        <div className="flex items-start gap-4">
                                            <div className={`p-3 rounded-xl ${isPaid ? 'bg-green-100' : 'bg-yellow-100'
                                                }`}>
                                                {isPaid ? (
                                                    <FiCheckCircle className="w-6 h-6 text-green-600" />
                                                ) : (
                                                    <FiClock className="w-6 h-6 text-yellow-600" />
                                                )}
                                            </div>

                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-xl font-semibold text-gray-800">
                                                        {app.tuition.subject}
                                                    </h3>
                                                    <span className={`badge ${isPaid ? 'badge-success' : 'badge-warning'}`}>
                                                        {isPaid ? 'Paid' : 'Pending Payment'}
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                    <div>
                                                        <p className="text-gray-500">Teacher</p>
                                                        <p className="font-medium">{app.tuition.teacher_name}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500">Class</p>
                                                        <p className="font-medium">{app.tuition.class_detail}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500">Application ID</p>
                                                        <p className="font-medium">#{app.id}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Section - Amount & Action */}
                                        <div className="text-left md:text-right">
                                            <p className="text-sm text-gray-500 mb-1">Amount</p>
                                            <p className="text-2xl font-bold text-purple-600 mb-3">
                                                {formatCurrency(app.tuition.price)}
                                            </p>

                                            {!isPaid && (
                                                <button
                                                    onClick={() => handlePayNow(app.tuition)}
                                                    className="btn btn-primary bg-linear-to-r from-purple-600 to-pink-600 text-white border-0"
                                                >
                                                    Pay Now
                                                </button>
                                            )}

                                            {isPaid && (
                                                <button className="btn btn-outline btn-sm">
                                                    View Receipt
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            {showPaymentModal && selectedTuition && (
                <InitiatePayment
                    tuition={selectedTuition}
                    onClose={() => {
                        setShowPaymentModal(false);
                        setSelectedTuition(null);
                    }}
                />
            )}
        </div>
    );
};

export default PaymentHistory;