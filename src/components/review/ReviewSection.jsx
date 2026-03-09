import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

const ReviewSection = ({ tuition, onReviewUpdate, canReview }) => {

    return (
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-purple-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Reviews</h2>

            {canReview && (
                <ReviewForm
                    tuitionId={tuition.id}
                    onReviewAdded={onReviewUpdate}
                />
            )}

            <ReviewList
                reviews={tuition.reviews || []}
                tuitionId={tuition.id}
                onReviewUpdate={onReviewUpdate}
                onReviewDelete={onReviewUpdate}
            />
        </div>
    );
};

export default ReviewSection;