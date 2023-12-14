import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  return isAuthenticated() && !isLoading ? (
    <div>{children}</div>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
