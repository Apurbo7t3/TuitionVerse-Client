import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import apiClient from "../services/api-client";
import ReviewSection from "../components/review/ReviewSection";
import Loading from "../components/Loading";
import TuitionHeaderCard from "../components/tuition_details/TuitionHeaderCard";
import TeacherInfoCard from "../components/tuition_details/TeacherInfoCard";
import ApplyButtonCard from "../components/apply_and_payment/ApplyButtonCard";
import useAuthContext from "../hooks/useAuthContext";
import useFetchDashboard from "../hooks/useFetchDashboard";
import authApiClient from "../services/auth-api-client";

const TuitionDetailsPage = () => {
    const [tuition, setTuition] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isApplying, setIsApplying] = useState(false);
    const { user } = useAuthContext();

    const { student: studentDashboard, loading: dashboardLoading, refetch: refetchDashboard } = useFetchDashboard();

    const { id } = useParams();

    useEffect(() => {
        fetchTuitionDetails();
    }, [id]);

    const fetchTuitionDetails = async () => {
        setIsLoading(true);
        try {
            const response = await apiClient.get(`/tuitions/${id}/`);
            setTuition(response.data);
        } catch (error) {
            console.log("Error fetching tuition:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const isApproved = () => {
        if (!user || user.role !== 'student' || !studentDashboard?.applications?.list) {
            return false;
        }

        // Find if any application matches this tuition and is approved
        const approvedApp = studentDashboard.applications.list.find(
            app => app.tuition?.id === parseInt(id) && app.is_approved === true
        );

        return !!approvedApp;
    };

    const hasApplied = () => {
        if (!user || user.role !== 'student' || !studentDashboard?.applications?.list) {
            return false;
        }

        return studentDashboard.applications.list.some(
            app => app.tuition?.id === parseInt(id)
        );
    };

    const handleApply = async () => {
        if (!user) {
            window.location.href = `/login`;
            return;
        }

        if (user.role !== 'student') {
            alert('Only students can apply for tuitions');
            return;
        }

        try {
            setIsApplying(true);
            await authApiClient.post(`/tuitions/${id}/applications/`, {});
            alert('Application submitted successfully!');

            await fetchTuitionDetails();
            await refetchDashboard();
        } catch (error) {
            console.error('Error applying:', error);
            alert(error.response?.data?.message || 'Failed to apply. Please try again.');
        } finally {
            setIsApplying(false);
        }
    };

    if (isLoading || !tuition || (user?.role === 'student' && dashboardLoading)) {
        return (
            <div className="flex justify-center items-center h-screen w-full bg-purple-50">
                <Loading />
            </div>
        );
    }

    const canReview = isApproved();
    const alreadyApplied = hasApplied();

    return (
        <div className="w-full min-h-screen bg-linear-to-b from-purple-50 to-white">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Back Button */}
                <div className="mb-6">
                    <Link
                        to="/tuitions"
                        className="inline-flex items-center text-sm text-purple-600 hover:text-purple-800 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
                    >
                        <FaArrowLeft className="mr-2 h-4 w-4" />
                        Back to tuitions
                    </Link>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Tuition Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Tuition Header Card */}
                        <TuitionHeaderCard tuition={tuition} />

                        {/* Reviews Section - Pass the correct boolean */}
                        <ReviewSection
                            tuition={tuition}
                            onReviewUpdate={fetchTuitionDetails}
                            canReview={canReview}
                        />
                    </div>

                    {/* Right Column - Teacher Info & Actions */}
                    <div className="space-y-6">
                        {/* Teacher Info Card */}
                        <TeacherInfoCard tuition={tuition} />

                        {/* Apply Button Card */}
                        <ApplyButtonCard
                            isApplying={isApplying}
                            handleApply={handleApply}
                            tuition={tuition}
                            alreadyApplied={alreadyApplied}
                            userRole={user.role}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TuitionDetailsPage;