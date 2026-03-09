import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
    FiBookOpen,
    FiDollarSign,
    FiClock,
    FiCalendar,
    FiFileText,
    FiCheckCircle,
    FiXCircle
} from 'react-icons/fi';
import { GiDuration } from 'react-icons/gi';
import userAuthApiClient from '../services/userAuthApiClient';

const CreateTuition = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const daysOptions = [
        { value: 'mon', label: 'Monday' },
        { value: 'tue', label: 'Tuesday' },
        { value: 'wed', label: 'Wednesday' },
        { value: 'thu', label: 'Thursday' },
        { value: 'fri', label: 'Friday' },
        { value: 'sat', label: 'Saturday' },
        { value: 'sun', label: 'Sunday' },
    ];

    const classOptions = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
        { value: 'four', label: 'Four' },
        { value: 'five', label: 'Five' },
        { value: 'six', label: 'Six' },
        { value: 'seven', label: 'Seven' },
        { value: 'eight', label: 'Eight' },
        { value: 'nine', label: 'Nine' },
        { value: 'ten', label: 'Ten' },
        { value: 'eleven', label: 'Eleven' },
        { value: 'twelve', label: 'Twelve' },
    ];

    // Handle image preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            setError(null);

            const formData = new FormData();

            // Append all text fields
            formData.append('subject', data.subject);
            formData.append('description', data.description);
            formData.append('class_detail', data.class_detail);
            formData.append('time_from', data.time_from);
            formData.append('time_to', data.time_to);
            formData.append('duration', data.duration);
            formData.append('price', data.price);
            formData.append('available', 'true');

            // Append multiple days - this is key for MultiSelectField
            if (data.days_in_week && data.days_in_week.length > 0) {
                data.days_in_week.forEach(day => {
                    formData.append('days_in_week', day);
                });
            }

            if (selectedFile) {
                formData.append('image', selectedFile);
            }

            const response = await userAuthApiClient.post('/api/tuitions/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setSuccess(true);
            setTimeout(() => {
                navigate('/tuitions');
            }, 2000);
        } catch (err) {
            console.error('Error creating tuition:', err);
            setError(err.response?.data?.detail || 'Failed to create tuition');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-purple-50 to-pink-50 p-6">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-purple-700">Create New Tuition</h1>
                    <p className="text-gray-600 mt-2">Fill in the details to post a new tuition opportunity</p>
                </div>

                {/* Main Form Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    {/* Success Message */}
                    {success && (
                        <div className="bg-green-100 px-8 py-4 border-b border-green-200">
                            <div className="flex items-center gap-3 text-green-700">
                                <FiCheckCircle className="w-5 h-5" />
                                <span>Tuition created successfully! Redirecting...</span>
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-100 px-8 py-4 border-b border-red-200">
                            <div className="flex items-center gap-3 text-red-700">
                                <FiXCircle className="w-5 h-5" />
                                <span>{error}</span>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                        {/* Subject */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center gap-2 text-gray-700 font-medium">
                                    <FiBookOpen className="text-purple-600" />
                                    Subject *
                                </span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., Mathematics, Physics, English"
                                className="input input-bordered w-full bg-white text-gray-800 border-gray-300 focus:border-purple-500"
                                {...register('subject', {
                                    required: 'Subject is required',
                                    maxLength: {
                                        value: 150,
                                        message: 'Subject must be less than 150 characters'
                                    }
                                })}
                            />
                            {errors.subject && (
                                <label className="label">
                                    <span className="label-text-alt text-red-500">{errors.subject.message}</span>
                                </label>
                            )}
                        </div>

                        {/* Description */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center gap-2 text-gray-700 font-medium">
                                    <FiFileText className="text-purple-600" />
                                    Description *
                                </span>
                            </label>
                            <textarea
                                placeholder="Describe the tuition, topics covered, requirements..."
                                className="textarea textarea-bordered w-full h-24 bg-white text-gray-800 border-gray-300 focus:border-purple-500"
                                {...register('description', {
                                    required: 'Description is required',
                                    maxLength: {
                                        value: 200,
                                        message: 'Description must be less than 200 characters'
                                    }
                                })}
                            />
                            {errors.description && (
                                <label className="label">
                                    <span className="label-text-alt text-red-500">{errors.description.message}</span>
                                </label>
                            )}
                        </div>

                        {/* Class Detail and Price Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Class Detail */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text flex items-center gap-2 text-gray-700 font-medium">
                                        <FiBookOpen className="text-purple-600" />
                                        Class *
                                    </span>
                                </label>
                                <select
                                    className="select select-bordered w-full bg-white text-gray-800 border-gray-300 focus:border-purple-500"
                                    {...register('class_detail', { required: 'Class is required' })}
                                >
                                    <option value="">Select Class</option>
                                    {classOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            Class {option.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.class_detail && (
                                    <label className="label">
                                        <span className="label-text-alt text-red-500">{errors.class_detail.message}</span>
                                    </label>
                                )}
                            </div>

                            {/* Price */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text flex items-center gap-2 text-gray-700 font-medium">
                                        <FiDollarSign className="text-purple-600" />
                                        Price (৳) *
                                    </span>
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="e.g., 3000"
                                    className="input input-bordered w-full bg-white text-gray-800 border-gray-300 focus:border-purple-500"
                                    {...register('price', {
                                        required: 'Price is required',
                                        min: {
                                            value: 1,
                                            message: 'Price must be greater than 0'
                                        }
                                    })}
                                />
                                {errors.price && (
                                    <label className="label">
                                        <span className="label-text-alt text-red-500">{errors.price.message}</span>
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* Time Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Time From */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text flex items-center gap-2 text-gray-700 font-medium">
                                        <FiClock className="text-purple-600" />
                                        Start Time *
                                    </span>
                                </label>
                                <input
                                    type="time"
                                    className="input input-bordered w-full bg-white text-gray-800 border-gray-300 focus:border-purple-500"
                                    {...register('time_from', { required: 'Start time is required' })}
                                />
                                {errors.time_from && (
                                    <label className="label">
                                        <span className="label-text-alt text-red-500">{errors.time_from.message}</span>
                                    </label>
                                )}
                            </div>

                            {/* Time To */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text flex items-center gap-2 text-gray-700 font-medium">
                                        <FiClock className="text-purple-600" />
                                        End Time *
                                    </span>
                                </label>
                                <input
                                    type="time"
                                    className="input input-bordered w-full bg-white text-gray-800 border-gray-300 focus:border-purple-500"
                                    {...register('time_to', { required: 'End time is required' })}
                                />
                                {errors.time_to && (
                                    <label className="label">
                                        <span className="label-text-alt text-red-500">{errors.time_to.message}</span>
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* Days and Duration Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Days in Week - Multiple Selection */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text flex items-center gap-2 text-gray-700 font-medium">
                                        <FiCalendar className="text-purple-600" />
                                        Days in Week *
                                    </span>
                                </label>
                                <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50 rounded-lg border border-gray-300">
                                    {daysOptions.map(option => (
                                        <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                value={option.value}
                                                className="checkbox checkbox-sm checkbox-primary"
                                                {...register('days_in_week', {
                                                    required: 'Select at least one day',
                                                    validate: value => value?.length > 0 || 'Select at least one day'
                                                })}
                                            />
                                            <span className="text-sm text-gray-700">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.days_in_week && (
                                    <label className="label">
                                        <span className="label-text-alt text-red-500">{errors.days_in_week.message}</span>
                                    </label>
                                )}
                            </div>

                            {/* Duration */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text flex items-center gap-2 text-gray-700 font-medium">
                                        <GiDuration className="text-purple-600" />
                                        Duration *
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., 2 months, 1 semester"
                                    className="input input-bordered w-full bg-white text-gray-800 border-gray-300 focus:border-purple-500"
                                    {...register('duration', {
                                        required: 'Duration is required',
                                        maxLength: {
                                            value: 100,
                                            message: 'Duration must be less than 100 characters'
                                        }
                                    })}
                                />
                                {errors.duration && (
                                    <label className="label">
                                        <span className="label-text-alt text-red-500">{errors.duration.message}</span>
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-700">Upload Image</span>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-purple-50 file:text-purple-700
                                hover:file:bg-purple-100
                                cursor-pointer"
                            />
                            {previewUrl && (
                                <div className="mt-3">
                                    <p className="text-sm text-gray-500 mb-2">Preview:</p>
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn bg-linear-to-r from-purple-600 to-pink-600 text-white border-0 w-full py-3 text-lg hover:opacity-90"
                            >
                                {loading ? <span className='loading loading-spinner text-lg text-white' ></span> : 'Create Tuition'}
                            </button>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    );
};

export default CreateTuition;