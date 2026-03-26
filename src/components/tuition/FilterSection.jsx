import { useState } from 'react';
import { Filter, X, SlidersHorizontal } from 'lucide-react';
import PriceRangeFilter from "./filters/PriceRangeFilter";
import SearchFilter from "./filters/SearchFilter";
import SortByPriceFilter from "./filters/SortByPriceFilter";
import SubjectFilter from "./filters/SubjectFilter";

const FilterSection = ({
    priceRange,
    handlePriceRangeChange,
    subjects,
    selectedSubject,
    handleSubjectChange,
    searchQuery,
    handleSearchQuery,
    sortOrder,
    handleSortOrder
}) => {
    const [isOpen, setIsOpen] = useState(false);

    // Count active filters (optional, for badge)
    const activeFiltersCount = [
        priceRange[0] > 0 || priceRange[1] < 10000,
        selectedSubject !== '',
        searchQuery !== '',
        sortOrder !== ''
    ].filter(Boolean).length;

    const toggleFilters = () => setIsOpen(!isOpen);

    return (
        <div className="sticky top-0 z-20 rounded-2xl bg-white/95 backdrop-blur-sm border-b border-gray-100 transition-all duration-200">
            <div className="max-w-7xl mx-auto px-4 py-3">
                {/* Filter bar header (always visible) */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={toggleFilters}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        <span>Filters</span>
                        {activeFiltersCount > 0 && (
                            <span className="ml-1 px-1.5 py-0.5 text-xs bg-purple-100 text-purple-700 rounded-full">
                                {activeFiltersCount}
                            </span>
                        )}
                    </button>

                    {/* Optional: quick summary of active filters (only when closed) */}
                    {!isOpen && activeFiltersCount > 0 && (
                        <div className="text-xs text-gray-500 truncate max-w-[60%]">
                            Active: {activeFiltersCount} filter{activeFiltersCount !== 1 && 's'}
                        </div>
                    )}

                    {/* Clear all filters button (visible when any filter active) */}
                    {activeFiltersCount > 0 && (
                        <button
                            onClick={() => {
                                handlePriceRangeChange([0, 10000]);
                                handleSubjectChange('');
                                handleSearchQuery('');
                                handleSortOrder('');
                            }}
                            className="text-xs text-purple-600 hover:text-purple-800 transition-colors"
                        >
                            Clear all
                        </button>
                    )}
                </div>

                {/* Filter content (collapsible) */}
                <div
                    className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="flex flex-wrap items-end gap-4 pb-1">
                        {/* Price Range */}
                        <div className="flex-1 min-w-[200px]">
                            <PriceRangeFilter
                                priceRange={priceRange}
                                onPriceRangeChange={handlePriceRangeChange}
                            />
                        </div>

                        {/* Subject */}
                        <div className="w-40">
                            <SubjectFilter
                                subjects={subjects}
                                selectedSubject={selectedSubject}
                                onSubjectChange={handleSubjectChange}
                            />
                        </div>

                        {/* Search */}
                        <div className="flex-1 min-w-[200px]">
                            <SearchFilter
                                searchQuery={searchQuery}
                                onSearchQuery={handleSearchQuery}
                            />
                        </div>

                        {/* Sort by Price */}
                        <div className="w-36">
                            <SortByPriceFilter
                                sortOrder={sortOrder}
                                onSortOrder={handleSortOrder}
                            />
                        </div>
                    </div>

                    {/* Optional close button inside expanded area (for mobile) */}
                    <div className="flex justify-end mt-3 md:hidden">
                        <button
                            onClick={toggleFilters}
                            className="text-xs text-gray-500 flex items-center gap-1"
                        >
                            <X className="w-3 h-3" /> Close filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterSection;