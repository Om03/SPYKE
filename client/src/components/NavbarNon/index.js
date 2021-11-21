import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import logo from "../../assets/logo/Logo-Dark-Rect.jpg";
import { useHistory } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function NavbarNon() {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#5cc9cc" },
    },
  });
  const history = useHistory();
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <AppBar
          position="static"
          style={{ backgroundColor: "rgba(8,26,48, 1)" }}
        >
          <Toolbar
            variant="dense"
            style={{ backgroundColor: "rgba(8,26,48, 1)" }}
          >
            <Grid container alignItems="center" justifyContent="flex-start">
              <Grid item xs={6}>
                <img
                  src={logo}
                  alt="logo"
                  style={{ height: "4em", cursor: "pointer" }}
                  onClick={() => {
                    history.push("/");
                  }}
                />
              </Grid>
              <Grid item xs={6} align="right">
                <Button
                  variant="outlined"
                  color="primary"
                  style={{
                    fontWeight: "600",
                    fontFamily: "Montserrat, sans-serif",
                    borderRadius: "1em",
                  }}
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  <p style={{ margin: "8% 0" }}>Landing Page</p>
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
