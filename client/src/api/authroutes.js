import axios from "axios";
import { baseUrl } from "./url";
const API = axios.create({ baseURL: `${baseUrl}/authroutes` });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = localStorage.getItem("token");
  }
  return req;
});

export const getheadlines = (query) => API.get(`/news/${query}`);
export const getwatchlist = () => API.get('/long');
export const getmarketmovers = () => API.get('/market-movers');
export const gethome = () => API.get('/home');
export const getgraphdata = (formdata) => API.get(`/histdata/${formdata.days}/${formdata.ticker}`)
export const livestock = (query) => API.get(`/liveStock/${query}`)