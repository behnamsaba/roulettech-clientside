import { Navigate } from "react-router-dom";
import { useContext } from "react";
import PropTypes from 'prop-types';
import UserContext from "../UserContext";
// Redirects authenticated users, allows unauthenticated
const UnProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  if (user) {
    // Redirect authenticated users away from the page, perhaps to their dashboard
    return <Navigate to="/profile" replace />;
  }

  return children;
};

UnProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default UnProtectedRoute;
