import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    FiUser,
    FiMail,
    FiPhone,
    FiBook,
    FiBriefcase,
    FiAward,
    FiEdit2,
    FiSave,
    FiX,
    FiLock,
    FiCamera,
    FiLogOut
} from 'react-icons/fi';
import { GiGraduateCap } from 'react-icons/gi';
import useAuthContext from '../hooks/useAuthContext';
import authApiClient from '../services/auth-api-client';
import Loading from '../components/Loading';
import ErrorAlert from '../components/ErrorAlert';
import DefaultImage from '../assets/profile.jpg'
import userAuthApiClient from '../services/userAuthApiClient';

const Profile = () => {
    const { user } = useAuthContext();
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'password'
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const apiEndpoint = user.role === 'teacher' ? '/teacher/profile/' : '/student/profile/';

    // Profile form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    // Password form
    const {
        register: registerPassword,
        handleSubmit: handlePasswordSubmit,
        watch,
        reset: resetPassword,
        formState: { errors: passwordErrors }
    } = useForm();

    const newPassword = watch('new_password');

    // Fetch profile data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const response = await authApiClient.get(apiEndpoint);
                setProfileData(response.data);
                reset(response.data); // Populate form with data
            } catch (err) {
                console.error('Error fetching profile:', err);
                setError(err.response?.data?.detail || 'Failed to load profile');
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchProfile();
        }
    }, [user, apiEndpoint, reset]);

    // Handle image preview
    useEffect(() => {
        if (selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreviewUrl(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [selectedFile]);

    // Handle profile update
    const onUpdateProfile = async (data) => {
        try {
            setUpdating(true);
            setError(null);
            setSuccess(null);
            const response = await authApiClient.patch(apiEndpoint, data);

            setProfileData(response.data);
            reset(response.data);
            setSuccess('Profile updated successfully!');
            setIsEditing(false);
            setSelectedFile(null);
            setPreviewUrl(null);
        } catch (err) {
            console.error('Error updating profile:', err);
            setError(err.response?.data?.detail || 'Failed to update profile');
        } finally {
            setUpdating(false);
        }
    };

    // Image upload handling 
    const onImageUpload = async () => {
        if (!selectedFile) return;

        try {
            setUpdating(true);
            setError(null);

            const formData = new FormData();
            formData.append('profile_picture', selectedFile);

            await authApiClient.patch(apiEndpoint, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const response = await authApiClient.get(apiEndpoint);
            setProfileData(response.data);
            setSuccess('Profile picture updated successfully!');
            setSelectedFile(null);
            setPreviewUrl(null);
        } catch (err) {
            console.error('Error uploading image:', err);
            setError(err.response?.data?.detail || 'Failed to upload image');
        } finally {
            setUpdating(false);
        }
    };

    // Handle password change
    const onChangePassword = async (data) => {
        try {
            setUpdating(true);
            setError(null);
            setSuccess(null);

            await userAuthApiClient.post('/auth/users/set_password/', {
                new_password: data.new_password,
                current_password: data.current_password
            });

            setSuccess('Password changed successfully!');
            resetPassword();
            setActiveTab('profile');
        } catch (err) {
            console.error('Error changing password:', err);
            setError(err.response?.data?.detail || 'Failed to change password');
        } finally {
            setUpdating(false);
        }
    };

    // Handle cancel edit
    const handleCancel = () => {
        reset(profileData);
        setIsEditing(false);
        setSelectedFile(null);
        setPreviewUrl(null);
        setError(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <Loading />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-purple-50 to-pink-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Profile Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    {/* Cover Image */}
                    <div className="h-32 bg-linear-to-r from-purple-600 to-pink-600"></div>

                    {/* Profile Picture Section */}
                    <div className="relative px-8 pb-6">
                        <div className="flex justify-between items-end">
                            <div className="relative -mt-16">
                                <div className="w-32 h-32 rounded-2xl border-4 border-white overflow-hidden bg-white shadow-lg">
                                    {previewUrl ? (
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : profileData?.profile_picture ? (
                                        <img
                                            src={profileData.profile_picture}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <img src={DefaultImage} alt="" />
                                    )}
                                </div>
                                {isEditing && (
                                    <div className="absolute bottom-0 right-0 flex gap-1">
                                        <label className="bg-purple-600 p-2 rounded-full cursor-pointer hover:bg-purple-700 transition-colors">
                                            <FiCamera className="w-4 h-4 text-white" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => setSelectedFile(e.target.files[0])}
                                            />
                                        </label>
                                        {selectedFile && (
                                            <button
                                                onClick={onImageUpload}
                                                className="bg-green-600 p-2 rounded-full hover:bg-green-700 transition-colors"
                                                disabled={updating}
                                            >
                                                <FiSave className="w-4 h-4 text-white" />
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="btn btn-sm bg-linear-to-r from-purple-600 to-pink-600 text-white border-0 gap-2"
                                >
                                    <FiEdit2 className="w-4 h-4" />
                                    Edit Profile
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleCancel}
                                        className="btn btn-sm btn-error gap-2"
                                        disabled={updating}
                                    >
                                        <FiX className="w-4 h-4" />
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSubmit(onUpdateProfile)}
                                        className="btn btn-sm bg-linear-to-r from-purple-600 to-pink-600 text-white border-0 gap-2"
                                        disabled={updating}
                                    >
                                        <FiSave className="w-4 h-4" />
                                        {updating ? 'Saving...' : 'Save'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="px-8 border-b border-gray-200">
                        <div className="flex gap-6">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`pb-3 px-1 font-medium text-sm transition-colors relative ${activeTab === 'profile'
                                    ? 'text-purple-600 border-b-2 border-purple-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Profile Information
                            </button>
                            <button
                                onClick={() => setActiveTab('password')}
                                className={`pb-3 px-1 font-medium text-sm transition-colors relative ${activeTab === 'password'
                                    ? 'text-purple-600 border-b-2 border-purple-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Change Password
                            </button>
                        </div>
                    </div>

                    {/* Alert Messages */}
                    {error && (
                        <div className="px-8 pt-4">
                            <ErrorAlert error={error} />
                        </div>
                    )}
                    {success && (
                        <div className="px-8 pt-4">
                            <div className="alert alert-success shadow-lg">
                                <div>
                                    <span>{success}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Profile Tab Content */}
                    {activeTab === 'profile' && (
                        <form onSubmit={handleSubmit(onUpdateProfile)} className="p-8 space-y-6">
                            {/* Basic Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label text-purple-800">
                                        <span className="label-text flex items-center gap-2">
                                            <FiUser className="text-purple-600" />
                                            First Name
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        className={`text-gray-600 font-medium input border border-gray-300 bg-white outline-none shadow-sm `}
                                        disabled={!isEditing}
                                        {...register('first_name', { required: 'First name is required' })}
                                    />
                                    {errors.first_name && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.first_name.message}</span>
                                        </label>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="label text-purple-800">
                                        <span className="label-text flex items-center gap-2">
                                            <FiUser className="text-purple-600" />
                                            Last Name
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        className={`text-gray-600 font-medium input border border-gray-300 bg-white outline-none shadow-sm `}
                                        disabled={!isEditing}
                                        {...register('last_name', { required: 'Last name is required' })}
                                    />
                                    {errors.last_name && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.last_name.message}</span>
                                        </label>
                                    )}
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control flex flex-col">
                                    <label className="label text-purple-800">
                                        <span className="label-text flex items-center gap-2">
                                            <FiMail className="text-purple-600" />
                                            Email
                                        </span>
                                    </label>
                                    <input
                                        type="email"
                                        className={`text-gray-600 font-medium input border border-gray-300 bg-white outline-none shadow-sm `}
                                        disabled={!isEditing}
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Invalid email address'
                                            }
                                        })}
                                    />
                                    {errors.email && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.email.message}</span>
                                        </label>
                                    )}
                                </div>

                                <div className="form-control flex flex-col">
                                    <label className="label text-purple-800">
                                        <span className="label-text flex items-center gap-2">
                                            <FiPhone className="text-purple-600" />
                                            Phone
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        className="text-gray-600 font-medium input border border-gray-300 bg-white outline-none shadow-sm "
                                        disabled={!isEditing}
                                        {...register('phone')}
                                    />
                                </div>
                            </div>

                            {/* Role-specific fields */}
                            {user.role === 'teacher' ? (
                                // Teacher fields
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="form-control flex flex-col">
                                            <label className="label text-purple-800">
                                                <span className="label-text flex items-center gap-2">
                                                    <FiBriefcase className="text-purple-600" />
                                                    Specialization
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                className="text-gray-600 font-medium input border border-gray-300 bg-white outline-none shadow-sm "
                                                disabled={!isEditing}
                                                {...register('specialization')}
                                            />
                                        </div>

                                        <div className="form-control flex flex-col">
                                            <label className="label text-purple-800">
                                                <span className="label-text flex items-center gap-2">
                                                    <FiAward className="text-purple-600" />
                                                    Experience
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                className="text-gray-600 font-medium input border border-gray-300 bg-white outline-none shadow-sm "
                                                disabled={!isEditing}
                                                {...register('experience')}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-control flex flex-col">
                                        <label className="label text-purple-800">
                                            <span className="label-text flex items-center gap-2">
                                                <FiBook className="text-purple-600" />
                                                Bio
                                            </span>
                                        </label>
                                        <textarea
                                            className="text-gray-600 font-medium textarea border border-gray-300 bg-white outline-none shadow-sm"
                                            disabled={!isEditing}
                                            {...register('bio')}
                                        />
                                    </div>

                                    {!isEditing && (
                                        <div className="form-control flex flex-col">
                                            <label className="label text-purple-800">
                                                <span className="label-text flex items-center gap-2">
                                                    <FiAward className="text-purple-600" />
                                                    Total Earnings
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                className="text-gray-600 font-medium input border border-gray-300 bg-white outline-none shadow-sm "
                                                value={`৳${profileData?.earning?.toLocaleString() || 0}`}
                                                disabled
                                            />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                // Student fields
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="form-control flex flex-col">
                                            <label className="label text-purple-800">
                                                <span className="label-text flex items-center gap-2">
                                                    <GiGraduateCap className="text-purple-600" />
                                                    Institution
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                className="text-gray-600 font-medium input border border-gray-300 bg-white outline-none shadow-sm "
                                                disabled={!isEditing}
                                                {...register('institution')}
                                            />
                                        </div>

                                        <div className="form-control flex flex-col">
                                            <label className="label text-purple-800">
                                                <span className="label-text flex items-center gap-2">
                                                    <FiBook className="text-purple-600" />
                                                    Class
                                                </span>
                                            </label>
                                            <select
                                                className="text-gray-600 font-medium select border border-gray-300 bg-white outline-none shadow-sm "
                                                disabled={!isEditing}
                                                {...register('class_detail')}
                                            >
                                                <option value="">Select Class</option>
                                                <option value="one">One</option>
                                                <option value="two">Two</option>
                                                <option value="three">Three</option>
                                                <option value="four">Four</option>
                                                <option value="five">Five</option>
                                                <option value="six">Six</option>
                                                <option value="seven">Seven</option>
                                                <option value="eight">Eight</option>
                                                <option value="nine">Nine</option>
                                                <option value="ten">Ten</option>
                                                <option value="eleven">Eleven</option>
                                                <option value="twelve">Twelve</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-control flex flex-col">
                                        <label className="label text-purple-800">
                                            <span className="label-text flex items-center gap-2">
                                                <FiBook className="text-purple-600" />
                                                Bio
                                            </span>
                                        </label>
                                        <textarea
                                            className="text-gray-600 font-medium textarea border border-gray-300 bg-white outline-none shadow-sm "
                                            disabled={!isEditing}
                                            {...register('bio')}
                                        />
                                    </div>
                                </div>
                            )}
                        </form>
                    )}

                    {/* Password Tab Content */}
                    {activeTab === 'password' && (
                        <form onSubmit={handlePasswordSubmit(onChangePassword)} className="p-8 space-y-6">
                            <div className="form-control flex flex-col">
                                <label className="label text-purple-800">
                                    <span className="label-text flex items-center gap-2">
                                        <FiLock className="text-purple-600" />
                                        Current Password
                                    </span>
                                </label>
                                <input
                                    type="password"
                                    className={`text-gray-600 font-medium input border border-gray-300 bg-white outline-none shadow-sm `}
                                    {...registerPassword('current_password', {
                                        required: 'Current password is required'
                                    })}
                                />
                                {passwordErrors.current_password && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">
                                            {passwordErrors.current_password.message}
                                        </span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control flex flex-col">
                                <label className="label text-purple-800">
                                    <span className="label-text flex items-center gap-2">
                                        <FiLock className="text-purple-600" />
                                        New Password
                                    </span>
                                </label>
                                <input
                                    type="password"
                                    className={`text-gray-600 font-medium input border border-gray-300 bg-white outline-none shadow-sm `}
                                    {...registerPassword('new_password', {
                                        required: 'New password is required',
                                        minLength: {
                                            value: 8,
                                            message: 'Password must be at least 8 characters'
                                        }
                                    })}
                                />
                                {passwordErrors.new_password && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">
                                            {passwordErrors.new_password.message}
                                        </span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control flex flex-col">
                                <label className="label text-purple-800">
                                    <span className="label-text flex items-center gap-2">
                                        <FiLock className="text-purple-600" />
                                        Confirm New Password
                                    </span>
                                </label>
                                <input
                                    type="password"
                                    className={`text-gray-600 font-medium input border border-gray-300 bg-white outline-none shadow-sm `}
                                    {...registerPassword('confirm_password', {
                                        required: 'Please confirm your password',
                                        validate: value => value === newPassword || 'Passwords do not match'
                                    })}
                                />
                                {passwordErrors.confirm_password && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">
                                            {passwordErrors.confirm_password.message}
                                        </span>
                                    </label>
                                )}
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('profile')}
                                    className="btn btn-error"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn bg-linear-to-r from-purple-600 to-pink-600 text-white border-0"
                                    disabled={updating}
                                >
                                    {updating ? 'Changing...' : 'Change Password'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;