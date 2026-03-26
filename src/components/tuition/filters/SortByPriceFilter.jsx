import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const SortByPriceFilter = ({ sortOrder, onSortOrder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const sortOptions = [
        { value: 'price', label: 'Low to High' },
        { value: '-price', label: 'High to Low' }
    ];
    const currentOption = sortOptions.find(opt => opt.value === sortOrder) || sortOptions[0];

    return (
        <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">Sort by Price</label>
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-3 py-2 text-left border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-200 outline-none flex items-center justify-between bg-white text-sm transition-colors hover:border-gray-300"
                >
                    <span className="text-gray-700">{currentOption.label}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                            {sortOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => { onSortOrder(option.value); setIsOpen(false); }}
                                    className={`w-full px-3 py-2 text-left text-sm transition-colors
                                        ${sortOrder === option.value ? 'bg-purple-50 text-purple-700' : 'hover:bg-gray-50 text-gray-700'}`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SortByPriceFilter;