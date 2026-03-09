
const LoadingSkeleton = () => {
    return (
        <div className="">
            <div className="flex w-7xl flex-col gap-4">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-3/5"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>
        </div>
    );
};

export default LoadingSkeleton;