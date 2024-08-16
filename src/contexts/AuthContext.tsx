
import { User } from 'firebase/auth';
import { createContext } from 'react';

export interface AuthContext {
    user: User | null;
    loading: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const AuthContext = createContext<AuthContext>({ user: null, loading: true });

export default AuthContext;