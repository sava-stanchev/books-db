import React, {
  createContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import jwtDecode from "jwt-decode";
import { User } from "src/types";

interface AuthContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  setUser: () => {},
});

export const getUser = (): User | null => {
  try {
    const token = localStorage.getItem("token");
    return token ? jwtDecode<User>(token) : null;
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
};

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(getUser());

  useEffect(() => {
    const handleStorageChange = () => setUser(getUser());
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const contextValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
