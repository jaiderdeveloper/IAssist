import React from "react";
import ReactDOM from "react-dom/client";
import "@/common/css/index.css";
import { ThemeProvider } from "@mui/material";
import theme from "./common/theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <h1>Hola Mundo</h1>
    </ThemeProvider>
  </React.StrictMode>
);
