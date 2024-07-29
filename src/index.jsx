import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import "./index.css";

import Header from "./components/Header";
import Home, { action as createListAction } from "./pages/Home";
import Login, { action as loginAction } from "./pages/Login";
import Register, { action as registerAction } from "./pages/Register";
import List, { loader as listLoader } from "./pages/List";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <Home />,
        action: createListAction,
      },
      { path: "/login", element: <Login />, action: loginAction },
      { path: "/register", element: <Register />, action: registerAction },
      {
        path: "/lists/:id_user/:id_list/:slug",
        element: <List />,
        loader: listLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
