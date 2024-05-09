import React from "react";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function BackButton(text) {
  return <Button startIcon={<ArrowBackIcon />}>text</Button>;
}

export default BackButton;
