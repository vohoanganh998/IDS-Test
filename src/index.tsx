import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Manager from "./pages/manager";
import User from "./pages/user";
import { store } from "./store";
import { Provider } from "react-redux";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="/manager" element={<Manager />}>
              <Route index element={<Navigate to="user" replace={true} />} />
              <Route path="user" element={<User />}></Route>
            </Route>
            <Route
              path="*"
              element={<Navigate to="/manager/user" replace={true} />}
            />
            <Route
              index
              element={<Navigate to="/manager/user" replace={true} />}
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
