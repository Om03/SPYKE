import { AppBar, Box, Typography, CssBaseline, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import NavbarIn from "../../components/NavbarIn";
import NavbarOut from "../../components/Navbar";
import Copyright from "../../components/Footer/";
import noStock from "../../assets/home/noStock.svg";
import { Link } from "react-router-dom";
import React from 'react';
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#5cc9cc" },
  },
});

export default function NotFound() {
  document.title = "PAGE NOT FOUND - SPYKE";
  const user = useSelector((state) => state.auth);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed">
        {user.email !== undefined ? <NavbarIn page={5} /> : <NavbarOut />}
      </AppBar>
      <main
        style={{
          maxWidth: "100vw",
          overflowX: "hidden",
          backgroundColor: "#081A30",
          paddingTop: "5%",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} lg={12} md={12}>
            <div
              style={{
                height: "70vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <object
                type="image/svg+xml"
                data={noStock}
                style={
                  window.innerWidth < 600
                    ? { width: "75vw", height: "auto" }
                    : { width: "40vw", height: "auto" }
                }
              >
                <img
                  alt="404"
                  src={noStock}
                  style={
                    window.innerWidth < 600
                      ? { width: "75vw", height: "auto" }
                      : { width: "40vw", height: "auto" }
                  }
                />
              </object>
            </div>
          </Grid>
          <Grid item xs={12} lg={12} md={12}>
            <h1 align="center">Page Not found</h1>
            <Link
              to={user.email === undefined ? "/" : "/home"}
              variant="body2"
              style={{
                align: "center",
                fontFamily: "Montserrat, sans-serif",
                textDecoration: "none",
                color: "#5cc9cc",
              }}
            >
              <h4 align="center"> {"Click here to go Home"} </h4>
            </Link>
          </Grid>
        </Grid>
      </main>
      {/* Footer */}
      <Box
        sx={{
          bgcolor: "rgb(8, 26, 48)",
          color: "#fff",
          p: 6,
          borderTop: "1px solid #5cc9cc",
        }}
        component="footer"
      >
        <h3
          align="center"
          style={{ fontWeight: "500", fontSize: "1.6em", color: "#5cc9cc" }}
        >
          SPYKE Finance
        </h3>
        <Typography
          variant="subtitle1"
          align="center"
          style={{
            color: "#ccc",
            paddingBottom: "3%",
            fontFamily: "Montserrat, sans-serif",
          }}
          component="p"
        >
          The Automated Stock Timing Bot
        </Typography>
        <div style={{ width: "100%" }} align="center">
          <Copyright />
        </div>
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
