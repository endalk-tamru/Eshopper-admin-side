import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import AddCircleIcon from "@mui/icons-material/AddCircle";

import {
  fetchProductById,
  updateProduct,
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
  "Trousers"  
];

const colors = ["Black", "White", "Yellow", "Blue", "Red", "Grey", "Other"];

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

function getStyles(cat, category, theme) {
  return {
    fontWeight:
      category?.indexOf(cat) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function EditProductForm() {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isSuccess, products } = useSelector((state) => state.products);

  const [values, setValues] = useState({
    title: "",
    price: "",
    desc: "",
  });
  const [category, setCategory] = useState([]);
  const [colorChecked, setColorChecked] = useState([]);
  const [sizeChecked, setSizeChecked] = useState([]);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (isSuccess) {
      setValues({
        title: products.title,
        price: products.price,
        desc: products.desc,
      });
      setCategory(products.category);
      setColorChecked(products.color);
      setSizeChecked(products.size);
    }
  }, [isSuccess]);

  const handleValuesChange = (e) => {
    setValues((prevState) => ({
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

    const updatedData = {
      ...products,
      title: values.title,
      price: values.price,
      desc: values.desc,
      color: colorChecked,
      size: sizeChecked,
      imgUrl: products.imgUrl,
      category,
    };

    dispatch(updateProduct({ id, updatedData }));
    navigate(`/product-detail/${id}`);
  };

  return (
    <Paper elevation={1} sx={{ padding: { xs: 2, sm: 4 } }}>
      <Typography variant="h5" component="h4" mb={3}>
        Edit Product
      </Typography>

      <form onSubmit={onSubmit}>
        <Stack spacing={3}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 3, sm: 4 }}
          >
            <TextField
              fullWidth
              label="Title"
              name="title"
              variant="standard"
              value={values.title}
              onChange={handleValuesChange}
            />

            <FormControl variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
              <Input
                id="standard-adornment-amount"
                name="price"
                value={values.price}
                onChange={handleValuesChange}
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
            value={values.desc}
            onChange={handleValuesChange}
          />

          <FormControl fullWidth variant="standard">
            <InputLabel id="category">Category</InputLabel>
            <Select
              labelId="category"
              multiple
              value={category ? category : []}
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
                      checked={colorChecked?.indexOf(clr) === -1 ? false : true}
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
                      checked={sizeChecked?.indexOf(siz) === -1 ? false : true}
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
            Save Changes
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
