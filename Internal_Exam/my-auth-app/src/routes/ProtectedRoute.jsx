import { Navigate } from "react-router-dom";
import { getUserFromStorage } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  const user = getUserFromStorage();
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
