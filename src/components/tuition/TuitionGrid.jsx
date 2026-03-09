import TuitionCard from './TuitionCard';

const TuitionGrid = ({ tuitions }) => {
    if (tuitions.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-500 text-lg">No tuitions found matching your criteria.</p>
            </div>
        );
    }

    return (
        <div className="max-w-11/12 mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tuitions.map((tuition) => (
                <TuitionCard key={tuition.id} tuition={tuition} />
            ))}
        </div>
    );
};

export default TuitionGrid;