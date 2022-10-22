import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";

export default function Redirect({ children }) {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (context.auth) {
      navigate("/");
    }
  }, [context, navigate]);
  return children;
}
