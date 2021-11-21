import React, { useState, useEffect } from "react";
import {
  AppBar,
  Button,
  Box,
  Container,
  Grid,
  Skeleton,
  Paper,
  Typography,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import MasonryItem from "@mui/lab/MasonryItem";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../../components/NavbarIn";
import Home from "../../assets/news/news.jpg";
import paper from "../../assets/news/drawing.svg";
import Copyright from "../../components/Footer";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useSelector, useDispatch } from "react-redux";
import { getHeadlines } from "../../actions/authroutes";
import ReactLoading from "react-loading";
import { getProfile } from "../../actions/auth";
import { useHistory } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#5cc9cc" },
  },
});

export default function News() {
  const headlines = useSelector((state) => state.headlines);
  const user = useSelector((state) => state.auth);
  const [load, setLoad] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (headlines.loading && user.plan !== undefined && !load) {
      dispatch(getHeadlines("NSE", history));
    }
  }, [dispatch, headlines, user, load, history]);

  useEffect(() => {
    dispatch(
      getProfile(() => {
        setLoad(false);
      }, history)
    );
  }, [dispatch, setLoad, history]);

  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed">
        <Navbar page={3} />
      </AppBar>
      {user.plan === undefined ? (
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
          Please Consider Buying a plan
        </main>
      ) : headlines.loading ? (
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
        <main style={{ maxWidth: "100vw", overflowX: "hidden" }}>
          {/* Hero unit */}
          <Box
            sx={{
              backgroundImage: `linear-gradient(0deg,rgba(8, 26, 48, 1), rgba(8, 26, 48, 0.35)), url(${Home})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "none",
              height: "max-content",
              border: "none",
              pt: 12,
              pb: 0,
            }}
          >
            <Container
              style={
                window.innerWidth < 600
                  ? {
                      marginTop: "0",
                      minHeight: "30vh",
                      maxWidth: "100vw",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-end",
                      border: "none",
                    }
                  : {
                      marginTop: "0",
                      minHeight: "45vh",
                      maxWidth: "100vw",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-end",
                      width: "100vw",
                      border: "none",
                    }
              }
            >
              <Typography
                component="h1"
                variant="h2"
                color="text.primary"
                align="center"
                gutterBottom
                style={
                  window.innerWidth < 600
                    ? {
                        fontFamily: "Montserrat, sans-serif",
                        color: "#5cc9cc",
                        fontWeight: "400",
                        fontSize: "2.5em",
                      }
                    : {
                        fontFamily: "Montserrat, sans-serif",
                        color: "#5cc9cc",
                        fontWeight: "400",
                      }
                }
                className="fade-in-slow"
              >
                Headlines
              </Typography>
            </Container>
          </Box>
          <Container
            sx={{ py: 8 }}
            style={{ maxWidth: "100vw", backgroundColor: "rgb(8, 26, 48)" }}
          >
            {window.innerWidth > 1200 && window.innerWidth < 1900 ? (
              <Masonry
                columns={4}
                spacing={7}
                style={{
                  maxHeight: "max-content",
                  height: "max-content",
                  cursor: "pointer",
                }}
              >
                {headlines.headlines.map((news, index) => (
                  <MasonryItem
                    key={index}
                    sx={{ paddingBottom: "2%", paddingTop: "2%" }}
                  >
                    <Paper
                      sx={{
                        backgroundImage: `url(${paper})`,
                        backgroundPositionX: "left",
                        backgroundPositionY: "top",
                        backgroundSize: "cover",
                        height: "max-content",
                        padding: "6%",
                        borderRadius: "1em",
                      }}
                    >
                      <Typography
                        component="h1"
                        variant="h6"
                        color="text.primary"
                        gutterBottom
                        style={
                          window.innerWidth < 600
                            ? {
                                fontFamily: "Montserrat, sans-serif",
                                color: "#fff",
                                fontWeight: "550",
                                fontSize: "2.5em",
                              }
                            : {
                                fontFamily: "Montserrat, sans-serif",
                                color: "#fff",
                                fontWeight: "550",
                              }
                        }
                        className="fade-in-slow"
                      >
                        {headlines.loading ? (
                          <>
                            <Skeleton
                              style={{ width: "100%", height: "2em" }}
                            />
                            <Skeleton
                              style={{ width: "100%", height: "2em" }}
                            />
                            <Skeleton
                              style={{ width: "100%", height: "2em" }}
                            />
                          </>
                        ) : (
                          `${news.Headline}` //Add NEws
                        )}
                      </Typography>
                      <Button
                        startIcon={<ArrowForwardIcon />}
                        variant="contained"
                        style={{ borderRadius: "1em", padding: "5%" }}
                        onClick={() => {
                          window.open(news.URL, "_blank").focus();
                        }}
                      >
                        <p style={{ margin: "0", fontWeight: "600" }}>
                          Read More
                        </p>
                      </Button>
                    </Paper>
                  </MasonryItem>
                ))}
              </Masonry>
            ) : (
              <Grid
                container
                alignItems="flex-start"
                justifyContent={
                  window.innerWidth < 1200 ? "center" : "flex-start"
                }
                spacing={2}
                style={{ maxHeight: "max-content" }}
              >
                {headlines.headlines.map((news, index) => (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={3}
                    key={index}
                    style={{ width: "100%" }}
                  >
                    <Paper
                      sx={{
                        backgroundImage: `url(${paper})`,
                        backgroundPositionX: "left",
                        backgroundPositionY: "top",
                        backgroundSize: "cover",
                        padding: "6%",
                        width: "100%",
                        height: "100%",
                        borderRadius: "1em",
                      }}
                    >
                      <Typography
                        component="h1"
                        variant="h6"
                        color="text.primary"
                        gutterBottom
                        style={
                          window.innerWidth < 600
                            ? {
                                fontFamily: "Montserrat, sans-serif",
                                color: "#fff",
                                fontWeight: "550",
                              }
                            : {
                                fontFamily: "Montserrat, sans-serif",
                                color: "#fff",
                                fontWeight: "550",
                              }
                        }
                        className="fade-in-slow"
                      >
                        {headlines.loading ? (
                          <>
                            <Skeleton
                              style={{ width: "100%", height: "2em" }}
                            />
                            <Skeleton
                              style={{ width: "100%", height: "2em" }}
                            />
                            <Skeleton
                              style={{ width: "100%", height: "2em" }}
                            />
                          </>
                        ) : (
                          `${news.Headline}` //Add NEws
                        )}
                      </Typography>
                      {!headlines.loading && (
                        <Button
                          startIcon={<ArrowForwardIcon />}
                          variant="contained"
                          style={{ borderRadius: "1em", padding: "5%" }}
                          onClick={() => {
                            window.open(news.URL, "_blank").focus();
                          }}
                        >
                          <p style={{ margin: "0", fontWeight: "600" }}>
                            Read More
                          </p>
                        </Button>
                      )}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>
        </main>
      )}
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
