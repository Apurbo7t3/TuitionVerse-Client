const Pagination = ({ currentPage, totalPage, onPageChange }) => {
    return (
        <div className="flex justify-center gap-2 mt-8 mb-8">
            <button
                onClick={() => onPageChange(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white text-purple-700 font-bold rounded-lg shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
                Previous
            </button>

            <span className="px-4 py-2 bg-purple-500 font-bold text-white rounded-lg">
                Page {currentPage} of {totalPage}
            </span>

            <button
                onClick={() => onPageChange(prev => Math.min(totalPage, prev + 1))}
                disabled={currentPage === totalPage}
                className="px-4 py-2 bg-white text-purple-700 font-bold rounded-lg shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;