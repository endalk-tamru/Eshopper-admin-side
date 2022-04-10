import Box from "@mui/material/Box";

import EditProductForm from "../components/EditProductForm";

const EditProduct = () => {
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
      <EditProductForm />
    </Box>
  );
};

export default EditProduct;
