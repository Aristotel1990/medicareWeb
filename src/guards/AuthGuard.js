import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
// hooks
import useAuth from "../hooks/useAuth";
// pages
import Login from "../components/Login";
import { PATH_PAGE } from "../routes/paths";

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, user } = useAuth();
  console.log("🚀 ~ file: AuthGuard.js:18 ~ AuthGuard ~ user", user);
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return navigate(PATH_PAGE.login);
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }
  if (user.doctorId && pathname.includes("select")) {
    setRequestedLocation(null);
    return navigate(PATH_PAGE.dashboard);
  }

  return <>{children}</>;
}
