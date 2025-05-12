import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// 把 <App /> 掛在 HTML 的 root 元素上
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
