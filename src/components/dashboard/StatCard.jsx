
const StatCard = ({ icon: Icon, title, value, subtitle, bgColor = 'bg-purple-100', iconColor = 'text-purple-600', size = 'normal' }) => {
    const sizeClasses = {
        normal: 'p-6',
        small: 'p-4'
    };

    return (
        <div className={`bg-white rounded-2xl shadow-lg ${sizeClasses[size]} border border-purple-100 hover:shadow-xl transition-all transform hover:scale-105`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500 font-medium">{title}</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
                    {subtitle && (
                        <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
                    )}
                </div>
                <div className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
            </div>
        </div>
    );
};

export default StatCard;