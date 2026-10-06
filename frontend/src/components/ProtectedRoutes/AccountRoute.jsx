import { Navigate } from "react-router-dom";
import { getCurrentUser, getToken } from "../../services/api/authService.js";

function AccountRoute({ children }) {
    const user = getCurrentUser();

    if (!user) {
        return <Navigate to="/" replace />;
    }

    const token = getToken();
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default AccountRoute;