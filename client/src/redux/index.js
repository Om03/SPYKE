import hamburger from "./overlay";
import auth from "./auth";
import headlines from "./headlines";
import watchlist from "./watchlist";
import marketmovers from "./marketmovers";

import { combineReducers } from "redux";

export default combineReducers({
  hamburger,
  auth,
  headlines,
  watchlist,
  marketmovers,
});
