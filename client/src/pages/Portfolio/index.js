import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Title from "../../assets/portfolio/title.jpeg";
import Buy from "../../assets/portfolio/Buy.svg";
import Typography from "@mui/material/Typography";
import Loss from "../../assets/home/loss.svg";
import Profit from "../../assets/home/profit.svg";
import Hold from "../../assets/home/hold.svg";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../../components/Footer";
import Navbar from "../../components/NavbarIn";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, deleteStock } from "../../actions/auth";
import { useHistory } from "react-router-dom";
import { getWatchList } from "../../actions/authroutes";
import ReactLoading from "react-loading";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#5cc9cc" },
    secondary: { main: "#C90152" },
  },
});

export default function Portfolio() {
  document.title = "Watchlist - SPYKE";
  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);
  const history = useHistory();
  const user = useSelector((state) => state.auth);
  const watchlist = useSelector((state) => state.watchlist);

  useEffect(() => {
    dispatch(getProfile(() => setLoad(false), history));
  }, [dispatch, history]);

  useEffect(() => {
    if (!load && user.plan !== undefined && watchlist.loading) {
      if (user.stocks.length !== 0) {
        dispatch(getWatchList(history));
      } else {
        dispatch({ type: "GET_WATCHLIST", data: [] });
      }
    }
  }, [load, dispatch, user, history, watchlist]);

  const handleDelete = (card) => {
    const filter = watchlist.watchlist.filter(
      (item) => item.share_n !== card.share_n
    );
    dispatch(deleteStock(card.share_n, filter, history));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed">
        <Navbar page={2} />
      </AppBar>
      {load ? (
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
      ) : user.plan === undefined ? (
        <main
          style={{
            Height: "100%",
            minHeight: "100vh",
            display: "flex",
            maxWidth: "100vw",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            backgroundColor: "rgb(8,26,48)",
          }}
        >
          <Grid container spacing={3} style={{ minWidth: "100vw" }}>
            <Grid
              container
              justifyContent={window.innerWidth < 900 ? "center" : "flex-end"}
              item
              xs={12}
              md={5}
            >
              <object
                type="image/svg+xml"
                data={Buy}
                style={{ maxHeight: "60vh" }}
              >
                <img src={Buy} alt="buy" />
              </object>
            </Grid>
            <Grid
              container
              alignItems="center"
              justifyContent={window.innerWidth < 900 ? "center" : "flex-start"}
              item
              xs={12}
              md={7}
            >
              <div>
                <h1
                  className="fade-in-slow"
                  style={{ color: "#5cc9cc", fontWeight: "500" }}
                >
                  Please Consider Buying a plan
                </h1>
              </div>
            </Grid>
          </Grid>
        </main>
      ) : watchlist.loading ? (
        <main
          style={{
            Height: "100%",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            minWidth: "90vw",
            backgroundColor: "rgb(8,26,48)",
          }}
        >
          <div
            style={{
              display: "block",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "100%",
              }}
            >
              <ReactLoading
                type="spinningBubbles"
                color="#5cc9cc"
                height={100}
                width={100}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "100%",
                color: "#5cc9cc",
              }}
            >
              <h5>{`Updating your Feed`}</h5>
            </div>
          </div>
        </main>
      ) : (
        <main style={{ maxWidth: "100vw", overflowX: "hidden" }}>
          {/* Hero unit */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              minHeight: "60vh",
              bgcolor: "#081A30",
              backgroundImage: `linear-gradient(180deg, rgba(8, 26, 48, 0.2), rgba(8, 26, 48, 1)) ,url(${Title})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "none",
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                className="fade-in-slow"
                variant="h2"
                align="center"
                style={
                  window.innerWidth < 600
                    ? {
                        fontFamily: "Montserrat, sans-serif",
                        color: "#5cc9cc",
                        fontSize: "3em",
                      }
                    : {
                        fontFamily: "Montserrat, sans-serif",
                        color: "#5cc9cc",
                      }
                }
                gutterBottom
              >
                Watchlist
              </Typography>
            </Container>
          </Box>
          <Container
            sx={{
              py: 8,
              bgcolor: "rgb(2, 26, 48)",
              display: "flex",
              justifyContent: "center",
            }}
            style={{ maxWidth: "100vw" }}
          >
            {/* End hero unit */}

            <Grid
              container
              spacing={4}
              style={
                window.innerWidth > 1200
                  ? { maxWidth: "80vw" }
                  : { maxWidth: "100vw" }
              }
              className="fade-in-slow"
            >
              {watchlist.watchlist.length === 0 ? (
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
                  Please Add some stocks to watchlist
                </main>
              ) : (
                watchlist.watchlist.map((card, index) => (
                  <Grid item key={index} xs={12} sm={6}>
                    <Card
                      sx={
                        card.notify
                          ? !card.sell
                            ? {
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                borderRadius: "1em",
                                padding: "2%",
                                backgroundImage: `url(${Profit})`,
                                backgroundPositionX: "right",
                                backgroundPositionY: "top",
                                backgroundSize: "cover",
                                cursor: "pointer",
                              }
                            : {
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                borderRadius: "1em",
                                padding: "2%",
                                backgroundImage: `url(${Loss})`,
                                backgroundPositionX: "right",
                                backgroundPositionY: "top",
                                backgroundSize: "cover",
                                cursor: "pointer",
                              }
                          : {
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                              borderRadius: "1em",
                              padding: "2%",
                              backgroundImage: `url(${Hold})`,
                              backgroundPositionX: "right",
                              backgroundPositionY: "top",
                              backgroundSize: "cover",
                              cursor: "pointer",
                            }
                      }
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                          style={
                            card.notify
                              ? {
                                  fontFamily: "Montserrat, sans-serif",
                                  fontWeight: "600",
                                  WebkitTextStroke: "1px rgb(0, 0, 0, 0.7)",
                                }
                              : {
                                  fontFamily: "Montserrat, sans-serif",
                                  fontWeight: "600",
                                }
                          }
                        >
                          Company Name {`${card.CompanyName}`}
                        </Typography>
                        <Typography
                          style={
                            card.notify
                              ? {
                                  fontFamily: "Montserrat, sans-serif",
                                  fontWeight: "600",
                                  WebkitTextStroke: "1px rgb(0, 0, 0, 0.7)",
                                }
                              : {
                                  fontFamily: "Montserrat, sans-serif",
                                  fontWeight: "600",
                                }
                          }
                        >
                          Current Price: {`${card.current}`}
                        </Typography>
                        <Typography
                          style={
                            card.notify
                              ? {
                                  fontFamily: "Montserrat, sans-serif",
                                  fontWeight: "600",
                                  WebkitTextStroke: "1px rgb(0, 0, 0, 0.7)",
                                }
                              : {
                                  fontFamily: "Montserrat, sans-serif",
                                  fontWeight: "600",
                                }
                          }
                        >
                          Delta: {`${card.delta}`}
                        </Typography>
                        <Typography
                          style={
                            card.notify
                              ? {
                                  fontFamily: "Montserrat, sans-serif",
                                  fontWeight: "600",
                                  WebkitTextStroke: "1px rgb(0, 0, 0, 0.7)",
                                }
                              : {
                                  fontFamily: "Montserrat, sans-serif",
                                  fontWeight: "600",
                                }
                          }
                        >
                          RSI: {`${card.rsi}`}
                        </Typography>
                        <Typography
                          style={
                            card.notify
                              ? {
                                  fontFamily: "Montserrat, sans-serif",
                                  fontWeight: "600",
                                  WebkitTextStroke: "1px rgb(0, 0, 0, 0.7)",
                                }
                              : {
                                  fontFamily: "Montserrat, sans-serif",
                                  fontWeight: "600",
                                }
                          }
                        >
                          Our Suggestion:{" "}
                          {card.notify ? (card.sell ? "Sell" : "Buy") : "Hold"}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          variant="contained"
                          style={{ padding: "2.5%", borderRadius: "1em" }}
                          onClick={() => history.push(`/stock/${card.share_n}`)}
                        >
                          <p style={{ margin: "0", fontWeight: "600" }}>
                            Detailed Report
                          </p>
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          color="secondary"
                          style={{
                            padding: "2.5%",
                            borderRadius: "1em",
                          }}
                          onClick={() => handleDelete(card)}
                        >
                          <p style={{ margin: "0", fontWeight: "600" }}>
                            Delete Stock
                          </p>
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
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
