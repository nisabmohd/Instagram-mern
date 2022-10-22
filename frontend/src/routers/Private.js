import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";

export function Private({ children }) {
  const context = useContext(AuthContext);

  return !context?.auth ? <Navigate to="/login" /> : children;
}
