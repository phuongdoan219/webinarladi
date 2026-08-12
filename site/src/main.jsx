import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { ThankYouPage } from "./ThankYouPage.jsx";
import { initTracking } from "./tracking.js";
import "./styles.css";

initTracking();

const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
const CurrentPage = currentPath === "/cam-on" ? ThankYouPage : App;

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CurrentPage />
  </React.StrictMode>,
);
