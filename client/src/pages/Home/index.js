import React, { useState, useEffect } from "react";
import {
  AppBar,
  Paper,
  CssBaseline,
  Grid,
  Box,
  Typography,
  Container,
  Modal,
  Fade,
  Button,
  Divider,
  Skeleton,
  Backdrop,
  TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../../components/NavbarIn";
import Home from "../../assets/home/Home.jpeg";
import Profit from "../../assets/home/profit.svg";
import Grow from "../../assets/home/growth.svg";
import noStock from "../../assets/home/noStock.svg";
import Fall from "../../assets/home/fall.svg";
import Loss from "../../assets/home/loss.svg";
import ModalBG from "../../assets/home/ModalBG.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useHistory } from "react-router";
import Copyright from "../../components/Footer/";
import { updateProfile, getProfile } from "../../actions/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";
import { getMarketMovers, getHomeData } from "../../actions/authroutes";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#5cc9cc" },
  },
});

const style =
  window.innerWidth < 900
    ? {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "85vw",
        borderRadius: "1em",
        boxShadow: 24,
        p: 4,
        outline: "none",
        backgroundColor: "#000428",
        backgroundImage: `url(${ModalBG})`,
        backgroundSize: "cover",
        backgroundPositionX: "right",
        backgroundPOsitionY: "center",
        textAlign: "center",
      }
    : {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "55vw",
        borderRadius: "1em",
        boxShadow: 24,
        p: 5,
        outline: "none",
        backgroundColor: "#000428",
        backgroundImage: `url(${ModalBG})`,
        backgroundSize: "cover",
        backgroundPositionX: "right",
        backgroundPOsitionY: "center",
        textAlign: "center",
      };

export default function HomePage() {
  document.title = "Home - SPYKE";
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  const user = useSelector((state) => state.auth);
  const marketmovers = useSelector((state) => state.marketmovers);
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
  });
  const [loading, setLoading] = useState(true);
  const [loadhome, setLoadHome] = useState(true);

  var settings = loading
    ? window.innerWidth < 750
      ? {
          dots: false,
          arrows: false,
          infinite: true,
          slidesToShow: 2,
        }
      : window.innerWidth < 900
      ? {
          dots: false,
          arrows: false,
          infinite: true,
          slidesToShow: 3,
        }
      : {
          dots: false,
          arrows: false,
          infinite: true,
          slidesToShow: 5,
        }
    : window.innerWidth < 750
    ? {
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3500,
        slidesToShow: 2,
      }
    : window.innerWidth < 900
    ? {
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3500,
        slidesToShow: 3,
      }
    : {
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3500,
        slidesToShow: 5,
      };

  const [best, setBest] = useState([]);
  const [worst, setWorst] = useState([]);
  const history = useHistory();
  const handleChange = (event) => {
    setState((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  useEffect(() => {
    if (user.stocks.length !== 0 && !loading) {
      const getdata = async () => {
        const data = await dispatch(
          getHomeData(history, () => setLoadHome(false))
        );
        setWorst(data.worst);
        setBest(data.best);
      };
      getdata();
    } else if (user.stocks.length === 0 && !loading) {
      setLoadHome(false);
    }
  }, [history, user, loading, dispatch]);

  const handleSubmit = () => {
    if (state.first_name.trim() === "") {
      toast.error("Please enter first name");
    } else if (state.last_name.trim() === "") {
      toast.error("Please enter last name");
    } else if (state.phone_number.trim() === "" || isNaN(state.phone_number)) {
      toast.error("Please enter correct phone number");
    } else {
      setLoading(true);
      dispatch(
        updateProfile(
          {
            name: `${state.first_name.trim()} ${state.last_name.trim()}`,
            mobile: state.phone_number.trim(),
          },
          () => {
            setLoading(false);
          },
          history
        )
      );
    }
  };

  useEffect(() => {
    dispatch(getProfile(() => setLoading(false), history));
  }, [dispatch, history]);

  useEffect(() => {
    if (marketmovers.loading) {
      dispatch(getMarketMovers(history));
    }
  }, [marketmovers, dispatch, history]);

  useEffect(() => {
    if (user.mobile !== undefined) {
      setOpen(false);
    }
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed">
        <Navbar page={0} />
      </AppBar>
      {loading || loadhome ? (
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
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <Typography
                  id="transition-modal-title"
                  variant="h4"
                  align="center"
                  component="h2"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    marginBottom: "5%",
                    fontWeight: "450",
                    color: "#5cc9cc",
                  }}
                >
                  Complete Your Profile
                </Typography>
                <TextField
                  style={
                    window.innerWidth < 600
                      ? { width: "100%", marginBottom: "5%" }
                      : { width: "49%", marginBottom: "2%", marginRight: "1%" }
                  }
                  label="First Name"
                  value={state.first_name}
                  name="first_name"
                  onChange={handleChange}
                />
                <TextField
                  style={
                    window.innerWidth < 600
                      ? { width: "100%", marginBottom: "5%" }
                      : { width: "49%", marginBottom: "2%", marginLeft: "1%" }
                  }
                  label="Last Name"
                  value={state.last_name}
                  name="last_name"
                  onChange={handleChange}
                />
                <TextField
                  style={{ width: "100%", marginBottom: "5%" }}
                  label="Phone Number"
                  value={state.phone_number}
                  name="phone_number"
                  onChange={handleChange}
                />
                <Button
                  variant="contained"
                  style={{
                    padding: "2%",
                    borderRadius: "1em",
                  }}
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  <p style={{ margin: "0", fontWeight: "650" }}>
                    Update Profile
                  </p>
                </Button>
              </Box>
            </Fade>
          </Modal>
          {/* Hero unit */}
          <Box
            sx={{
              pt: 8,
              pb: 0,
            }}
            style={{
              backgroundImage: `url(${Home})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "none",
              height: "max-content",
              border: "none",
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
                      width: "100vw",
                      backgroundImage: `linear-gradient(0deg,rgba(8, 26, 48, 1), rgba(8, 26, 48, 0))`,
                      backgroundPositionY: "center",
                      border: "none",
                    }
                  : {
                      marginTop: "0",
                      minHeight: "50vh",
                      maxWidth: "100vw",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-end",
                      width: "100vw",
                      backgroundImage: `linear-gradient(0deg,rgba(8, 26, 48, 1), rgba(8, 26, 48, 0))`,
                      backgroundPositionY: "center",
                      border: "none",
                    }
              }
            >
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
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
                Welcome Back {user.mobile ? `${user.name}` : "Trader"}!
                {/* Welcome Back {user.firstName} */}
              </Typography>
            </Container>

            <Container
              sx={{ mt: 0 }}
              style={{
                maxWidth: "100vw",
                backgroundColor: "rgb(8, 26, 48)",
                minWidth: "100vw",
                padding: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100vw",
              }}
            >
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                spacing="center"
                style={{ width: "90vw", paddingBottom: "5%" }}
              >
                <Grid item xs={12} align="center">
                  <h2
                    className="fade-in-slow"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      color: "#5cc9cc",
                      fontWeight: "400",
                    }}
                  >
                    Market Movers
                  </h2>
                </Grid>
                <Grid item xs={12} align="center">
                  <Divider
                    className="fade-in-slow"
                    style={
                      window.innerWidth < 600
                        ? {
                            backgroundColor: "#5cc9cc",
                            width: "40vw",
                            marginBottom: "3%",
                          }
                        : {
                            backgroundColor: "#5cc9cc",
                            width: "10vw",
                            marginBottom: "3%",
                          }
                    }
                  />
                </Grid>
                <Grid item xs={12} align="center">
                  <Slider {...settings} className="fade-in-slow">
                    {marketmovers.marketmovers.map((obj, index) => {
                      return (
                        <Grid container direction="row" key={index}>
                          <Grid
                            item
                            xs={12}
                            alignItems="center"
                            container
                            spacing={1}
                            style={{
                              width: "90%",
                              padding: "5% 0",
                            }}
                          >
                            <Grid item xs={3}>
                              {marketmovers.loading ? (
                                <Skeleton
                                  style={{
                                    width: "90%",
                                    height: "6em",
                                  }}
                                />
                              ) : obj.net_price < 0 ? (
                                <object
                                  type="image/svg+xml"
                                  data={Fall}
                                  style={
                                    window.innerWidth < 600
                                      ? {
                                          height: "1.4em",
                                          width: "1.4em",
                                        }
                                      : {
                                          height: "2.5em",
                                          width: "2.5em",
                                        }
                                  }
                                >
                                  <img src={Fall} alt="Fall Symbol" />
                                </object>
                              ) : (
                                <object
                                  type="image/svg+xml"
                                  data={Grow}
                                  style={
                                    window.innerWidth < 600
                                      ? {
                                          height: "1.4em",
                                          width: "1.4em",
                                        }
                                      : {
                                          height: "2.5em",
                                          width: "2.5em",
                                        }
                                  }
                                >
                                  <img src={Grow} alt="Grow Symbol" />
                                </object>
                              )}
                            </Grid>
                            <Grid item xs={9} container>
                              <Grid item xs={12} align="left">
                                {marketmovers.loading ? (
                                  <Skeleton
                                    style={{ width: "90%", height: "100%" }}
                                  />
                                ) : (
                                  <h1
                                    style={{
                                      fontFamily: "Montserrat, sans-serif",
                                      color: "#5cc9cc",
                                      fontWeight: "600",
                                      fontSize: "1.2em",
                                      margin: "1% 0",
                                    }}
                                  >
                                    {obj.symbol}
                                  </h1>
                                )}
                              </Grid>
                              <Grid item xs={12} align="left">
                                {marketmovers.loading ? (
                                  <Skeleton
                                    style={{ width: "90%", height: "100%" }}
                                  />
                                ) : (
                                  <h1
                                    style={
                                      obj.net_price < 0
                                        ? {
                                            fontFamily:
                                              "Montserrat, sans-serif",
                                            color: "#ff67acd4",
                                            fontWeight: "400",
                                            fontSize: "1em",
                                            margin: "1% 0",
                                          }
                                        : {
                                            fontFamily:
                                              "Montserrat, sans-serif",
                                            color: "#55ff99ff",
                                            fontWeight: "400",
                                            fontSize: "1em",
                                            margin: "1% 0",
                                          }
                                    }
                                  >
                                    {`Net price : ${obj.net_price}`}
                                  </h1>
                                )}
                              </Grid>
                              <Grid item xs={12} align="left">
                                {marketmovers.loading ? (
                                  <Skeleton
                                    style={{ width: "90%", height: "100%" }}
                                  />
                                ) : (
                                  <h1
                                    style={
                                      obj.net_price < 0
                                        ? {
                                            fontFamily:
                                              "Montserrat, sans-serif",
                                            color: "#ff67acd4",
                                            fontWeight: "400",
                                            fontSize: "1em",
                                            margin: "1% 0",
                                          }
                                        : {
                                            fontFamily:
                                              "Montserrat, sans-serif",
                                            color: "#55ff99ff",
                                            fontWeight: "400",
                                            fontSize: "1em",
                                            margin: "1% 0",
                                          }
                                    }
                                  >
                                    {`Open : ₹ ${obj.open_price}`}
                                  </h1>
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Slider>
                </Grid>

                {user.stocks.length === 0 ? (
                  <>
                    <Grid item xs={12} align="center">
                      <object
                        type="image/svg+xml"
                        data={noStock}
                        style={{ maxHeight: "40vh" }}
                      >
                        <img src={noStock} alt="nostock" />
                      </object>
                    </Grid>
                    <Grid item xs={12} align="center">
                      <h2
                        className="fade-in-slow"
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          color: "#5cc9cc",
                          fontWeight: "400",
                        }}
                      >
                        No Stocks Found in your Watchlist.
                      </h2>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={12} align="center">
                      {best.length !== 0 && (
                        <h2
                          className="fade-in-slow"
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            color: "#5cc9cc",
                            fontWeight: "400",
                          }}
                        >
                          Your Top Performers
                        </h2>
                      )}
                    </Grid>
                    <Grid item xs={12} align="center">
                      {best.length !== 0 && (
                        <Divider
                          className="fade-in-slow"
                          style={
                            window.innerWidth < 600
                              ? {
                                  backgroundColor: "#5cc9cc",
                                  width: "40vw",
                                  marginBottom: "3%",
                                }
                              : {
                                  backgroundColor: "#5cc9cc",
                                  width: "15vw",
                                  marginBottom: "3%",
                                }
                          }
                        />
                      )}
                    </Grid>
                    {best.map((obj, index) => {
                      return (
                        <Grid
                          item
                          key={index}
                          xs={12}
                          md={6}
                          container
                          alignItems="center"
                          justifyContent="center"
                          style={{ padding: "1%" }}
                        >
                          <Paper
                            className="fade-in-slow"
                            style={{
                              height: "max-content",
                              display: "flex",
                              alignItems: "center",
                              minHeight: "25vh",
                              minWidth: "95%",
                              maxWidth: "95%",
                              backgroundImage: `url(${Profit})`,
                              backgroundPositionX: "right",
                              backgroundPositionY: "top",
                              padding: "3.5% 3%",
                              backgroundSize: "cover",
                              borderRadius: "1.5em",
                            }}
                          >
                            <span style={{ minWidth: "70%" }}>
                              <Typography
                                variant="h4"
                                style={{
                                  minWidth: "70%",
                                  fontFamily: "Montserrat, sans-serif",
                                  textStroke: "1px #000",
                                  fontWeight: "600",
                                }}
                              >
                                {loading ? (
                                  <Skeleton
                                    style={{
                                      width: "70%",
                                      minWidth: "70%",
                                      height: "2em",
                                    }}
                                  />
                                ) : (
                                  `${obj.CompanyName}` //Add Company Name
                                )}
                              </Typography>
                              <Typography
                                variant="body1"
                                style={{
                                  minWidth: "70%",
                                  fontFamily: "Montserrat, sans-serif",
                                  textStroke: "1px #000",
                                  fontWeight: "400",
                                }}
                              >
                                {loading ? (
                                  <Skeleton
                                    style={{ width: "70%", height: "1em" }}
                                  />
                                ) : (
                                  `${obj.name}` //Add Ticker Name
                                )}
                              </Typography>
                              <Typography
                                variant="body1"
                                style={{
                                  minWidth: "70%",
                                  fontFamily: "Montserrat, sans-serif",
                                  textStroke: "1px #000",
                                  fontWeight: "400",
                                }}
                              >
                                {loading ? (
                                  <Skeleton
                                    style={{ width: "70%", height: "1em" }}
                                  />
                                ) : (
                                  `Open: ₹ ${obj.open}` //Add Open Price
                                )}
                              </Typography>
                              <Typography
                                variant="body1"
                                style={{
                                  minWidth: "70%",
                                  fontFamily: "Montserrat, sans-serif",
                                  textStroke: "1px #000",
                                  fontWeight: "400",
                                }}
                              >
                                {loading ? (
                                  <Skeleton
                                    style={{ width: "70%", height: "1em" }}
                                  />
                                ) : (
                                  `Current: ₹ ${obj.live}` //Add Current Price
                                )}
                              </Typography>
                              <Typography
                                variant="body1"
                                style={{
                                  minWidth: "70%",
                                  fontFamily: "Montserrat, sans-serif",
                                  textStroke: "1px #000",
                                  fontWeight: "400",
                                }}
                              >
                                {loading ? (
                                  <Skeleton
                                    style={{ width: "70%", height: "1em" }}
                                  />
                                ) : (
                                  `Gain: ${obj.gain} %` //Add Gain Percentage
                                )}
                              </Typography>
                            </span>
                          </Paper>
                        </Grid>
                      );
                    })}
                    <Grid item xs={12} align="center">
                      {worst.length !== 0 && (
                        <h2
                          className="fade-in-slow"
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            color: "#5cc9cc",
                            fontWeight: "400",
                          }}
                        >
                          Your Poor Performers
                        </h2>
                      )}
                    </Grid>
                    <Grid item xs={12} align="center">
                      {worst.length !== 0 && (
                        <Divider
                          className="fade-in-slow"
                          style={
                            window.innerWidth < 600
                              ? {
                                  backgroundColor: "#5cc9cc",
                                  width: "40vw",
                                  marginBottom: "3%",
                                }
                              : {
                                  backgroundColor: "#5cc9cc",
                                  width: "15vw",
                                  marginBottom: "3%",
                                }
                          }
                        />
                      )}
                    </Grid>
                    {worst.map((obj, index) => {
                      return (
                        <Grid
                          item
                          key={index}
                          xs={12}
                          md={6}
                          container
                          alignItems="center"
                          justifyContent="center"
                          style={{ padding: "1%" }}
                        >
                          <Paper
                            className="fade-in-slow"
                            style={{
                              height: "max-content",
                              display: "flex",
                              alignItems: "center",
                              minHeight: "25vh",
                              minWidth: "95%",
                              maxWidth: "95%",
                              backgroundImage: `url(${Loss})`,
                              backgroundPositionX: "right",
                              backgroundPositionY: "bottom",
                              padding: "3.5% 3%",
                              backgroundSize: "cover",
                              borderRadius: "1.5em",
                            }}
                          >
                            <span style={{ minWidth: "70%" }}>
                              <Typography
                                variant="h4"
                                style={{
                                  minWidth: "70%",
                                  fontFamily: "Montserrat, sans-serif",
                                  textStroke: "1px #000",
                                  fontWeight: "600",
                                }}
                              >
                                {loading ? (
                                  <Skeleton
                                    style={{
                                      width: "70%",
                                      minWidth: "70%",
                                      height: "2em",
                                    }}
                                  />
                                ) : (
                                  `${obj.CompanyName}` //Add Company Name
                                )}
                              </Typography>
                              <Typography
                                variant="body1"
                                style={{
                                  minWidth: "70%",
                                  fontFamily: "Montserrat, sans-serif",
                                  textStroke: "1px #000",
                                  fontWeight: "400",
                                }}
                              >
                                {loading ? (
                                  <Skeleton
                                    style={{ width: "70%", height: "1em" }}
                                  />
                                ) : (
                                  `${obj.name}` //Add Ticker Name
                                )}
                              </Typography>
                              <Typography
                                variant="body1"
                                style={{
                                  minWidth: "70%",
                                  fontFamily: "Montserrat, sans-serif",
                                  textStroke: "1px #000",
                                  fontWeight: "400",
                                }}
                              >
                                {loading ? (
                                  <Skeleton
                                    style={{ width: "70%", height: "1em" }}
                                  />
                                ) : (
                                  `Open: ₹ ${obj.open}` //Add Open Price
                                )}
                              </Typography>
                              <Typography
                                variant="body1"
                                style={{
                                  minWidth: "70%",
                                  fontFamily: "Montserrat, sans-serif",
                                  textStroke: "1px #000",
                                  fontWeight: "400",
                                }}
                              >
                                {loading ? (
                                  <Skeleton
                                    style={{ width: "70%", height: "1em" }}
                                  />
                                ) : (
                                  `Current: ₹ ${obj.live}` //Add Current Price
                                )}
                              </Typography>
                              <Typography
                                variant="body1"
                                style={{
                                  minWidth: "70%",
                                  fontFamily: "Montserrat, sans-serif",
                                  textStroke: "1px #000",
                                  fontWeight: "400",
                                }}
                              >
                                {loading ? (
                                  <Skeleton
                                    style={{ width: "70%", height: "1em" }}
                                  />
                                ) : (
                                  `Loss: ${obj.gain} %` //Add Loss Percentage
                                )}
                              </Typography>
                            </span>
                          </Paper>
                        </Grid>
                      );
                    })}
                  </>
                )}
                <Grid item xs={12} sx={{ pt: 4 }} align="center">
                  <Button
                    className="fade-in-slow"
                    variant="outlined"
                    style={{
                      fontWeight: "600",
                      fontFamily: "Montserrat, sans-serif",
                      borderRadius: "1em",
                    }}
                    onClick={() => {
                      user.stocks.length !== 0
                        ? history.push("/portfolio")
                        : history.push("/search");
                    }}
                  >
                    {user.stocks.length !== 0 ? (
                      <p>Visit Your Portfolio</p>
                    ) : (
                      <p>Find Stocks</p>
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Box>
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
