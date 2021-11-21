import React, { useState, useEffect } from "react";
import {
  IconButton,
  CssBaseline,
  Typography,
  Container,
  Tooltip,
  AppBar,
  Paper,
  Grid,
  Box,
  Modal,
  Fade,
  Button,
  Backdrop,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import { Add, ReadMore } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../../components/Footer/";
import { stocks } from "../../assets/stocks/ticker";
import Navbar from "../../components/NavbarIn/";
import Search from "../../assets/search/Search.jpeg";
import title from "../../assets/search/tile.svg";
import { getProfile, addStock } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";
import { useHistory } from "react-router-dom";

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
        // backgroundImage: `url(${ModalBG})`,
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
        // backgroundImage: `url(${ModalBG})`,
        backgroundSize: "cover",
        backgroundPositionX: "right",
        backgroundPOsitionY: "center",
        textAlign: "center",
      };

export default function Album() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(stocks);
  const history = useHistory();
  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);
  const user = useSelector((state) => state.auth);
  const [modaldata, setModalData] = useState({
    open: false,
    name: "",
    CompanyName: "",
    delta: "",
    assetClass: "",
  });
  const handleClose = () => {
    setModalData((prev) => {
      return {
        ...prev,
        open: false,
      };
    });
  };
  useEffect(() => {
    dispatch(
      getProfile(() => {
        setLoad(false);
      }, history)
    );
  }, [dispatch, history]);

  const handleChange = (event) => {
    setModalData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  useEffect(() => {
    if (search.length >= 3) {
      const results = [];
      stocks.filter((stock) => {
        if (
          stock.CompanyName.toLowerCase().includes(search.toLowerCase()) ||
          stock.Ticker.toLowerCase().includes(search.toLowerCase())
        ) {
          results.push(stock);
        }
        return stock;
      });
      setFilter(results);
    } else {
      setFilter(stocks);
    }
  }, [search]);

  const handleSubmit = () => {
    if (modaldata.delta.trim() === "" || isNaN(modaldata.delta)) {
      toast.error("Please provide correct delta");
    } else {
      setLoad(true);
      dispatch(
        addStock(
          {
            name: modaldata.name,
            CompanyName: modaldata.CompanyName,
            delta: parseInt(modaldata.delta),
            assetClass: modaldata.assetClass,
          },
          () => {
            setLoad(false);
          },
          () => {
            handleClose();
          },
          () => {
            setModalData({
              open: false,
              name: "",
              CompanyName: "",
              delta: "",
              assetClass: "",
            });
          },
          history
        )
      );
    }
  };

  const handleClick = (obj) => {
    if (user.stocks.length === user.max_stocks) {
      toast.error("Reached maximum watchlist limit");
    } else if (user.stocks.find((stock) => stock.name === obj.Ticker)) {
      toast.error("This stock already exists in your watchlist");
    } else {
      setModalData((prev) => {
        return {
          ...prev,
          open: true,
          name: obj.Ticker,
          CompanyName: obj.CompanyName,
          assetClass: obj.assetClass,
        };
      });
    }
  };
  document.title = "Search - SPYKE";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed">
        <Navbar page={1} />
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
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            backgroundColor: "rgb(8,26,48)",
          }}
        >
          Please Consider Buying a plan
        </main>
      ) : (
        <main style={{ maxWidth: "100vw", overflowX: "hidden" }}>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={modaldata.open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={modaldata.open}>
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
                  Add stock to your Watchlist
                </Typography>
                <TextField
                  style={
                    window.innerWidth < 600
                      ? { width: "100%", marginBottom: "5%" }
                      : { width: "49%", marginBottom: "2%", marginRight: "1%" }
                  }
                  label="Ticker Name"
                  value={modaldata.name}
                  name="name"
                  disabled={true}
                />
                <TextField
                  style={
                    window.innerWidth < 600
                      ? { width: "100%", marginBottom: "5%" }
                      : { width: "49%", marginBottom: "2%", marginLeft: "1%" }
                  }
                  label="Company Name"
                  value={modaldata.CompanyName}
                  name="CompanyName"
                  disabled={true}
                />

                <TextField
                  style={{ width: "100%", marginBottom: "5%" }}
                  label="Delta"
                  value={modaldata.delta}
                  name="delta"
                  onChange={handleChange}
                />

                <TextField
                  style={{ width: "100%", marginBottom: "5%" }}
                  label="Asset Class "
                  value={modaldata.assetClass}
                  name="assetClass"
                  disabled={true}
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
                  <p style={{ margin: "0", fontWeight: "650" }}>Add Stock</p>
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
              backgroundImage: `url(${Search})`,
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
                      outline: "0",
                      minHeight: "50vh",
                      maxWidth: "100vw",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-end",
                      width: "100vw",
                      backgroundImage: `linear-gradient(180deg,rgba(8, 26, 48, 0.2) 0%, rgba(8, 26, 48, 0.75) 50%, rgba(8, 26, 48, 1) 100%)`,
                      backgroundPositionY: "bottom",
                    }
                  : {
                      marginTop: "0",
                      outline: "0",
                      minHeight: "50vh",
                      maxWidth: "100vw",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-end",
                      width: "100vw",
                      backgroundImage: `linear-gradient(180deg,rgba(8, 26, 48, 0.2) 0%, rgba(8, 26, 48, 0.75) 50%, rgba(8, 26, 48, 1) 100%)`,
                      backgroundPositionY: "bottom",
                    }
              }
            >
              <Grid container spacing={1} style={{ padding: "2% 0" }}>
                <Grid item xs={12} className="fade-in-slow">
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
                  >
                    Search
                    {/* Welcome Back {user.firstName}  */}
                  </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                  <input
                    className="input"
                    placeholder="Search a Stock or Ticker Name..."
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                    }}
                    type="text"
                    style={
                      window.innerWidth < 1260
                        ? {
                            width: "90vw",
                            fontSize: "1em",
                          }
                        : {
                            width: "40vw",
                          }
                    }
                  />
                </Grid>
              </Grid>
            </Container>
          </Box>
          <Grid
            container
            spacing={1}
            style={{
              padding: "2% 0 0 0",

              width: "100vw",
              margin: "0",
              minHeight: "50vh",
              backgroundColor: "#081A30",
              cursor: "pointer",
            }}
            justifyContent="center"
          >
            {search !== "" && filter !== stocks && filter !== [] && (
              <Grid
                item
                container
                justifyContent="center"
                spacing={1}
                style={{
                  width: "85%",
                  margin: "0",
                  backgroundColor: "#081A30",
                  cursor: "pointer",
                  borderRadius: "1em",
                  padding: "0",
                }}
              >
                {filter.map((obj) => {
                  return (
                    <Grid
                      key={obj.Ticker}
                      style={{
                        padding: "0",
                        margin: "2% 0",
                        height: "max-content",
                      }}
                      item
                      xs={12}
                    >
                      <Paper
                        style={
                          window.innerWidth < 900
                            ? {
                                padding: "3%",
                                borderRadius: "1em",
                                background: "rgb(2,0,36)",
                                margin: "0",
                                backgroundPositionX: "left",
                                backgroundPositionY: "center",
                                backgroundSize: "cover",
                                backgroundRepeat: "none",
                                backgroundImage: `url(${title})`,
                                backdropFilter: "blur(2px)",
                              }
                            : {
                                padding: "3%",
                                borderRadius: "1em",
                                background: "rgb(2,0,36)",
                                margin: "0",
                                backgroundPositionX: "left",
                                backgroundSize: "cover",
                                backgroundRepeat: "none",
                                backgroundImage: `url(${title})`,
                                backdropFilter: "blur(2px)",
                              }
                        }
                      >
                        <Grid
                          container
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Grid item xs={12} md={10}>
                            <h1
                              style={{ fontWeight: "600", fontSize: "1.3em" }}
                            >{`${obj.CompanyName} - ${obj.Ticker}`}</h1>
                          </Grid>
                          <Grid
                            item
                            container
                            justifyContent={
                              window.innerWidth < 900
                                ? "flex-start"
                                : "flex-end"
                            }
                            alignItems="center"
                            xs={12}
                            md={2}
                            spacing={2}
                          >
                            <Grid
                              item
                              xs={3}
                              md={4}
                              style={
                                window.innerWidth < 900
                                  ? {
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "flex-start",
                                    }
                                  : {
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "flex-end",
                                    }
                              }
                            >
                              <Tooltip title="Add to Watchlist">
                                <IconButton
                                  color="primary"
                                  style={{ border: "3px solid #fff" }}
                                  onClick={() => handleClick(obj)}
                                >
                                  <Add
                                    style={
                                      window.innerWidth < 900
                                        ? {
                                            fontSize: "1em",
                                            fontWeight: "600",
                                            color: "#fff",
                                          }
                                        : {
                                            fontSize: "1.5em",
                                            fontWeight: "600",
                                            color: "#fff",
                                          }
                                    }
                                  />
                                </IconButton>
                              </Tooltip>
                            </Grid>
                            <Grid
                              item
                              xs={3}
                              md={4}
                              style={
                                window.innerWidth < 600
                                  ? {
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "flex-start",
                                    }
                                  : {
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "flex-end",
                                    }
                              }
                            >
                              <Tooltip title="Read More">
                                <IconButton
                                  color="primary"
                                  style={{ border: "3px solid #fff" }}
                                  onClick={() => history.push(`/stock/${obj.Ticker}`)}
                                >
                                  <ReadMore
                                    style={
                                      window.innerWidth < 600
                                        ? {
                                            fontSize: "1em",
                                            fontWeight: "600",
                                            color: "#fff",
                                          }
                                        : {
                                            fontSize: "1.5em",
                                            fontWeight: "600",
                                            color: "#fff",
                                          }
                                    }
                                  />
                                </IconButton>
                              </Tooltip>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Grid>
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
