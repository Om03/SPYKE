import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Wall from "../../assets/login/wall.jpg";
import { Link, useHistory } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../../components/NavbarNon";
import { toast } from "react-toastify";
import logo from "../../assets/logo/Logo-Dark-Square.jpg";
import ReactLoading from "react-loading";
import { generateOTP, verifyOTP, signUp } from "../../actions/auth";
import { useDispatch } from "react-redux";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#5cc9cc" },
  },
});

export default function SignInSide() {
  document.title = "SignUP - SPYKE";
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({ email: "", password: "" });
  const [error, setError] = useState({
    email: false,
    password: false,
    OTP: false,
  });
  const [genotp, setGenOtp] = useState({ bool: false, otp: "" });

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const handleSubmit = (event) => {
    event.preventDefault();
    if (state.email === "" || !emailRegex.test(state.email)) {
      setError((prev) => {
        return { ...prev, email: true };
      });
      return toast.error("Please Enter a Valid Email ID");
    } else if (state.password === "") {
      setError((prev) => {
        return { ...prev, password: true };
      });
      return toast.error("Please Enter Password");
    } else {
      setLoading(true);
      generateOTP(
        state,
        () => {
          setLoading(false);
        },
        () => {
          setGenOtp((prev) => {
            return { ...prev, bool: true };
          });
        }
      );
    }
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    verifyOTP(
      { ...state, otp: genotp.otp },
      () => {
        setLoading(false);
      },
      () => {
        dispatch(
          signUp(state, history, () => {
            setLoading(false);
          })
        );
      }
    );
  };

  const handleChange = (e) => {
    setError((prev) => {
      return { ...prev, [e.target.name]: false };
    });
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
                      Sign Up
                    </p>
                  </Typography>
                  <Box component="form" noValidate onSubmit={handleSubmit}>
                    <TextField
                      margin="normal"
                      error={error.email}
                      helperText={
                        error.email ? "Please Enter a Valid Email" : ""
                      }
                      required
                      disabled={genotp.bool}
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
                      disabled={genotp.bool}
                      fullWidth
                      error={error.password}
                      helperText={
                        error.password ? "Please Enter a Password" : ""
                      }
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
                    {genotp.bool && (
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        error={error.OTP}
                        helperText={error.OTP ? "Please Enter a OTP" : ""}
                        onChange={(e) => {
                          setGenOtp((prev) => {
                            return { ...prev, otp: e.target.value };
                          });
                        }}
                        value={genotp.otp}
                        name="OTP"
                        label="OTP"
                        id="OTP"
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          color: "white",
                        }}
                      />
                    )}
                    {genotp.bool ? (
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleOTPSubmit}
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
                          Verify OTP
                        </p>
                      </Button>
                    ) : (
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
                          Generate OTP
                        </p>
                      </Button>
                    )}
                    <Grid container>
                      <Grid item>
                        <Link
                          to="/login"
                          variant="body2"
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            textDecoration: "none",
                            color: "#5cc9cc",
                          }}
                        >
                          {"Have an account? Log In"}
                        </Link>
                      </Grid>
                    </Grid>
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
