import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useSelector } from "react-redux";

interface ProtectedRouteProps {
  children: ReactNode;
}

interface RootState {
  auth: {
    isAuthenticated: boolean;
    role: string;
  };
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;