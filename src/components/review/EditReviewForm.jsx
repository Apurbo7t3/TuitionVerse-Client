import { useState } from 'react';
import RatingStars from './RatingStars';
import authApiClient from '../../services/auth-api-client';

const EditReviewForm = ({ review, tuitionId, onSave, onCancel }) => {
    const [editedReview, setEditedReview] = useState({
        rating: review.rating,
        comment: review.comment
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSave = async () => {
        try {
            setIsSubmitting(true);
            setError('');

            const response = await authApiClient.put(
                `/tuitions/${tuitionId}/reviews/${review.id}/`,
                {
                    rating: editedReview.rating,
                    comment: editedReview.comment
                }
            );

            onSave(response.data);
        } catch (error) {
            console.error('Error updating review:', error);
            setError(error.response?.data?.message || 'Failed to update review');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-3">
            {error && (
                <div className="p-2 bg-red-100 text-red-700 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium">Rating:</span>
                <RatingStars
                    rating={editedReview.rating}
                    onRatingChange={(rating) => setEditedReview({ ...editedReview, rating })}
                    editable={true}
                />
            </div>

            <textarea
                value={editedReview.comment}
                onChange={(e) => setEditedReview({ ...editedReview, comment: e.target.value })}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                rows="3"
            />

            <div className="flex items-center gap-2 justify-end">
                <button
                    onClick={handleSave}
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm disabled:opacity-50"
                >
                    {isSubmitting ? 'Saving...' : 'Save'}
                </button>
                <button
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition text-sm disabled:opacity-50"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default EditReviewForm;