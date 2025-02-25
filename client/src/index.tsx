import React from "react";
import ReactDOM from "react-dom";
import App from "src/App";

const rootElement = document.getElementById("root") as HTMLElement;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
