import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import React from 'react';

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      style={{ color: "#ccc", backgroundColor: "rgb(8, 26, 48)" }}
    >
      {"Copyright © "}
      <Link color="inherit" to="/">
        SPYKE
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
      <br />
      <span style={{ fontSize: "0.6em" }}>
        All Rights Reserved. We are not liable/responsible for any trade made on
        our reccomendations. Trades are subject to market risk please read all
        scheme related document carefully before investment.
        This is for development , education and testing purposes only.
      </span>
    </Typography>
  );
}

export default Copyright;