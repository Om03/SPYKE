import axios from "axios";
import { baseUrl } from "./url";
const API = axios.create({ baseURL: `${baseUrl}/auth` });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = localStorage.getItem("token");
  }
  return req;
});

export const signup = (formdata) => API.post("/sign-up", formdata);
export const login = (formdata) => API.post("/login", formdata);
export const generateotp = (formdata) => API.post("/generate-otp", formdata);
export const forgotpassword = (data) => API.put("forgot-password", data);
export const changepassword = (data) => API.put("change-password", data);
export const verifyotp = (formdata) => API.post("/verify-otp", formdata);
export const updateprofile = (formdata) =>
  API.post("/update-profile", formdata);
export const getprofile = () => API.get("/get-user");
export const addstock = (formdata) => API.post("/add-stock", formdata);
export const deletestock = (ticker) => API.delete(`/delete-stock/${ticker}`);