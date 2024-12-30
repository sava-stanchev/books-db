import { useContext, useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { DateTime } from "luxon";
import { AuthContext } from "./AuthContext";
import { User } from "src/types";

const ProtectedRoutes: React.FC = () => {
  const { user, setUser } = useContext(AuthContext);
  const location = useLocation();

  const isTokenExpired = (user: User | null): boolean => {
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
  }, [user, setUser, location]);

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
