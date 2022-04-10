import Box from "@mui/material/Box";

import AddProductForm from "../components/AddProductForm";

const AddProduct = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        "& > :not(style)": {
          width: 700,
        },
      }}
    >
      <AddProductForm />
    </Box>
  );
};

export default AddProduct;
