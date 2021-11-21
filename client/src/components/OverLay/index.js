import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import "../../css/overlay.css";
const OverLay = () => {
  const val = useSelector((state) => state.hamburger.Open);
  const dispatch = useDispatch();
  return (
    <>
      <div
        id="myNav"
        className="overlay"
        style={
          val
            ? { height: "100%", overflow: "none" }
            : { height: "0%", overflow: "hidden" }
        }
      >
        <div className="overlay-content">
          <Grid container>
            <Grid
              item
              xs={12}
              container
              alignItems="center"
              justifyContent="center"
            >
              <Link
                onClick={() => dispatch({ type: "TOGGLE" })}
                to="/home"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: "400",
                }}
              >
                Home
              </Link>
            </Grid>
            <Grid
              item
              xs={12}
              container
              alignItems="center"
              justifyContent="center"
            >
              <Link onClick={() => dispatch({ type: "TOGGLE" })} to="/search">
                Search
              </Link>
            </Grid>
            <Grid
              item
              xs={12}
              container
              alignItems="center"
              justifyContent="center"
            >
              <Link
                onClick={() => dispatch({ type: "TOGGLE" })}
                to="/portfolio"
              >
                Watchlist
              </Link>
            </Grid>
            <Grid
              item
              xs={12}
              container
              alignItems="center"
              justifyContent="center"
            >
              <Link onClick={() => dispatch({ type: "TOGGLE" })} to="/news">
                News
              </Link>
            </Grid>

            <Grid
              item
              xs={12}
              container
              alignItems="center"
              justifyContent="center"
            >
              <Link
                onClick={() => {
                  dispatch({ type: "TOGGLE" });
                  dispatch({ type: "LOGOUT" });
                }}
                to="/"
              >
                Log Out
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default OverLay;
