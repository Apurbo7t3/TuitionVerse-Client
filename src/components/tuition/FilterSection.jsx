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
    return (
        <div className='max-w-11/12 mx-auto md:px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {/* price range filtering */}
            <div className='bg-white rounded-xl shadow-xl p-7 border border-gray-200 space-y-4'>
                <div>
                    <label className='text-gray-600 text-xl font-semibold text-md'>Price Range</label>
                </div>
                {/* for minimum price */}
                <div className='flex justify-center items-center gap-1 md:gap-4'>
                    <input
                        type="number"
                        min={0}
                        max={priceRange[1]}
                        value={priceRange[0]}
                        onChange={(e) => handlePriceRangeChange(0, Number(e.target.value))}
                        className='w-28 px-3 py-1 text-black font-bold outline-none border-2 bg-white border-gray-300 rounded-md'
                    />

                    <input
                        type="range"
                        min={0}
                        max={priceRange[1]}
                        step={10}
                        value={priceRange[0]}
                        onChange={(e) => handlePriceRangeChange(0, Number(e.target.value))}
                        className='w-full bg-purple-700'
                    />
                </div>
                {/* for maximum price */}
                <div className='flex justify-center items-center gap-1 md:gap-4'>
                    <input
                        type="number"
                        min={priceRange[0]}
                        max={10000}
                        value={priceRange[1]}
                        onChange={(e) => handlePriceRangeChange(1, Number(e.target.value))}
                        className='w-28 px-3 py-1 text-black font-bold outline-none border-2 border-gray-300 rounded-md'
                    />

                    <input
                        type="range"
                        min={priceRange[0]}
                        max={10000}
                        step={10}
                        value={priceRange[1]}
                        onChange={(e) => handlePriceRangeChange(1, Number(e.target.value))}
                        className='w-full'
                    />
                </div>
                <div className="flex justify-between items-center text-xl font-semibold text-gray-500">
                    <span>$ {priceRange[0]}</span>
                    <span>$ {priceRange[1]}</span>
                </div>
            </div>

            {/* Filter by Subject */}
            <div className='bg-white rounded-xl shadow-xl p-7 border border-gray-200 space-y-4'>
                <div>
                    <label className='text-gray-600 text-xl font-semibold text-md'>Subject</label>
                </div>
                {/* Select Subject */}
                <div className=''>
                    <select
                        value={selectedSubject}
                        onChange={(e) => handleSubjectChange(e.target.value)}
                        className='w-full px-3 text-black font-bold py-3 outline-none border-2 border-gray-300 rounded-md'
                    >
                        <option value="">All Subjects</option>
                        {subjects.map((subject) => (
                            <option value={subject} key={subject}>{subject}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Search */}
            <div className='bg-white rounded-xl shadow-xl p-7 border border-gray-200 space-y-4'>
                <div>
                    <label className='text-gray-600 text-xl font-semibold text-md'>Search</label>
                </div>
                {/* Search Box */}
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearchQuery(e.target.value)}
                    placeholder="Search by subject, description..."
                    className='w-full px-3 py-3 text-black outline-none border-2 border-gray-300 rounded-md'
                />
            </div>

            {/* Sort by price */}
            <div className='bg-white rounded-xl shadow-xl p-7 border border-gray-200 space-y-4'>
                <div>
                    <label className='text-gray-600 text-xl font-semibold text-md'>Sort By Price</label>
                </div>
                {/* Sort Options */}
                <div className=''>
                    <select
                        value={sortOrder}
                        onChange={(e) => handleSortOrder(e.target.value)}
                        className='w-full px-3 py-3 text-black font-bold outline-none border-2 border-gray-300 rounded-md'
                    >
                        <option value="price">Price: Low to High</option>
                        <option value="-price">Price: High to Low</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterSection;