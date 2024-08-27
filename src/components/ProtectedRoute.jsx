import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../UserContext';
import PropTypes from 'prop-types';

// Allows only authenticated users
const ProtectedRoute = ({ children }) => {
    const { user } = useContext(UserContext);

    if (!user) {
        // Redirect unauthenticated users to the login page, for example
        return <Navigate to="/login" replace />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired
};

export default ProtectedRoute;
