import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider"
import { AuthProviderProps } from "./AuthProviderProps";

export default function AuthGuard({
    children
}: AuthProviderProps) {
    const auth = useAuth();

    if (!auth.userInfo) {
        return <Navigate to="/login" />
    }

    return <>{children}</>;
}