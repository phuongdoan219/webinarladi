import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { ThankYouPage } from "./ThankYouPage.jsx";
import "./styles.css";

const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
const CurrentPage = currentPath === "/cam-on" ? ThankYouPage : App;

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CurrentPage />
  </React.StrictMode>,
);
