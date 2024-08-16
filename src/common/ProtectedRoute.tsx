import AuthContext from "contexts/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    if (authContext.loading) {
        return null;
    }

    if (!authContext.user) {
        navigate('/login');
        return null;
    }

    return <>{children}</>;
}