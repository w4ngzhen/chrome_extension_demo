import React from "react";
import "./index.less";
import { createRoot } from "react-dom/client";
import { App } from "./App";

createRoot(document.querySelector("#main")).render(<App />);
