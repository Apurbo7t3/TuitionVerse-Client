import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useFetchTuitions = (
  currentPage,
  priceRange,
  selectedSubject,
  searchQuery,
  sortOrder,
) => {
  const [tuitions, setTuitions] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchTuitions = async () => {
      try {
        setLoading(true);

        let url = `tuitions/?price__lt=${priceRange[1]}&price__gt=${priceRange[0]}&page=${currentPage}&search=${searchQuery}&ordering=${sortOrder}&subject=${selectedSubject}`;

        const response = await apiClient.get(url);
        const data = await response.data;

        setTuitions(data.results || []);
        setTotalCount(data.count || 0);

        // Calculate total pages
        const itemsPerPage = data.results?.length || 10;
        setTotalPage(Math.ceil(data.count / itemsPerPage));
      } catch (error) {
        console.log("Error fetching tuitions:", error);
        setTuitions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTuitions();
  }, [currentPage, priceRange, selectedSubject, searchQuery, sortOrder]);

  return { tuitions, isLoading, totalPage, totalCount };
};

export default useFetchTuitions;
