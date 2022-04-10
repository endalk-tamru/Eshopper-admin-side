import axios from "axios";

const BASE_URL = "/api/user/";

const fetchUsers = async (token, newUsersQuery) => {
  const config = {
    headers: {
      ["x-auth-token"]: token,
    },
  };
  const res = await axios.get(`${BASE_URL}?newUsers=${newUsersQuery}`, config);
  return res.data;
};

const updateUser = async ({ id, updatedData }, token) => {
  const config = {
    headers: {
      ["x-auth-token"]: token,
    },
  };
  const res = await axios.put(BASE_URL + id, updatedData, config);
  return res.data;
};

const deleteUser = async (id, token) => {
  const config = {
    headers: {
      ["x-auth-token"]: token,
    },
  };
  const res = await axios.delete(BASE_URL + id, config);
  return res.data;
};

const userStats = async (token) => {
  const config = {
    headers: {
      ["x-auth-token"]: token,
    },
  };
  const res = await axios.get(BASE_URL + "/stats", config);
  return res.data;
};

const userService = {
  fetchUsers,
  updateUser,
  deleteUser,
  userStats,
};

export default userService;
