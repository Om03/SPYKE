import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Wall from "../../assets/login/wall.jpg";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../../components/NavbarNon";
import { toast } from "react-toastify";
import logo from "../../assets/logo/Logo-Dark-Square.jpg";
import Copyright from "../../components/AuthFooter/";
import ReactLoading from "react-loading";
import { logIn } from "../../actions/auth";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#5cc9cc" },
  },
});

export default function Login() {
  const [state, setState] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  document.title = "Login - SPYKE";
  const handleSubmit = (event) => {
    event.preventDefault();
    if (state.email === "") {
      toast("Please Enter a Valid Email ID");
    } else if (state.password === "") {
      toast("Please Enter Password");
    } else {
      setLoading(true);
      dispatch(
        logIn(state, history, () => {
          setLoading(false);
        })
      );
    }
  };

  const handleChange = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <>
      {loading ? (
        <main
          style={{
            Height: "100%",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            backgroundColor: "rgb(8,26,48)",
          }}
        >
          <ReactLoading
            type="spinningBubbles"
            color="#5cc9cc"
            height={100}
            width={100}
          />
        </main>
      ) : (
        <>
          <AppBar
            position="fixed"
            style={{ backgroundColor: "rgb(8,26,48)", boxShadow: "none" }}
          >
            <Navbar />
          </AppBar>
          <ThemeProvider theme={theme}>
            <Grid
              container
              // justifyContent="center"
              component="main"
              sx={
                window.innerWidth < 600
                  ? {
                      height: "max-content",
                      minHeight: "100vh",
                      backgroundColor: "#29539b",
                      backgroundImage: `linear-gradient(0deg,rgba(8, 26, 48, 1), rgba(8, 26, 48, 0.80)) ,url(${Wall})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      paddingTop: "7%",
                    }
                  : {
                      height: "max-content",
                      minHeight: "100vh",
                      backgroundColor: "#29539b",
                      backgroundImage: `linear-gradient(90deg,rgba(8, 26, 48, 1), rgba(8, 26, 48, 0.50)) ,url(${Wall})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      paddingTop: "4.3%",
                    }
              }
            >
              <CssBaseline />
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                item
                xs={12}
                lg={5}
                style={{ padding: "2%" }}
              >
                <Paper
                  className="fade-in-slow"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "5%",
                    borderRadius: "1em",
                  }}
                  elevation={6}
                  style={{
                    backgroundColor: "rgb(2, 2, 2, 0.2)",
                    backdropFilter: "blur(5px)",
                  }}
                >
                  <Avatar sx={{ height: "4em", width: "4em" }} src={logo} />

                  <Typography component="h1" variant="h5">
                    <p
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: "500",
                        color: "#fff",
                      }}
                    >
                      Log in
                    </p>
                  </Typography>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      value={state.email}
                      onChange={handleChange}
                      autoComplete="email"
                      autoFocus
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        color: "white",
                      }}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      onChange={handleChange}
                      value={state.password}
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        color: "white",
                      }}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={handleSubmit}
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        color: "#081a30",
                        fontSize: "1em",
                        borderRadius: "1em",
                      }}
                    >
                      <p
                        style={{
                          margin: "0",
                          fontFamily: "Montserrat, sans-serif",
                        }}
                      >
                        Sign In
                      </p>
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link
                          to="/forgot-password"
                          variant="body2"
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            textDecoration: "none",
                            color: "#5cc9cc",
                          }}
                        >
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link
                          to="/sign-up"
                          variant="body2"
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            textDecoration: "none",
                            color: "#5cc9cc",
                          }}
                        >
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                    <Copyright sx={{ mt: 5 }} />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </ThemeProvider>
        </>
      )}
    </>
  );
}
