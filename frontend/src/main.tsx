import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./serviceProvider/store";
import "./index.css";
import "./theme.css";
import { getTheme, setTheme } from "./theme";
import { restoreSession } from "./serviceProvider/slices/authSlice";
import { fetchProducts } from "./serviceProvider/slices/productSlice";

store.dispatch(restoreSession());
store.dispatch(fetchProducts());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
setTheme(getTheme());


