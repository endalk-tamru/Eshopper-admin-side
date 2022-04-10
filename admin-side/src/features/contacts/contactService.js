import axios from "axios";

const BASE_URL = "/api/contact/";

const fetchMessages = async (token) => {
  const config = {
    headers: {
      ["x-auth-token"]: token,
    },
  };
  const res = await axios.get(BASE_URL, config);
  return res.data;
};

const updateSeenMessages = async (token, isSeen) => {
  const config = {
    headers: {
      ["x-auth-token"]: token,
    },
  };
  const res = await axios.put(BASE_URL, isSeen, config);
  return res.data;
};

const unSeenMessages = async (token) => {
  const config = {
    headers: {
      ["x-auth-token"]: token,
    },
  };
  const res = await axios.get(BASE_URL + "count", config);
  return res.data;
};

const contactService = {
  fetchMessages,
  updateSeenMessages,
  unSeenMessages
};

export default contactService;
