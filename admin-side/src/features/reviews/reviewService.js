import axios from "axios";

const BASE_URL = "/api/review/";

const fetchReviews = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

const fetchReviewsById = async (id) => {
  const res = await axios.get(BASE_URL + id);
  return res.data;
};

const reviewService = {
  fetchReviews,
  fetchReviewsById,
};

export default reviewService;
