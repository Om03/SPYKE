import {
  getheadlines,
  getwatchlist,
  gethome,
  getgraphdata,
  getmarketmovers,
  livestock,
} from "../api/authroutes";
import { toast } from "react-toastify";

export const getHeadlines = (query, router) => async (dispatch) => {
  try {
    const { data } = await getheadlines(query);
    dispatch({ type: "GET_HEADLINES", data: data.result });
    return;
  } catch (error) {
    if (error.response?.status === 401) {
      dispatch({ type: "LOGOUT" });
      toast.warning("You have been logged out for security reasons");
      return router.push("/");
    } else {
      return toast.error("Something Went wrong! Please try again.");
    }
  }
};

export const getWatchList = (router) => async (dispatch) => {
  try {
    const { data } = await getwatchlist();
    if (data.result) {
      dispatch({ type: "GET_WATCHLIST", data: data.result });
      return;
    }
  } catch (error) {
    if (error.response?.status === 401) {
      dispatch({ type: "LOGOUT" });
      toast.warning("You have been logged out for security reasons");
      return router.push("/");
    } else {
      return toast.error("Something Went wrong! Please try again.");
    }
  }
};

export const getMarketMovers = (router) => async (dispatch) => {
  try {
    const { data } = await getmarketmovers();
    if (data.result) {
      dispatch({ type: "GET_MARKETMOVERS", data: data.result });
      return;
    }
  } catch (error) {
    if (error.response?.status === 401) {
      dispatch({ type: "LOGOUT" });
      toast.warning("You have been logged out for security reasons");
      return router.push("/");
    } else {
      return toast.error("Something Went wrong! Please try again.");
    }
  }
};

export const getHomeData = (router, unload) => async (dispatch) => {
  try {
    const { data } = await gethome();
    unload();
    return data.result;
  } catch (error) {
    unload();
    if (error.response?.status === 401) {
      dispatch({ type: "LOGOUT" });
      toast.warning("You have been logged out for security reasons");
      return router.push("/");
    } else {
      return toast.error("Something Went wrong! Please try again.");
    }
  }
};

export const getGraphData = async (formdata, router, unload) => {
  try {
    const { data } = await getgraphdata(formdata);
    if (data.result) {
      unload();
      return data.result;
    }
  } catch (error) {
    unload();
    if (error.response?.status === 500) {
      router.push("/invalid-ticker");
      return toast.error("Invalid ticker");
    } else {
      return toast.error("Something Went wrong! Please try again.");
    }
  }
};

export const liveStock = async (query) => {
  try {
    const { data } = await livestock(query);
    return data.result.live.current;
  } catch (error) {
    console.log(error); ///do not remove this
  }
};
