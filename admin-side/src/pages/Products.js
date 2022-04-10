import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GridActionsCellItem } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Switch from "@mui/material/Switch";
import EditIcon from "@mui/icons-material/Edit";

import useCalculateProfit from "../useCalculateProfit";
import GridData from "../components/GridData";
import WidgetItem from "../components/WidgetItem";
import DeleteModal from "../components/DeleteModal";
import {
  fetchProducts,
  updateProduct,
  deleteProduct,
  productSoldStats,
  clearProductState,
} from "../features/products/productSlice";
import {
  fetchReviews,
  clearReviewState,
} from "../features/reviews/reviewSlice";

export default function Products() {
  const dispatch = useDispatch();
  const { products, yearlyStats, monthlyStats, weeklyStats } = useSelector(
    (state) => state.products
  );
  const { reviewInfo } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(productSoldStats());
    dispatch(fetchReviews());        

    return () => {
      dispatch(clearProductState());
      dispatch(clearReviewState());
    };
  }, [dispatch]);

  const productSoldStat = useCalculateProfit(
    yearlyStats,
    monthlyStats,
    weeklyStats
  );

  const deleteItem = (id) => {
    dispatch(deleteProduct(id));
  };

  const toggleStock = (id) => {
    const findData = products.find((product) => product._id === id);
    const updatedData = { ...findData, inStock: !findData.inStock };
    dispatch(updateProduct({ id, updatedData }));
  };

  const getRateValue = (params) => {
    const findReview = reviewInfo.find(
      (review) => review.productId === params.row._id
    );
    return findReview
      ? {
          rating: findReview.totalRate,
          numOfReview: findReview.reviews.length,
        }
      : { rating: 0, numOfReview: 0 };
  };

  const columns = [
    {
      field: "title",
      headerName: "Product",
      hideable: false,
      width: 250,
      renderCell: (params) => (
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                alt={params.row.title}
                src={params.row.imgUrl}
                variant="square"
                sx={{ width: 70, height: 100 }}
              />
            </ListItemAvatar>
            <Link
              to={`/product-detail/${params.row._id}`}
              style={{ color: "#D19C97", textDecoration: "none" }}
            >
              <ListItemText sx={{ ml: 2 }} primary={params.row.title} />
            </Link>
          </ListItem>
        </List>
      ),
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      width: 150,
      valueGetter: getRateValue,
      renderCell: (params) => (
        <Box>
          <Rating
            name="read-only"
            value={params.value.rating}
            readOnly
            precision={0.5}
            size="small"
          />
          <Typography variant="caption" component="p" marginLeft={0.7}>
            ({params.value.numOfReview} reviews)
          </Typography>
        </Box>
      ),
    },
    {
      field: "category",
      headerName: "Categories",
      width: 150,
      renderCell: (params) =>
        params.row.category.map((cat, idx) => (
          <Chip key={idx} label={cat} size="small" />
        )),
    },
    {
      field: "color",
      headerName: "Colors",
      width: 150,
      renderCell: (params) =>
        params.row.color.map((clr, idx) => (
          <Chip key={idx} label={clr} size="small" />
        )),
    },
    {
      field: "size",
      headerName: "Sizes",
      width: 150,
      renderCell: (params) =>
        params.row.size.map((siz, idx) => (
          <Chip key={idx} label={siz} size="small" />
        )),
    },
    {
      field: "price",
      headerName: "Price",
      width: 130,
    },
    {
      field: "inStock",
      headerName: "In Stock",
      width: 130,
      renderCell: (params) => (
        <Switch
          checked={params.row.inStock && true}
          onClick={() => toggleStock(params.row._id)}
        />
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 130,
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <Link to={`/edit-product/${params.row._id}`}>
              <EditIcon color="primary" />
            </Link>
          }
          label="Edit"
        />,
        <GridActionsCellItem
          icon={
            <DeleteModal
              deleteItem={() => deleteItem(params.row._id)}
              title={params.row.title}
            />
          }
          label="Delete"
        />,
      ],
    },
  ];

  return (
    <Stack spacing={3}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 3, sm: 0, md: 3 }}
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
      >
        <WidgetItem
          bgColor="#651fff"
          title="This WEEK Product Sold"
          tooltip = "compared to last week"
          data={productSoldStat.weeklyReport.currentData}
          profit={productSoldStat.weeklyReport.profitInPercent.toFixed(2)}
        />

        <WidgetItem
          bgColor="#65afff"
          title="This MONTH Product Sold"
          tooltip = "compared to last month"
          data={productSoldStat.monthlyReport.currentData}
          profit={productSoldStat.monthlyReport.profitInPercent.toFixed(2)}
        />
        <WidgetItem
          bgColor="#1de9b6"
          title="This YEAR Product Sold"
          tooltip = "compared to last year"
          data={productSoldStat.yearlyReport.currentData}
          profit={productSoldStat.yearlyReport.profitInPercent.toFixed(2)}
        />
      </Stack>

      <GridData
        rows={products}
        columns={columns}
        initialState={{
          columns: {
            columnVisibilityModel: {              
              category: false,              
            },
          },
        }}
      />
    </Stack>
  );
}
