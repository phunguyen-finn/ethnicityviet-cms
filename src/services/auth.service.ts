import { signInWithEmailAndPassword, signOut, sendPasswordResetEmail, User, setPersistence, browserSessionPersistence, browserLocalPersistence, createUserWithEmailAndPassword } from "firebase/auth";
import { Auth, TemporaryAuth } from "services/firebase";
import UserService from "./user.service";

export const AuthService = {
    login: async function (email: string, password: string, remember: boolean) {
        await AuthService.setPersistence(remember);
        return signInWithEmailAndPassword(Auth, email, password);
    },
    logout: function () {
        return signOut(Auth);
    },
    passwordReset: function (email: string) {
        return sendPasswordResetEmail(Auth, email);
    },
    onAuthStateChanged: function (callback: (user: User | null) => void) {
        return Auth.onAuthStateChanged((user) => {
            callback(user);
        });
    },
    setPersistence: function (persist: boolean) {
        return setPersistence(
            Auth,
            persist ? browserLocalPersistence : browserSessionPersistence
        );
    },
    register: async function (email: string, password: string) {
        const userCredentials = await createUserWithEmailAndPassword(TemporaryAuth, email, password);
        await signOut(TemporaryAuth);
        await UserService.createUser(userCredentials.user.email as string);
    }
}

export default AuthService;