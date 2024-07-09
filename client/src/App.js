import "src/App.css";
import NavbarComponent from "src/components/Navbar";
import Books from "src/components/Books";
import Login from "src/components/Login";
import Register from "src/components/Register";
import SingleBook from "src/components/SingleBook";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React, { useState } from "react";
import AuthContext, { getUser } from "src/utils/auth-context";
import Users from "src/components/Users";
import Home from "src/components/Home";
import ProtectedRoutes from "src/utils/ProtectedRoutes";

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
