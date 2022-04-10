import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import {
  createProduct,
  clearProductState,
} from "../features/products/productSlice";

const categories = [
  "Men",
  "Women",
  "Kids",
  "Shirts",
  "Jeans",
  "Suits",
  "Swimwear",
  "Sleepwear",
  "Sportswear",
  "Blazers",
  "Jackets",
  "Trousers",
];

const colors = ["Black", "White", "Yellow", "Blue", "Red", "Grey"];

const sizes = ["XS", "S", "M", "L", "XL"];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(color, productColor, theme) {
  return {
    fontWeight:
      productColor.indexOf(color) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function AddProductForm() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isProductSaved, isError, errorMsg } = useSelector(
    (state) => state.products
  );

  const [value, setValue] = useState({
    title: "",
    price: "",
    desc: "",
  });
  const [productImg, setProductImg] = useState("");
  const [category, setCategory] = useState([]);
  const [colorChecked, setColorChecked] = useState([]);
  const [sizeChecked, setSizeChecked] = useState([]);

  useEffect(() => {
    isProductSaved && navigate("/products");
    return () => {
      dispatch(clearProductState());
    };
  }, [navigate, isProductSaved]);

  const handleProductImgChange = (event) => {
    setProductImg(event.target.files[0]);
  };

  const handleValueChange = (e) => {
    setValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCategoryChange = (e) => {
    setCategory(
      typeof e.target.value === "string"
        ? e.target.value.split(",")
        : e.target.value
    );
  };

  const handleColorChange = (selectedColor) => {
    const currentIndex = colorChecked.indexOf(selectedColor);
    const newChecked = [...colorChecked];
    currentIndex === -1
      ? newChecked.push(selectedColor)
      : newChecked.splice(currentIndex, 1);

    setColorChecked(newChecked);
  };

  const handleSizeChange = (selectedSize) => {
    const currentIndex = sizeChecked.indexOf(selectedSize);
    const newChecked = [...sizeChecked];
    currentIndex === -1
      ? newChecked.push(selectedSize)
      : newChecked.splice(currentIndex, 1);

    setSizeChecked(newChecked);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const productData = new FormData();

    productData.append("productImg", productImg);
    productData.append("title", value.title);
    productData.append("price", value.price);
    productData.append("desc", value.desc);
    productData.append("category", category);
    productData.append("color", colorChecked);
    productData.append("size", sizeChecked);

    dispatch(createProduct(productData));
  };

  return (
    <Paper elevation={3} sx={{ padding: { xs: 2, sm: 4 } }}>
      <Typography variant="h5" component="h4" mb={3}>
        Add Product
      </Typography>

      {isError && (
        <Typography variant="body1" component="p" color="error" gutterBottom>
          {errorMsg}
        </Typography>
      )}

      <form onSubmit={onSubmit}>
        <Stack spacing={3}>
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              type="file"
              name="productImg"
              onChange={handleProductImgChange}
              sx={{ display: "none" }}
            />
            <Button
              variant="contained"
              component="span"
              startIcon={<PhotoCamera />}
            >
              Upload Image *
            </Button>
            <Typography marginLeft={2} component="span">
              {productImg.name}
            </Typography>
          </label>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 3, sm: 4 }}
          >
            <TextField
              fullWidth
              label="Title"
              name="title"
              variant="standard"
              value={value.title}
              onChange={handleValueChange}
            />

            <FormControl variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
              <Input
                id="standard-adornment-amount"
                name="price"
                value={value.price}
                onChange={handleValueChange}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            </FormControl>
          </Stack>

          <TextField
            fullWidth
            label="Description"
            name="desc"
            variant="standard"
            multiline
            rows={5}
            value={value.desc}
            onChange={handleValueChange}
          />

          <FormControl fullWidth variant="standard">
            <InputLabel id="category">Category</InputLabel>
            <Select
              labelId="category"
              multiple
              value={category}
              onChange={handleCategoryChange}
              input={<Input label="category" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {categories.map((cat) => (
                <MenuItem
                  key={cat}
                  value={cat}
                  style={getStyles(cat, category, theme)}
                >
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth component="fieldset">
            <FormLabel component="legend">Color</FormLabel>
            <FormGroup aria-label="position" row>
              {colors.map((clr) => (
                <FormControlLabel
                  value={clr}
                  control={
                    <Checkbox
                      checked={colorChecked.indexOf(clr) === -1 ? false : true}
                      onChange={() => handleColorChange(clr)}
                    />
                  }
                  label={clr}
                  labelPlacement={clr}
                />
              ))}
            </FormGroup>
          </FormControl>

          <FormControl fullWidth component="fieldset">
            <FormLabel component="legend">Size</FormLabel>
            <FormGroup aria-label="position" row>
              {sizes.map((siz) => (
                <FormControlLabel
                  value={siz}
                  control={
                    <Checkbox
                      checked={sizeChecked.indexOf(siz) === -1 ? false : true}
                      onChange={() => handleSizeChange(siz)}
                    />
                  }
                  label={siz}
                  labelPlacement={siz}
                />
              ))}
            </FormGroup>
          </FormControl>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            startIcon={<AddCircleIcon />}
            disabled={isLoading}
          >
            Add Product
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
