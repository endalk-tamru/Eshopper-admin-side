import axios from "axios";

const BASE_URL = "/api/order/";

const fetchOrders = async (token) => {
  const config = {
    headers: {
      ["x-auth-token"]: token,
    },
  };
  const res = await axios.get(BASE_URL, config);
  return res.data;
};

const incomeStats = async (token) => {
  const config = {
    headers: {
      ["x-auth-token"]: token,
    },
  };
  const res = await axios.get(BASE_URL + "income", config);
  return res.data;
};

const productSoldStats = async (token) => {
  const config = {
    headers: {
      ["x-auth-token"]: token,
    },
  };
  const res = await axios.get(BASE_URL + "sold", config);
  return res.data;
};

const orderService = {
  fetchOrders,
  incomeStats,
  productSoldStats
};

export default orderService;
