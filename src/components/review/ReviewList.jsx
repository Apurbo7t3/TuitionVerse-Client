import { FaStar } from 'react-icons/fa';
import ReviewItem from './ReviewItem';

const ReviewList = ({ reviews, tuitionId, onReviewUpdate, onReviewDelete }) => {
    if (!reviews || reviews.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaStar className="w-8 h-8 text-purple-400" />
                </div>
                <p className="text-gray-500 text-lg">
                    No reviews yet. Be the first to review!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {reviews.map((review) => (
                <ReviewItem
                    key={review.id}
                    review={review}
                    tuitionId={tuitionId}
                    onUpdate={onReviewUpdate}
                    onDelete={onReviewDelete}
                />
            ))}
        </div>
    );
};

export default ReviewList;