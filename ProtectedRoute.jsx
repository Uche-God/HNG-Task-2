import { Navigate } from "react-router-dom";
import { getSession } from "../services/auth";

export default function ProtectedRoute({ children }) {
  const session = getSession();

  if (!session) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}
