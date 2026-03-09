import { useState } from 'react';
import { FaUser, FaEdit, FaTrash } from 'react-icons/fa';
import RatingStars from './RatingStars';
import EditReviewForm from './EditReviewForm';
import useAuthContext from '../../hooks/useAuthContext';
import authApiClient from '../../services/auth-api-client';

const ReviewItem = ({ review, tuitionId, onUpdate, onDelete }) => {
    const { user } = useAuthContext();
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const isReviewAuthor = () => {
        if (!user || !review) return false;
        return review.student_name === `${user.first_name} ${user.last_name}`;
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSaveEdit = (updatedReview) => {
        onUpdate(updatedReview);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this review?')) {
            return;
        }

        try {
            setIsDeleting(true);
            await authApiClient.delete(`/tuitions/${tuitionId}/reviews/${review.id}/`);
            onDelete(review.id);
        } catch (error) {
            console.error('Error deleting review:', error);
            alert(error.response?.data?.message || 'Failed to delete review');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="bg-purple-50 rounded-xl p-4 relative group">
            {/* Edit/Delete Buttons - Only show for review author */}
            {isReviewAuthor() && !isEditing && (
                <div className="absolute bottom-2 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={handleEdit}
                        disabled={isDeleting}
                        className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition disabled:opacity-50"
                        title="Edit review"
                    >
                        <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition disabled:opacity-50"
                        title="Delete review"
                    >
                        <FaTrash className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Edit Mode */}
            {isEditing ? (
                <EditReviewForm
                    review={review}
                    tuitionId={tuitionId}
                    onSave={handleSaveEdit}
                    onCancel={handleCancelEdit}
                />
            ) : (
                /* Normal View Mode */
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center shrink-0">
                        <FaUser className="text-purple-600" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-800">
                                {review.student_name}
                                {isDeleting && <span className="ml-2 text-xs text-red-500">Deleting...</span>}
                            </h4>
                            <RatingStars rating={review.rating} editable={false} size="w-4 h-4" />
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewItem;