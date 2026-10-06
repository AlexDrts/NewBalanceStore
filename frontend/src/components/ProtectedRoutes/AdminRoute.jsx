import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../../services/api/authService.js";

function AdminRoute({ children }) {
    const user = getCurrentUser();

    if (!user || user.role !== "Admin") {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default AdminRoute;