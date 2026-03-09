import { FaStar } from 'react-icons/fa';

const RatingStars = ({ rating, onRatingChange, editable = false, size = 'w-5 h-5' }) => {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => editable && onRatingChange?.(star)}
                    className={`${editable ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
                    disabled={!editable}
                >
                    <FaStar
                        className={`${size} ${star <= rating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                            } ${editable && 'hover:text-yellow-400'}`}
                    />
                </button>
            ))}
        </div>
    );
};

export default RatingStars;