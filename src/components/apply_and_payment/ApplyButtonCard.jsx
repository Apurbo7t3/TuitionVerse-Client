const ApplyButtonCard = ({
    tuition,
    isApplying,
    handleApply,
    alreadyApplied,
    userRole
}) => {

    if (userRole === 'teacher') {
        return null;
    }

    return (
        <div>
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-purple-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Ready to Join?</h3>

                <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Monthly Fee</span>
                        <span className="font-bold text-purple-600 text-lg">৳{tuition.price}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Total Sessions</span>
                        <span className="font-bold text-purple-600">~{tuition.days_in_week?.length * 4}/month</span>
                    </div>
                    <div className="border-t border-gray-200 my-4"></div>

                    {tuition.available ? (
                        <button
                            onClick={handleApply}
                            disabled={isApplying || alreadyApplied}
                            className={`w-full bg-linear-to-r from-purple-400 to-purple-800 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {alreadyApplied
                                ? 'Already Applied'
                                : isApplying
                                    ? 'Applying...'
                                    : 'Apply Now'
                            }
                        </button>
                    ) : (
                        <button
                            disabled
                            className="w-full bg-gray-300 text-gray-600 font-bold py-4 px-6 rounded-xl cursor-not-allowed"
                        >
                            Currently Unavailable
                        </button>
                    )}

                    <p className="text-xs text-gray-500 text-center mt-3">
                        Secure payment via SSLCommerz
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ApplyButtonCard;