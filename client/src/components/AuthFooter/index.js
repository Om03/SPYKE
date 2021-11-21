import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import React from 'react';
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      style={{ fontFamily: "Montserrat, sans-serif" }}
      {...props}
    >
      {"Copyright © "}
      <Link
        to="/"
        style={{
          fontFamily: "Montserrat, sans-serif",
          color: "rgba(255,255, 255, 0.7)",
        }}
      >
        SPYKE
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
