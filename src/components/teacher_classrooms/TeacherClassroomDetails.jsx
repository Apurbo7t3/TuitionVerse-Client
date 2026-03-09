import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiCheckCircle, FiClock, FiXCircle, FiPlus } from 'react-icons/fi';
import useFetchDashboard from '../../hooks/useFetchDashboard';
import Loading from '../../components/Loading';
import userAuthApiClient from '../../services/userAuthApiClient';

const TeacherClassroomDetails = () => {
    const { id } = useParams();
    const { loading, teacher } = useFetchDashboard();
    const [newTask, setNewTask] = useState({ title: '', description: '' });
    const [showForm, setShowForm] = useState(false);

    if (loading) return <div className='h-screen flex justify-center items-center'><Loading /></div>;

    const tuition = teacher.tuitions?.find(t => t.id === parseInt(id));
    if (!tuition) return <div className="p-6">Tuition not found</div>;

    const classroom = tuition.classroom;
    const hasStudent = classroom !== null;

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Done': return <FiCheckCircle className="text-green-600" />;
            case 'Pending': return <FiClock className="text-yellow-600" />;
            case 'Failed': return <FiXCircle className="text-red-600" />;
            default: return null;
        }
    };

    const updateTaskStatus = async (taskId, newStatus) => {
        try {
            await userAuthApiClient.patch(
                `/api/tuitions/${id}/classroom/${classroom.id}/tasks/${taskId}/`,
                { status: newStatus }
            );
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    const createTask = async () => {
        if (!newTask.title) return;
        try {
            await userAuthApiClient.post(
                `/api/tuitions/${id}/classroom/${classroom.id}/tasks/`,
                newTask
            );
            setNewTask({ title: '', description: '' });
            setShowForm(false);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* Tuition Info */}
            <div className="bg-white rounded-xl shadow p-6 mb-6">
                <h1 className="text-2xl font-bold text-purple-700">{tuition.subject}</h1>
                <p className="text-gray-600 mt-1">Class {tuition.class_detail} • ৳{tuition.price}</p>

                {!hasStudent && (
                    <div className="mt-4 p-4 bg-yellow-50 rounded-lg text-yellow-700">
                        No student assigned yet. Waiting for applications.
                    </div>
                )}
            </div>

            {/* Applications Section */}
            {tuition.applications?.length > 0 && (
                <div className="bg-white rounded-xl shadow p-6 mb-6">
                    <h2 className="font-semibold mb-3">Applications ({tuition.total_applications})</h2>
                    <div className="space-y-2">
                        {tuition.applications.map(app => (
                            <div key={app.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <span>{app.student_name}</span>
                                <span className={`text-sm px-3 py-1 rounded-full ${app.is_approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {app.is_approved ? 'Approved' : 'Pending'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Classroom & Tasks Section */}
            {hasStudent && (
                <div className="bg-white rounded-xl shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold">Classroom - {classroom.student_name}</h2>
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="btn btn-sm bg-purple-600 text-white"
                        >
                            <FiPlus className="mr-1" /> Add Task
                        </button>
                    </div>

                    {/* New Task Form */}
                    {showForm && (
                        <div className="mb-6 p-4 bg-purple-50 rounded-lg">
                            <input
                                type="text"
                                placeholder="Task title"
                                className="w-full p-2 border rounded mb-2"
                                value={newTask.title}
                                onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                            />
                            <textarea
                                placeholder="Description"
                                className="w-full p-2 border rounded mb-2"
                                rows="2"
                                value={newTask.description}
                                onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                            />
                            <div className="flex gap-2">
                                <button onClick={createTask} className="btn btn-sm bg-green-600 text-white">
                                    Save
                                </button>
                                <button onClick={() => setShowForm(false)} className="btn btn-sm btn-ghost">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Tasks List */}
                    <div className="space-y-3">
                        {classroom.tasks?.map(task => (
                            <div key={task.id} className="border rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="font-medium">{task.title}</h3>
                                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                                    </div>
                                    <select
                                        value={task.status}
                                        onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                                        className="ml-4 p-1 border rounded text-sm"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Done">Done</option>
                                        <option value="Failed">Failed</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    {getStatusIcon(task.status)}
                                    <span className="text-xs text-gray-500">Status: {task.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherClassroomDetails;