import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";

export function Private({ children }) {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!context.auth) {
      navigate("/login");
    }
  }, [context, navigate]);
  return children;
}
