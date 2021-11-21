import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import logo from "../../assets/logo/Logo-Dark-Rect.jpg";
import { useHistory } from "react-router-dom";
import Hamburger from "hamburger-react";
import { useDispatch, useSelector } from "react-redux";

export default function NavbarIn(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const val = useSelector((state) => state.hamburger.Open);

  return (
    <Box>
      <AppBar position="static" style={{ backgroundColor: "rgba(8,26,48, 1)" }}>
        <Toolbar
          variant="dense"
          style={{ backgroundColor: "rgba(8,26,48, 1)" }}
        >
          <Grid container alignItems="center" justifyContent="flex-start">
            <Grid item xs={6} md={6} lg={3}>
              <img
                src={logo}
                alt="logo"
                style={{ height: "4em", cursor: "pointer" }}
                onClick={() => {
                  history.push("/");
                }}
              />
            </Grid>

            {window.innerWidth > 1200 ? (
              <Grid
                item
                container
                spacing={3}
                lg={9}
                justifyContent="flex-end"
                alignItems="center"
              >
                <Grid item>
                  <h2
                    onClick={() => {
                      history.push("/home");
                    }}
                    className={
                      props.page === 0 ? "nav-list-active" : "nav-list"
                    }
                  >
                    Home
                  </h2>
                </Grid>
                <Grid item>
                  <h2
                    onClick={() => {
                      history.push("/search");
                    }}
                    className={
                      props.page === 1 ? "nav-list-active" : "nav-list"
                    }
                  >
                    Search
                  </h2>
                </Grid>
                <Grid item>
                  <h2
                    onClick={() => {
                      history.push("/portfolio");
                    }}
                    className={
                      props.page === 2 ? "nav-list-active" : "nav-list"
                    }
                  >
                    Watchlist
                  </h2>
                </Grid>
                <Grid item>
                  <h2
                    onClick={() => {
                      history.push("/news");
                    }}
                    className={
                      props.page === 3 ? "nav-list-active" : "nav-list"
                    }
                  >
                    Headlines
                  </h2>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    style={{
                      fontWeight: "600",
                      fontFamily: "Montserrat, sans-serif",
                      borderRadius: "1em",
                    }}
                    onClick={() => {
                      dispatch({ type: "LOGOUT" });
                      history.push("/");
                    }}
                  >
                    <p style={{ margin: "8% 0" }}>Log Out</p>
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Grid item container xs={6} lg={false} justifyContent="flex-end">
                <Hamburger
                  toggled={val}
                  toggle={() => dispatch({ type: "TOGGLE" })}
                  rounded
                  direction="right"
                  color="#5cc9cc"
                  size={20}
                />
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
