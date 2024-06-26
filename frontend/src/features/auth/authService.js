import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  console.log("hello wolrd");
  return response.data;
};

const authService = {
  register,
};

export default authService;
