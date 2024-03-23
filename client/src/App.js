import "./App.css";
import NavbarComponent from "./components/Navbar";
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
    element: <NavbarComponent />,
    children: [
      {
        path: "/home",
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
      {
        path: "/books",
        element: <Books />,
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
      <AuthContext.Provider
        value={{ ...authValue, setAuthState: setAuthValue }}
      >
        <RouterProvider router={router}></RouterProvider>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
