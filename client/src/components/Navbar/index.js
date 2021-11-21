import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import logo from "../../assets/logo/Logo-Dark-Rect.jpg";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const history = useHistory();
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <Box>
      <AppBar position="static" style={{ backgroundColor: "rgba(8,26,48, 1)" }}>
        <Toolbar
          variant="dense"
          style={{ backgroundColor: "rgba(8,26,48, 1)" }}
        >
          <Grid container alignItems="center" justifyContent="flex-end">
            <Grid item xs={8}>
              <img
                src={logo}
                alt="logo"
                style={{ height: "4em", cursor: "pointer" }}
                onClick={() => {
                  history.push("/");
                }}
              />
            </Grid>
            {!user.email ? (
              <Grid item xs={4} align="right">
                <Button
                  variant="outlined"
                  style={{
                    fontWeight: "600",
                    fontFamily: "Montserrat, sans-serif",
                    borderRadius: "1em",
                  }}
                  onClick={() => {
                    history.push("/login");
                  }}
                >
                  <p style={{ margin: "8% 0" }}>LOGIN</p>
                </Button>
              </Grid>
            ) : (
              <Grid item xs={4} align="right">
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
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
