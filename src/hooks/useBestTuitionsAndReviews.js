import { useState, useEffect } from "react";
import apiClient from "../services/api-client";

const useBestTuitionsAndReviews = () => {
  const [bestTuitions, setBestTuitions] = useState([]);
  const [topReviews, setTopReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(
          "tuitions/?ordering=-review_count",
        );
        const tuitions = response.data.results || [];
        setBestTuitions(tuitions);
        const highRated = [];
        console.log(tuitions);
        tuitions.forEach((tuition) => {
          tuition.reviews?.forEach((review) => {
            if (review.rating >= 4) {
              highRated.push({
                ...review,
                tuition_subject: tuition.subject,
                tuition_id: tuition.id,
                teacher_name: tuition.teacher_name,
              });
            }
          });
        });
        const sorted = highRated.sort((a, b) => b.rating - a.rating);
        setTopReviews(sorted.slice(0, 10));
      } catch (err) {
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { bestTuitions, topReviews, loading, error };
};

export default useBestTuitionsAndReviews;
