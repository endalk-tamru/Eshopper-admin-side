import axios from "axios";

const BASE_URL = "/api/product/";

const createProduct = async (productData, token) => {
  const config = {
    headers: {
      ["x-auth-token"]: token,
    },
  };
  const res = await axios.post(
    BASE_URL + "create-product",
    productData,
    config
  );
  return res.data;
};

const fetchProducts = async () => {
  const res = await axios.get(BASE_URL + "?limitNum=50");
  return res.data;
};

const fetchProductById = async (id) => {
  const res = await axios.get(BASE_URL + id);
  return res.data;
};

const updateProduct = async ({id, updatedData}, token) => {
  const config = {
    headers: {
      ["x-auth-token"]: token,
    },
  };  
  const res = await axios.put(BASE_URL + id, updatedData, config);
  return res.data;
};

const deleteProduct = async (id, token) => {
  const config = {
    headers: {
      ["x-auth-token"]: token,
    },
  };
  const res = await axios.delete(BASE_URL + id, config);
  return res.data;
};

const productService = {
  createProduct,
  fetchProducts,
  fetchProductById,
  updateProduct,
  deleteProduct,
};

export default productService;
