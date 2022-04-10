import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";

import Detail from "../components/ProductDetail";
import Reviews from "../components/Reviews";
import { fetchProductById } from "../features/products/productSlice";
import {
  fetchReviewsById,
  clearReviewState,
} from "../features/reviews/reviewSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { reviewQty, reviewInfo } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchProductById(id));
    dispatch(fetchReviewsById(id));

    return () => dispatch(clearReviewState());
  }, [dispatch, id]);

  return (
    <Stack spacing={5} sx={{ width: {xs: "100%", md:"65%"}, mx: "auto"}}>
      <Detail products={products} reviewInfo={reviewInfo} />
      <Reviews reviewQty={reviewQty} reviewInfo={reviewInfo} />
    </Stack>
  );
};

export default ProductDetail;
