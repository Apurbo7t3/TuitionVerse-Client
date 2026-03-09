import { useState } from 'react';
import RatingStars from './RatingStars';
import authApiClient from '../../services/auth-api-client';

const ReviewForm = ({ tuitionId, onReviewAdded }) => {
    const [review, setReview] = useState({ rating: 5, comment: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!review.comment.trim()) {
            setError('Please write a comment');
            return;
        }

        try {
            setIsSubmitting(true);
            setError('');

            const response = await authApiClient.post(`/tuitions/${tuitionId}/reviews/`, {
                rating: review.rating,
                comment: review.comment
            });

            onReviewAdded(response.data);
            setReview({ rating: 5, comment: '' });
        } catch (error) {
            console.error('Error submitting review:', error);
            setError(error.response?.data?.message || 'Failed to submit review');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 bg-purple-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Write a Review</h3>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                {/* Rating Selection */}
                <div className="flex items-center gap-4">
                    <span className="text-gray-700 font-medium">Your Rating:</span>
                    <RatingStars
                        rating={review.rating}
                        onRatingChange={(rating) => setReview({ ...review, rating })}
                        editable={true}
                    />
                </div>

                {/* Comment Input */}
                <textarea
                    value={review.comment}
                    onChange={(e) => setReview({ ...review, comment: e.target.value })}
                    placeholder="Share your experience with this tuition..."
                    className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                    rows="4"
                    required
                />

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ReviewForm;