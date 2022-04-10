import axios from "axios";

const BASE_URL = "/api/auth/";

const userLogin = async (userData) => {
  const res = await axios.post(BASE_URL + "login", userData);
  return res.data;
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
};

const authService = {
  userLogin,
  logout
};

export default authService;
