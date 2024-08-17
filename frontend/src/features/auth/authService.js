import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => localStorage.removeItem("user");

const login = async (userData) => {
  const respone = await axios.post(`${API_URL}/login`, userData);
  if (respone.data) {
    localStorage.setItem("user", JSON.stringify(respone.data));
  }
  return respone.data;
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
