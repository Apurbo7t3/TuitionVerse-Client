
const SortByPriceFilter = ({ sortOrder, onSortOrder }) => {
    const sortOptions = [
        { value: 'price', label: 'Low to High' },
        { value: '-price', label: 'High to Low' }
    ];

    return (
        <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">Sort by Price</label>
            <select
                value={sortOrder}
                onChange={(e) => onSortOrder(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-200 outline-none bg-white transition-colors hover:border-gray-300"
            >
                {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
};

export default SortByPriceFilter;