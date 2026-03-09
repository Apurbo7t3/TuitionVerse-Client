import { useState, useEffect, useCallback } from "react";
import useAuthContext from "./useAuthContext";
import authApiClient from "../services/auth-api-client";
import userAuthApiClient from "../services/userAuthApiClient";

const useFetchDashboard = () => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Student data state
  const [studentData, setStudentData] = useState({
    applications: { list: [], total: 0, approved: 0, pending: 0 },
    enrolled_classrooms: [],
    tasks: { total: 0, done: 0, pending: 0, failed: 0 },
    payments: { list: [], total: 0 },
  });

  // Teacher data state
  const [teacherData, setTeacherData] = useState({
    tuitions: [],
    total_tuitions: 0,
    active_tuitions: 0,
    total_classrooms: 0,
    total_students: 0,
    total_applications: 0,
    pending_applications: 0,
    recent_payments: [],
    total_earnings: 0,
  });

  const fetchDashboardData = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (user.role === "student") {
        // Fetch student dashboard
        const response = await authApiClient.get("/student/dashboard/");
        const data = response.data;

        const applications = data.applications || [];
        const approvedApps = applications.filter(
          (app) => app.is_approved,
        ).length;
        const classrooms = data.enrolled_classrooms || [];

        // Process tasks
        let totalTasks = 0,
          doneTasks = 0,
          pendingTasks = 0,
          failedTasks = 0;
        classrooms.forEach((classroom) => {
          const tasks = classroom.tasks || [];
          totalTasks += tasks.length;
          doneTasks += tasks.filter((t) => t.status === "Done").length;
          pendingTasks += tasks.filter((t) => t.status === "Pending").length;
          failedTasks += tasks.filter((t) => t.status === "Failed").length;
        });

        setStudentData({
          applications: {
            list: applications,
            total: applications.length,
            approved: approvedApps,
            pending: applications.length - approvedApps,
          },
          enrolled_classrooms: classrooms,
          tasks: {
            total: totalTasks,
            done: doneTasks,
            pending: pendingTasks,
            failed: failedTasks,
          },
          payments: {
            list: data.payments || [],
            total: data.payments?.length || 0,
          },
        });
      } else if (user.role === "teacher") {
        // Fetch teacher dashboard
        const dashboardResponse = await authApiClient.get(
          "/teacher/dashboard/",
        );
        const tuitions = dashboardResponse.data || [];

        // Fetch payment history for teacher
        let payments = [];
        let totalEarnings = 0;

        try {
          const paymentResponse =
            await userAuthApiClient.get("/payment/history/");
          payments = paymentResponse.data || [];
          totalEarnings = payments.reduce((sum, p) => sum + p.amount, 0);
        } catch (err) {
          console.error("Error fetching payments:", err);
          // Continue with empty payments
        }

        // Calculate stats from tuitions
        const totalTuitions = tuitions.length;
        const activeTuitions = tuitions.filter((t) => t.available).length;

        // Get classrooms (approved tuitions with students)
        const classrooms = tuitions.filter((t) => t.classroom !== null);
        const totalClassrooms = classrooms.length;

        // Get unique students count
        const studentIds = new Set();
        classrooms.forEach((t) => {
          if (t.classroom?.student_name) {
            studentIds.add(t.classroom.student_name);
          }
        });
        const totalStudents = studentIds.size;

        // Calculate application stats
        let totalApplications = 0;
        let pendingApplications = 0;

        tuitions.forEach((t) => {
          totalApplications += t.total_applications || 0;
          const pendingInTuition = (t.applications || []).filter(
            (a) => !a.is_approved,
          ).length;
          pendingApplications += pendingInTuition;
        });

        setTeacherData({
          tuitions,
          total_tuitions: totalTuitions,
          active_tuitions: activeTuitions,
          total_classrooms: totalClassrooms,
          total_students: totalStudents,
          total_applications: totalApplications,
          pending_applications: pendingApplications,
          recent_payments: payments.slice(0, 5), // Last 5 payments
          total_earnings: totalEarnings,
        });
      }
    } catch (err) {
      console.error("Error fetching dashboard:", err);
      setError(err.response?.data?.detail || "Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    loading,
    error,
    student: studentData,
    teacher: teacherData,
    refetch: fetchDashboardData,
  };
};

export default useFetchDashboard;
