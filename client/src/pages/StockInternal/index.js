import React, { useEffect, useState } from "react";
import {
  AppBar,
  CssBaseline,
  Grid,
  Box,
  Typography,
  Container,
  Divider,
  Button,
  Skeleton,
  Paper,
} from "@mui/material";
import { XAxis, YAxis, Tooltip, AreaChart, Area } from "recharts";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../../components/NavbarIn";
import Copyright from "../../components/Footer";
import Grow from "../../assets/home/growth.svg";
import Masonry from "@mui/lab/Masonry";
import MasonryItem from "@mui/lab/MasonryItem";
import Fall from "../../assets/home/fall.svg";
import Home from "../../assets/stock-internal/stock.jpg";
import { getGraphData, liveStock } from "../../actions/authroutes";
import { useParams, useHistory } from "react-router-dom";
import ReactLoading from "react-loading";
import { stocks } from "../../assets/stocks/ticker.js";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import paper from "../../assets/news/drawing.svg";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#5cc9cc" },
  },
});

export default function Album() {
  const chartWidth =
    window.innerWidth < 900
      ? window.innerWidth * 0.99
      : window.innerWidth * 0.58;
  const chartHeight =
    window.innerWidth < 900
      ? window.innerWidth * 0.99 * 0.7
      : window.innerWidth * 0.58 * 0.48;
  const [activeButton, setActiveButton] = useState("1d");
  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            color: "#5cc9cc",
            backgroundColor: "rgba(8,26,48, 0.9)",
            borderRadius: "1em",
            border: "1px solid #5cc9cc",
            padding: "1% 7%",
            width: "max-content",
            fontWeight: "600",
          }}
        >
          <p className="label">
            {day2[new Date(payload[0].payload.timestamp).getDay()] +
              ", " +
              new Date(payload[0].payload.timestamp).getDate() +
              " " +
              month[
                new Date(payload[0].payload.timestamp).getMonth()
              ].toString() +
              " "}
            {`${new Date(payload[0].payload.timestamp).toLocaleTimeString()}`}
          </p>
          <p className="label">
            ₹ {(Math.round(payload[0].value * 100) / 100).toFixed(2)}
          </p>
        </div>
      );
    }

    return null;
  };
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const history = useHistory();
  const [data, setData] = useState({
    quote: {},
    histdata: [],
    live: "",
    name: "",
    news: [],
  });

  useEffect(() => {
    const getdata = async () => {
      const data = await getGraphData(
        { days: activeButton, ticker: params.ticker },
        history,
        () => setLoading(false)
      );
      setData((prev) => {
        return {
          ...prev,
          quote: data.quote,
          histdata: data.histdata,
          live: data.live.current,
          name: stocks.find((item) => item.Ticker === data.live.ticker)
            .CompanyName,
          news: data.news,
        };
      });
    };
    getdata();
    return () => {
      setData({
        quote: {},
        histdata: [],
        live: "",
        name: "",
        news: [],
      });
    };
  }, [params, history, activeButton, setData, setLoading]);

  const day2 = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const data = await liveStock(params.ticker);
      setData((prev) => {
        return { ...prev, live: data };
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, [params]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed">
        <Navbar page={10} />
      </AppBar>
      {loading ? (
        <main
          style={{
            Height: "100%",
            minHeight: "90vh",
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
        <main
          style={{
            maxWidth: "100vw",
            overflowX: "hidden",
            minHeight: "90vh",
            backgroundColor: "rgb(8, 26, 48)",
          }}
        >
          {/* Hero unit */}
          <Box
            sx={{
              backgroundImage: `linear-gradient(0deg,rgba(8, 26, 48, 1), rgba(8, 26, 48, 0.5)), url(${Home})`,
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
                      minHeight: "20vh",
                      maxWidth: "100vw",
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "flex-end",
                      border: "none",
                    }
                  : {
                      marginTop: "0",
                      minHeight: "20vh",
                      maxWidth: "100vw",
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "flex-end",
                      width: "100vw",
                      border: "none",
                    }
              }
            >
              <Grid container alignItems="center" style={{ width: "100%" }}>
                <Grid item xs={10} md={8}>
                  <Typography
                    component="h1"
                    variant="h2"
                    style={
                      window.innerWidth < 600
                        ? data.live - data.quote.Open < 0
                          ? {
                              fontFamily: "Montserrat, sans-serif",
                              color: "#ff67acd4",
                              fontWeight: "450",
                              fontSize: "2em",
                              margin: "1% 0",
                            }
                          : {
                              fontFamily: "Montserrat, sans-serif",
                              color: "#55ff99ff",
                              fontWeight: "400",
                              fontSize: "2em",
                              margin: "1% 0",
                            }
                        : data.live - data.quote.Open < 0
                        ? {
                            fontFamily: "Montserrat, sans-serif",
                            color: "#ff67acd4",
                            fontWeight: "450",

                            margin: "1% 0",
                          }
                        : {
                            fontFamily: "Montserrat, sans-serif",
                            color: "#55ff99ff",
                            fontWeight: "400",

                            margin: "1% 0",
                          }
                    }
                    className="fade-in-slow"
                    gutterBottom
                  >
                    {data?.name}
                  </Typography>
                </Grid>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  item
                  xs={2}
                  md={4}
                >
                  {data.live - data.quote.Open < 0 ? (
                    <object
                      type="image/svg+xml"
                      data={Fall}
                      style={
                        window.innerWidth < 600
                          ? {
                              height: "2.8em",
                              width: "2.8em",
                            }
                          : {
                              height: "5em",
                              width: "5em",
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
                              height: "2.8em",
                              width: "2.8em",
                            }
                          : {
                              height: "5.0em",
                              width: "5.0em",
                            }
                      }
                    >
                      <img src={Grow} alt="Grow Symbol" />
                    </object>
                  )}
                </Grid>
              </Grid>
            </Container>
          </Box>
          <Container
            sx={{ py: 8 }}
            style={{ maxWidth: "100vw", backgroundColor: "rgb(8, 26, 48)" }}
          >
            {/* End hero unit */}
            <Grid container spacing={8}>
              <Grid
                item
                container
                alignItems="center"
                xs={12}
                md={7}
                align={window.innerWidth < 900 ? "left" : "left"}
              >
                <Grid item xs={12}>
                  <AreaChart
                    width={chartWidth}
                    height={chartHeight}
                    data={data.histdata}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#ff67ac"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#ff67ac"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#82ca9d"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="100%"
                          stopColor="#82ca9d"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      tick={false}
                      tickLine={false}
                      stroke="#5cc9cc"
                      dataKey={data.histdata.timestamp}
                    />
                    <YAxis domain={["auto", "auto"]} stroke="#5cc9cc" />

                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="close"
                      stroke={
                        data.live - data.quote.Open < 0 ? "#ff67ac" : "#82ca9d"
                      }
                      fillOpacity={1}
                      fill={
                        data.live - data.quote.Open < 0
                          ? "url(#colorUv)"
                          : "url(#colorPv)"
                      }
                    />
                  </AreaChart>
                </Grid>
                <Grid
                  item
                  container
                  justifyContent="center"
                  xs={12}
                  spacing={2}
                  align={window.innerWidth < 900 ? "center" : "right"}
                >
                  <Grid item xs={4} md={2} style={{ margin: "3% 1%" }}>
                    <Button
                      onClick={() => {
                        if (activeButton !== "1d") {
                          setLoading(true);
                          setActiveButton("1d");
                        }
                      }}
                      variant={activeButton === "1d" ? "contained" : "outlined"}
                      fullWidth
                      style={{
                        margin: "2%",
                        borderRadius: "1em",
                        padding: "7% 3%",
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: "600",
                      }}
                    >
                      {window.innerWidth < 1100 ? "1 D" : "1 Day"}
                    </Button>
                  </Grid>
                  <Grid item xs={4} md={2} style={{ margin: "3% 1%" }}>
                    <Button
                      onClick={() => {
                        if (activeButton !== "7d") {
                          setLoading(true);
                          setActiveButton("7d");
                        }
                      }}
                      variant={activeButton === "7d" ? "contained" : "outlined"}
                      fullWidth
                      style={{
                        margin: "2%",
                        borderRadius: "1em",
                        padding: "7% 3%",
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: "600",
                      }}
                    >
                      {window.innerWidth < 1100 ? "1 Wk" : "1 Week"}
                    </Button>
                  </Grid>
                  <Grid item xs={4} md={2} style={{ margin: "3% 1%" }}>
                    <Button
                      onClick={() => {
                        if (activeButton !== "1m") {
                          setLoading(true);
                          setActiveButton("1m");
                        }
                      }}
                      variant={activeButton === "1m" ? "contained" : "outlined"}
                      fullWidth
                      style={{
                        margin: "2%",
                        borderRadius: "1em",
                        padding: "7% 3%",
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: "600",
                      }}
                    >
                      {window.innerWidth < 1100 ? "1 M" : "1 Month"}
                    </Button>
                  </Grid>
                  <Grid item xs={4} md={2} style={{ margin: "3% 1%" }}>
                    <Button
                      onClick={() => {
                        if (activeButton !== "6m") {
                          setLoading(true);
                          setActiveButton("6m");
                        }
                      }}
                      variant={activeButton === "6m" ? "contained" : "outlined"}
                      fullWidth
                      style={{
                        margin: "2%",
                        borderRadius: "1em",
                        padding: "7% 3%",
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: "600",
                      }}
                    >
                      {window.innerWidth < 1100 ? "6 M" : "6 Month"}
                    </Button>
                  </Grid>
                  <Grid item xs={4} md={2} style={{ margin: "3% 1%" }}>
                    <Button
                      onClick={() => {
                        if (activeButton !== "1y") {
                          setLoading(true);
                          setActiveButton("1y");
                        }
                      }}
                      variant={activeButton === "1y" ? "contained" : "outlined"}
                      fullWidth
                      style={{
                        margin: "2%",
                        borderRadius: "1em",
                        padding: "7% 3%",
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: "600",
                      }}
                    >
                      {window.innerWidth < 1100 ? "1 Yr" : "1 Year"}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container item xs={12} md={5}>
                <Grid item xs={12}>
                  <span>
                    <h1
                      style={
                        window.innerWidth < 600
                          ? data.live - data.quote.Open < 0
                            ? {
                                fontFamily: "Montserrat, sans-serif",
                                color: "#ff67acd4",
                                fontWeight: "450",
                                fontSize: "2em",
                                margin: "1% 0",
                              }
                            : {
                                fontFamily: "Montserrat, sans-serif",
                                color: "#55ff99ff",
                                fontWeight: "400",
                                fontSize: "2em",
                                margin: "1% 0",
                              }
                          : data.live - data.quote.Open < 0
                          ? {
                              fontFamily: "Montserrat, sans-serif",
                              color: "#ff67acd4",
                              fontWeight: "450",
                              fontSize: "3em",
                              margin: "1% 0",
                            }
                          : {
                              fontFamily: "Montserrat, sans-serif",
                              color: "#55ff99ff",
                              fontWeight: "400",
                              fontSize: "3em",
                              margin: "1% 0",
                            }
                      }
                    >
                      ₹ {data.live}
                    </h1>
                  </span>
                  <Divider
                    style={{ backgroundColor: "#5cc9cc", width: "60%" }}
                  />
                  <h4
                    style={{
                      color: "#5cc9cc",
                      fontWeight: "400",
                      margin: "2% 0",
                    }}
                  >
                    52 Week Range: ₹ {data.quote["52 Week Range"]}
                  </h4>

                  <h4
                    style={{
                      color: "#5cc9cc",
                      fontWeight: "400",
                      margin: "2% 0",
                    }}
                  >
                    Average Volume: {data.quote["Avg. Volume"]}
                  </h4>

                  <h4
                    style={{
                      color: "#5cc9cc",
                      fontWeight: "400",
                      margin: "2% 0",
                    }}
                  >
                    Day's Range: {data.quote["Day's Range"]}
                  </h4>

                  <h4
                    style={{
                      color: "#5cc9cc",
                      fontWeight: "400",
                      margin: "2% 0",
                    }}
                  >
                    Market Cap: {data.quote["Market Cap"]}
                  </h4>

                  <h4
                    style={{
                      color: "#5cc9cc",
                      fontWeight: "400",
                      margin: "2% 0",
                    }}
                  >
                    Open: {data.quote["Open"]}
                  </h4>

                  <h4
                    style={{
                      color: "#5cc9cc",
                      fontWeight: "400",
                      margin: "2% 0",
                    }}
                  >
                    Previous Close: {data.quote["Previous Close"]}
                  </h4>

                  <h4
                    style={{
                      color: "#5cc9cc",
                      fontWeight: "400",
                      margin: "2% 0",
                    }}
                  >
                    Quote Price: {data.quote["Quote Price"]}
                  </h4>

                  <h4
                    style={{
                      color: "#5cc9cc",
                      fontWeight: "400",
                      margin: "2% 0",
                    }}
                  >
                    Volume: {data.quote["Volume"]}
                  </h4>
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={12}>
                  <Container
                    sx={{ py: 8 }}
                    style={{
                      maxWidth: "100vw",
                      backgroundColor: "rgb(8, 26, 48)",
                    }}
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
                        {data.news.map((news, index) => (
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
                                {loading ? (
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
                        {data.news.map((news, index) => (
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
                                {loading ? (
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
                              {loading && (
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
                </Grid>
              </Grid>
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
