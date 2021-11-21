import {
  signup,
  login,
  generateotp,
  verifyotp,
  updateprofile,
  getprofile,
  addstock,
  deletestock,
} from "../api/auth";
import { toast } from "react-toastify";

export const signUp = (formdata, router, unload) => async (dispatch) => {
  try {
    const { data } = await signup(formdata);
    toast.success("You have registered successfully !");
    dispatch({ type: "LOGIN", data: data });
    router.push("/home");
  } catch (error) {
    toast.error("Something went Wrong! Please Try Again");
  } finally {
    unload();
  }
};

export const logIn = (formdata, router, unload) => async (dispatch) => {
  try {
    const { data } = await login(formdata);
    dispatch({ type: "LOGIN", data: data });
    return router.push("/home");
  } catch (error) {
    unload();
    if (error.response?.status === 400) {
      return toast.error("Invalid Credentials");
    } else {
      return toast.error("Something went Wrong! Please Try Again");
    }
  }
};

export const generateOTP = async (formdata, unload, state) => {
  try {
    const { data } = await generateotp(formdata);
    if (data.token) {
      state();
      unload();
      toast.success("Otp has sent to Email");
      return localStorage.setItem("token", data.token);
    }
  } catch (error) {
    unload();
    if (error.response?.status === 409) {
      return toast.error("This Email Already Exists");
    } else {
      return toast.error("Something went Wrong! Please Try Again");
    }
  }
};

export const verifyOTP = async (formdata, unload, register) => {
  try {
    const { data } = await verifyotp(formdata);
    if (data.message === "OK") {
      register();
      toast.success("Otp Verified");
      return;
    }
  } catch (error) {
    unload();
    if (error.response?.status === 401) {
      return toast.error("Incorrect OTP");
    } else {
      return toast.error("Something went Wrong! Please Try Again");
    }
  }
};

export const updateProfile = (formdata, unload, router) => async (dispatch) => {
  try {
    const { data } = await updateprofile(formdata);
    unload();
    dispatch({ type: "UPDATE_PROFILE", data: data.result });
    return toast.success("Profile updated sucessfully");
  } catch (error) {
    unload();
    if (error.response?.status === 401) {
      dispatch({ type: "LOGOUT" });
      toast.warning("You have been logged out for security reasons");
      return router.push("/");
    } else {
      return toast.error("Something Went wrong! Please try relogin!");
    }
  }
};

export const getProfile = (loader, router) => async (dispatch) => {
  try {
    const { data } = await getprofile();
    if (data.result) {
      dispatch({ type: "UPDATE_PROFILE", data: data.result });
      loader();
    }
    return;
  } catch (error) {
    loader();
    if (error.response?.status === 401) {
      dispatch({ type: "LOGOUT" });
      toast.warning("You have been logged out for security reasons");
      return router.push("/");
    } else {
      return toast.error("Something Went wrong! Please try relogin!");
    }
  }
};

export const addStock =
  (formdata, loader, closemodal, clearmodaldata, router) =>
  async (dispatch) => {
    try {
      const { data } = await addstock(formdata);
      if (data.result) {
        dispatch({ type: "UPDATE_PROFILE", data: data.result });
        dispatch({ type: "CHANGED" });
        toast.success("Stock added to watchlist");
        closemodal();
        clearmodaldata();
        loader();
        return;
      }
    } catch (error) {
      loader();
      if (error.response?.status === 401) {
        dispatch({ type: "LOGOUT" });
        toast.warning("You have been logged out for security reasons");
        return router.push("/");
      } else {
        return toast.error("Something Went wrong! Please try relogin!");
      }
    }
  };

export const deleteStock = (ticker, filter, router) => async (dispatch) => {
  try {
    const { data } = await deletestock(ticker);
    if (data.result) {
      dispatch({ type: "UPDATE_PROFILE", data: data.result });

      dispatch({ type: "UPDATE_WATCHLIST", data: filter });

      toast.success("Stock deleted from watchlist");
      return;
    }
  } catch (error) {
    if (error.response?.status === 401) {
      dispatch({ type: "LOGOUT" });
      toast.warning("You have been logged out for security reasons");
      return router.push("/");
    } else {
      return toast.error("Something Went wrong!");
    }
  }
};
