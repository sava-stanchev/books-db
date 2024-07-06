import "./App.css";
import NavbarComponent from "./components/Navbar";
import Books from "./components/Books";
import Login from "./components/Login";
import Register from "./components/Register";
import SingleBook from "./components/SingleBook";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React, { useState } from "react";
import AuthContext, { getUser } from "./utils/auth-context";
import Users from "./components/Users";
import Home from "./components/Home";
import ProtectedRoutes from "./utils/ProtectedRoutes";

const router = createBrowserRouter([
  {
    element: <NavbarComponent />,
    children: [
      {
        path: "/",
        element: <Home />,
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
        element: <ProtectedRoutes />,
        children: [
          {
            path: "/books",
            element: <Books />,
          },
          {
            path: "/books/:id",
            element: <SingleBook />,
          },
          {
            path: "/users",
            element: <Users />,
          },
        ],
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
    <AuthContext.Provider value={{ ...authValue, setAuthState: setAuthValue }}>
      <RouterProvider router={router}></RouterProvider>
    </AuthContext.Provider>
  );
};

export default App;
