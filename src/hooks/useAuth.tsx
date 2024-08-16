import type AuthContext from "contexts/AuthContext";
import { useEffect, useState } from "react";
import { AuthService } from "services/auth.service";

export function useAuth() {
    const [authContext, setAuthContext] = useState<AuthContext>({ user: null, loading: true });

    useEffect(() => {
        const unsubcribe = AuthService.onAuthStateChanged((user) => {
            setAuthContext({ user, loading: false });
        });
        return unsubcribe;
    }, []);

    return authContext;
}