import { Search, X } from 'lucide-react';

const SearchFilter = ({ searchQuery, onSearchQuery }) => {
    return (
        <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">Search</label>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchQuery(e.target.value)}
                    placeholder="Subject, description..."
                    className="w-full pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-200 outline-none transition-colors hover:border-gray-300"
                />
                {searchQuery && (
                    <button onClick={() => onSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                        <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchFilter;