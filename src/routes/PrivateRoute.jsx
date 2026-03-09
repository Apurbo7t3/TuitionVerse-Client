import { Navigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import Loading from "../components/Loading";

const PrivateRoute = ({ children }) => {
    const { user, authTokens } = useAuthContext();

    if (!authTokens) {
        return <Navigate to="/login" replace />;
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loading />
            </div>
        );
    }

    return (
        user ? children : <Navigate to='/login' />
    );
};

export default PrivateRoute;