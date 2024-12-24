import { useContext, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { DateTime } from "luxon";
import { AuthContext } from "./AuthContext";

const ProtectedRoutes = () => {
  const { user, setUser } = useContext(AuthContext);

  const isTokenExpired = (user) => {
    if (!user || !user.exp) return true;
    const tokenTime = DateTime.fromSeconds(user.exp).toUTC().toMillis();
    const currentTime = DateTime.now().toUTC().toMillis();
    return currentTime > tokenTime;
  };

  useEffect(() => {
    if (user && isTokenExpired(user)) {
      setUser(null);
      localStorage.removeItem("token");
    }
  }, [user, setUser]);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
