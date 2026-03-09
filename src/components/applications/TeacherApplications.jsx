import React, { useState } from 'react';
import { FiCheckCircle, FiXCircle, FiUser, FiBookOpen, FiTrash2 } from 'react-icons/fi';
import useFetchDashboard from '../../hooks/useFetchDashboard';
import authApiClient from '../../services/auth-api-client';
import Loading from '../../components/Loading';

const TeacherApplications = () => {
    const { loading, teacher, refetch } = useFetchDashboard();
    const [processingId, setProcessingId] = useState(null);

    if (loading) return <div className='h-screen flex justify-center items-center'><Loading /></div>;

    // Get all applications grouped by tuition
    const tuitionsWithApps = teacher.tuitions?.filter(t => t.applications?.length > 0) || [];

    const handleApprove = async (tuitionId, applicationId) => {
        try {
            setProcessingId(applicationId);
            await authApiClient.patch(`/tuitions/${tuitionId}/applications/${applicationId}/`, {
                is_approved: true
            });
            refetch();
        } catch (err) {
            console.error('Error approving application:', err);
            alert('Failed to approve application');
        } finally {
            setProcessingId(null);
        }
    };

    const handleDelete = async (tuitionId, applicationId) => {
        if (!window.confirm('Are you sure you want to delete this application?')) return;

        try {
            setProcessingId(applicationId);
            await authApiClient.delete(`/tuitions/${tuitionId}/applications/${applicationId}/`);
            refetch();
        } catch (err) {
            console.error('Error deleting application:', err);
            alert('Failed to delete application');
        } finally {
            setProcessingId(null);
        }
    };

    if (tuitionsWithApps.length === 0) {
        return (
            <div className="p-6 max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold text-purple-700 mb-6">Applications</h1>
                <div className="bg-white rounded-xl shadow p-12 text-center">
                    <FiUser className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-700">No applications yet</h3>
                    <p className="text-gray-500 mt-2">Students will apply to your tuitions</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-purple-700 mb-6">Student Applications</h1>

            <div className="space-y-6">
                {tuitionsWithApps.map(tuition => (
                    <div key={tuition.id} className="bg-white rounded-xl shadow overflow-hidden">
                        {/* Tuition Header */}
                        <div className="bg-purple-50 px-6 py-4 border-b">
                            <div className="flex items-center gap-3">
                                <FiBookOpen className="text-purple-600" />
                                <div>
                                    <h2 className="font-semibold text-gray-800">{tuition.subject}</h2>
                                    <p className="text-sm text-gray-600">
                                        Class {tuition.class_detail} • ৳{tuition.price} • {tuition.total_applications} applications
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Applications List */}
                        <div className="divide-y">
                            {tuition.applications.map(app => (
                                <div key={app.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                                <FiUser className="text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800">{app.student_name}</p>
                                                <p className="text-xs text-gray-500">@{app.student_username}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {/* Status Badge */}
                                        {app.is_approved ? (
                                            <span className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm">
                                                <FiCheckCircle /> Approved
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full text-sm">
                                                Pending
                                            </span>
                                        )}

                                        {/* Actions */}
                                        <div className="flex gap-2">
                                            {!app.is_approved && (
                                                <button
                                                    onClick={() => handleApprove(tuition.id, app.id)}
                                                    disabled={processingId === app.id}
                                                    className="btn btn-sm bg-green-600 text-white hover:bg-green-700"
                                                >
                                                    {processingId === app.id ? '...' : 'Approve'}
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(tuition.id, app.id)}
                                                disabled={processingId === app.id}
                                                className="btn btn-sm btn-ghost text-red-600 hover:bg-red-50"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeacherApplications;