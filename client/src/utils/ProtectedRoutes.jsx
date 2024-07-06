import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "./auth-context";

const ProtectedRoutes = () => {
  const { user } = useContext(AuthContext);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
