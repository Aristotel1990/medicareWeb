import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor } from "./redux/store";
import { AuthProvider } from "./contexts/AuthContext";

import "./index.css";
import App from "./App";
import NavBar from "./components/NavBar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ReduxProvider store={store}>
    <PersistGate loading={"teli"} persistor={persistor}>
      <BrowserRouter>
        <AuthProvider>
          <NavBar />
          <App />
        </AuthProvider>
      </BrowserRouter>
    </PersistGate>
  </ReduxProvider>
);
