import React, { useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../../components/Navbar";
import Avatar from "@mui/material/Avatar";
import Head from "../../assets/landing/Landing-Title.jpg";
import Head_2 from "../../assets/landing/Landing-Title-2.jpg";
import Divider from "@mui/material/Divider";
import Bacefook from "../../assets/landing/Bacefook.png";
import AutoDoc from "../../assets/landing/Autodoc.png";
import CardBG from "../../assets/landing/drawing.svg";
import { useHistory } from "react-router-dom";
import Copyright from "../../components/Footer/";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { displayRazorpay } from "./razor";

const tiers = [
  {
    title: "Basic",
    price: 125,
    description: [
      "5 Stocks Monitored",
      "Access to Spyke Detector",
      "No Access to Newsletter",
      "No Access to expert Analysis by Market Analyst",
    ],
    buttonText: "Start Now",
    buttonVariant: "contained",
  },
  {
    title: "Premium",
    subheader: "Most popular",
    price: 625,
    description: [
      "20 Stocks Monitored",
      "Access to Spyke Detector",
      "Access to Newsletter",
      "No Access to expert Analysis by Market Analyst",
    ],
    buttonText: "Start Now",
    buttonVariant: "contained",
  },
  {
    title: "Elite",
    price: 1250,
    description: [
      "50 Stocks Monitored",
      "Access to Spyke Detector",
      "Access to Newsletter",
      "Access to expert Analysis by Market Analyst",
    ],
    buttonText: "Start Now",
    buttonVariant: "contained",
  },
];

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#5cc9cc" },
  },
});

export default function LandingPage() {
  const priceRef = useRef(null);
  document.title = "SPYKE";
  const history = useHistory();
  const user = useSelector((state) => state.auth);

  const handleClick = (tier) => {
    if (!user.email) {
      toast.error("Please login first");
    } else {
      displayRazorpay(user, tier);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed">
        <Navbar />
      </AppBar>
      <main style={{ maxWidth: "100vw", overflowX: "hidden" }}>
        {/* Hero unit */}
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{
            pt: 8,
            pb: 6,
          }}
          style={
            window.innerWidth < 1200
              ? {
                backgroundImage: `linear-gradient(0deg,rgba(8, 26, 48, 1), rgba(8, 26, 48, 0.80)), url(${Head})`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: "cover",
                maxWidth: "100vw",
                marginLeft: "0",
                marginRight: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                minHeight: "95vh",
              }
              : {
                backgroundImage: `linear-gradient(0deg,rgba(8, 26, 48, 1), rgba(8, 26, 48, 0.80)), url(${Head})`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: "cover",
                maxWidth: "100vw",
                marginLeft: "0",
                marginRight: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                minHeight: "105vh",
              }
          }
        >
          <Grid item xs={12} md={6}>
            <Container style={{ maxWidth: "100vw" }}>
              <h1
                style={{ fontWeight: "450", fontSize: "3em", color: "#5CC9CC" }}
              >
                SPYKE
              </h1>
              <p style={{ color: "white", fontSize: "1.5em" }}>
                The Perfect{" "}
                <span style={{ color: "#5CC9CC", fontWeight: "700" }}>
                  Stock Market Tool
                </span>{" "}
                to Time your{" "}
                <span style={{ color: "#5CC9CC", fontWeight: "700" }}>
                  Entry
                </span>{" "}
                and
                <span style={{ color: "#5CC9CC", fontWeight: "700" }}>
                  {" "}
                  Exit
                </span>{" "}
                from the market to make the most{" "}
                <span style={{ color: "#5CC9CC", fontWeight: "700" }}>
                  Profitable Trade
                </span>
                .
              </p>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent={
                  window.innerWidth < 960 ? "center" : "flex-start"
                }
              >
                <Button
                  variant="contained"
                  style={{
                    fontWeight: "600",
                    fontFamily: "Montserrat, sans-serif",
                    borderRadius: "1em",
                  }}
                  onClick={() => {
                    user.email === undefined
                      ? history.push("/sign-up")
                      : history.push("/home");
                  }}
                >
                  {user.email === undefined ? (
                    <p>Sign Up For Free</p>
                  ) : (
                    <p>Your Portfolio</p>
                  )}
                </Button>
                <Button
                  variant="outlined"
                  style={{
                    fontWeight: "600",
                    borderRadius: "1em",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                  onClick={() => {
                    priceRef.current.scrollIntoView({
                      behavior: "smooth",
                      block: "end",
                      inline: "nearest",
                    });
                  }}
                >
                  View Price Plans
                </Button>
              </Stack>
            </Container>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{
            pt: "2%",
            pb: "6%",
          }}
          style={{
            backgroundImage: `linear-gradient(rgb(8, 26, 48), #001E3C)`,
            backgroundRepeat: `no-repeat`,
            backgroundSize: "cover",
            maxWidth: "100vw",
            marginLeft: "0",
            marginRight: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            minHeight: "25vh",
          }}
        >
          <Grid item xs={12} align="center">
            <Divider style={{ backgroundColor: "#5cc9cc", width: "75%" }} />
          </Grid>
          <Grid item xs={12} align="center" style={{ padding: "2% 0" }}>
            <h1
              style={{ fontWeight: "400", fontSize: "3em", color: "#5CC9CC" }}
            >
              Our High Networth Customers
            </h1>
          </Grid>
          <Grid
            container
            alignItems="center"
            justifyContent="space-around"
            item
            xs={12}
            align="center"
            style={{ padding: "2% 0" }}
          >
            <Grid
              xs={3}
              container
              alignItems="center"
              justifyContent="center"
              item
            >
              <Grid item xs={12} align="center">
                <Avatar
                  alt="Bacefook"
                  src={Bacefook}
                  style={{ height: "5em", width: "5em" }}
                />
              </Grid>
              <Grid item xs={12} align="center">
                <h1
                  style={{
                    fontWeight: "500",
                    fontSize: "1.2em",
                    color: "#fff",
                  }}
                >
                  Bacefook.Inc
                </h1>
              </Grid>
            </Grid>
            <Grid
              xs={3}
              container
              alignItems="center"
              justifyContent="center"
              item
            >
              <Grid item xs={12} align="center">
                <Avatar
                  alt="Autodoc"
                  src={AutoDoc}
                  style={{ height: "5em", width: "5em" }}
                />
              </Grid>
              <Grid item xs={12} align="center">
                <h1
                  style={{
                    fontWeight: "500",
                    fontSize: "1.2em",
                    color: "#fff",
                  }}
                >
                  Autodoc
                </h1>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="flex-end"
          sx={{
            pt: "2%",
            pb: "2%",
          }}
          style={{
            backgroundColor: `#0A1929`,
            backgroundImage: `linear-gradient(0deg,rgba(10, 25, 41, 1), rgba(10, 25, 41, 0.90)), url(${Head_2})`,
            backgroundRepeat: `no-repeat`,
            backgroundPosition: "bottom",
            backgroundSize: "cover",

            maxWidth: "100vw",
            marginLeft: "0",
            marginRight: "0",

            borderTop: "1px solid #5cc9cc",
            minHeight: "70vh",
          }}
        >
          <Grid
            item
            container
            spacing={0}
            alignItems="center"
            justifyContent="flex-end"
            xs={12}
            md={8}
            align={window.innerWidth < 900 ? "center" : "right"}
            style={
              window.innerWidth < 900
                ? {
                  padding: "2% 4%",
                  minHeight: "100vh",
                }
                : {
                  paddingRight: "10%",
                  minHeight: "45vh",
                }
            }
            sx={{
              pt: 6,
              pb: 6,
            }}
          >
            <Grid item xs={12} md={12}>
              <h1
                style={{
                  fontWeight: "450",
                  fontSize: "3em",

                  color: "#5CC9CC",
                  paddingBottom: "5%",
                }}
              >
                How It Works?
              </h1>
              <p style={{ color: "white", fontSize: "1.5em" }}>
                The{" "}
                <span style={{ color: "#5CC9CC", fontWeight: "700" }}>
                  SPYKE
                </span>{" "}
                predictor systems is based on the{" "}
                <span style={{ color: "#5CC9CC", fontWeight: "700" }}>RSI</span>{" "}
                indicator Model and{" "}
                <span style={{ color: "#5CC9CC", fontWeight: "700" }}>
                  Trained extensively
                </span>{" "}
                with multiple Data-Sets.
              </p>
              <br />
              <br />
              <p style={{ color: "white", fontSize: "1.5em" }}>
                We have an{" "}
                <span style={{ color: "#5CC9CC", fontWeight: "700" }}>
                  Estimated 88.8% Success rate
                </span>{" "}
                with all Trades we have performed using the{" "}
                <span style={{ color: "#5CC9CC", fontWeight: "700" }}>
                  SPYKE predictor
                </span>{" "}
                algorithm
              </p>
            </Grid>
          </Grid>
          <Grid item xs={12} align="center" style={{ padding: "0" }}>
            <Divider
              style={
                window.innerWidth < 900
                  ? { backgroundColor: "#5cc9cc", width: "75%" }
                  : { backgroundColor: "#5cc9cc", width: "75%" }
              }
            />
          </Grid>
          <Grid
            item
            xs={12}
            container
            ref={priceRef}
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{
              pb: "2%",
            }}
            style={{
              backgroundColor: `transparent`,
              backgroundRepeat: `no-repeat`,
              backgroundSize: "cover",
              maxWidth: "100vw",
              marginLeft: "0",
              marginRight: "0",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              minHeight: "50vh",
            }}
          >
            <Grid item xs={12} align="center" style={{ padding: "0 0 2% 0" }}>
              <h1
                style={{
                  fontWeight: "450",
                  fontSize: "3em",
                  color: "#5CC9CC",
                  marginTop: "3%",
                }}
              >
                Pricing
              </h1>
            </Grid>
            <Grid item xs={12} align="center">
              <Grid
                container
                spacing={4}
                alignItems="center"
                justifyContent="center"
                style={
                  window.innerWidth < 960
                    ? { maxWidth: "90vw" }
                    : { maxWidth: "80vw" }
                }
              >
                {tiers?.map((tier, index) => {
                  return (
                    <Grid
                      style={{ padding: "0" }}
                      item
                      xs={12}
                      md={4}
                      key={index}
                    >
                      <Card
                        className="price-cards"
                        style={{
                          borderRadius: "1em",
                          backgroundImage: `url(${CardBG})`,
                          backgroundSize: "cover",
                          backgroundPositionX: "center",
                          height: "100%",
                          width: "93%",
                          margin: "2%",
                        }}
                      >
                        <CardHeader
                          title={tier.title}
                          subheader={tier.subheader}
                          titleTypographyProps={{
                            align: "center",
                            fontFamily: "Montserrat, sans-serif",
                            color: "white",
                          }}
                          subheaderTypographyProps={{
                            align: "center",
                            fontFamily: "Montserrat, sans-serif",
                            color: "#ccc",
                          }}
                          style={{
                            backgroundColor: "rgba(0, 0, 0, 0.4)",
                          }}
                        />
                        <CardContent>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "baseline",
                              mb: 2,
                            }}
                          >
                            <Typography
                              component="h2"
                              variant="h3"
                              style={{
                                fontFamily: "Montserrat, sans-serif",
                                color: "#5cc9cc",
                                fontWeight: "500",
                              }}
                            >
                              ₹{tier.price.toLocaleString("en-IN")}
                            </Typography>
                            <Typography
                              variant="h6"
                              style={{
                                fontFamily: "Montserrat, sans-serif",
                                color: "#5cc9cc",
                              }}
                            >
                              /mo
                            </Typography>
                          </Box>
                          <Typography
                            style={{
                              fontFamily: "Montserrat, sans-serif",
                              color: "#5cc9cc",
                            }}
                          >
                            *Billed yearly
                          </Typography>
                          <ul style={{ margin: "0", padding: "1%" }}>
                            {tier.description.map((line) => (
                              <Typography
                                component="li"
                                variant="subtitle1"
                                align="center"
                                key={line}
                                style={{
                                  listStyleType: "none",
                                  fontFamily: "Montserrat, sans-serif",
                                  color: "white",
                                }}
                              >
                                {line}
                                <br />
                              </Typography>
                            ))}
                          </ul>
                        </CardContent>
                        <CardActions>
                          <Button
                            fullWidth
                            variant={tier.buttonVariant}
                            style={{
                              margin: "2%",
                              borderRadius: "1em",
                              padding: "3%",
                              fontFamily: "Montserrat, sans-serif",
                              fontWeight: "600",
                            }}
                            onClick={() => {
                              handleClick(tier);
                            }}
                          >
                            {tier.buttonText}
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
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
