import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";

import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";

import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import { store } from "./api/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <HelmetProvider>
    <Provider store={store}>
      <BrowserRouter>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </BrowserRouter>
    </Provider>
  </HelmetProvider>
);
