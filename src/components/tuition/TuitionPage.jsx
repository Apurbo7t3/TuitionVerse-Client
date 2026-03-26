import FilterSection from './FilterSection';
import TuitionGrid from './TuitionGrid';
import Pagination from './Pagination';
import useFetchTuitions from '../../hooks/useFetchTuitions';
import Loading from '../../components/Loading';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const TuitionPage = () => {
    // handle of search funtionality
    const [searchParam] = useSearchParams();
    const search = searchParam.get('search');
    // Filter states
    const [currentPage, setCurrentPage] = useState(1);
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    useEffect(() => {
        if (search) {
            setSearchQuery(search);
        }
    }, [search]);


    const subjects = [
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
        'English',
        'History',
        'Geography'
    ];

    // Handle price range changes
    const handlePriceRangeChange = (newRange) => {
        setPriceRange(newRange);
        setCurrentPage(1);
    };


    // Handle subject change
    const handleSubjectChange = (subject) => {
        setSelectedSubject(subject);
        setCurrentPage(1);
    };

    // Handle search query
    const handleSearchQuery = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    // Handle sort order
    const handleSortOrder = (order) => {
        setSortOrder(order);
        setCurrentPage(1);
    };

    // Fetch tuitions with filters
    const { tuitions, isLoading, totalPage, totalCount } = useFetchTuitions(
        currentPage,
        priceRange,
        selectedSubject,
        searchQuery,
        sortOrder
    );

    return (
        <div className="bg-purple-50 mb-5 py-5">
            {/* Filter Section */}
            <div className="max-w-11/12 mx-auto px-4 mb-4">
                <FilterSection
                    priceRange={priceRange}
                    handlePriceRangeChange={handlePriceRangeChange}
                    subjects={subjects}
                    selectedSubject={selectedSubject}
                    handleSubjectChange={handleSubjectChange}
                    searchQuery={searchQuery}
                    handleSearchQuery={handleSearchQuery}
                    sortOrder={sortOrder}
                    handleSortOrder={handleSortOrder}
                />
            </div>

            {/* Results Info */}
            <div className="max-w-11/12 mx-auto px-4 mb-4">
                <p className="text-gray-600">
                    Found <span className="font-semibold">{totalCount}</span> tuitions
                    {searchQuery && ` matching "${searchQuery}"`}
                    {selectedSubject && ` in ${selectedSubject}`}
                </p>
            </div>

            {/* Tuitions Grid */}
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Loading />
                </div>
            ) : (
                <>
                    <TuitionGrid tuitions={tuitions} />

                    {/* Pagination */}
                    {totalPage > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPage={totalPage}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default TuitionPage;