import "./App.css";
import NavBar from "./components/Navbar";
import Books from "./components/Books";
import Login from "./components/Login";
import Register from "./components/Register";
import SingleBook from "./components/SingleBook";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React, { useState } from "react";
import AuthContext, { getUser } from "./providers/auth-context";
import AddBook from "./components/AddBook";
import AddReview from "./components/AddReview";
import UpdateBook from "./components/UpdateBook";
import Users from "./components/Users";
import SingleUser from "./components/SingleUser";
import UpdateReview from "./components/UpdateReview";
import HomePage from "./components/HomePage";
import GuardedRoute from "./providers/GuardedRoute";

const router = createBrowserRouter([
  {
    element: <NavBar />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

const App = () => {
  const [authValue, setAuthValue] = useState({
    user: getUser(),
    isLoggedIn: Boolean(getUser()),
  });

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default App;
