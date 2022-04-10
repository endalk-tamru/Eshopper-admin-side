import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, isAdmin }) => {
  return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
