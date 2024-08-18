import { doc, collection, getDocs, orderBy, query, setDoc } from "firebase/firestore";
import { Auth, Db } from "./firebase";

export interface User {
    email: string;
    createdAt: Date;
    createdBy: string;
}

export const UserService = {
    getAllUsers: async function (): Promise<User[]> {
        const q = query(collection(Db, "users"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const users = snapshot.docs.map(doc => ({
            email: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
        })) as any;
        return users;
    },
    createUser: async (email: string) => {
        const userRef = doc(Db, "users", email);
        const data = {
            createdAt: new Date(),
            createdBy: Auth.currentUser?.email
        } as User;
        await setDoc(userRef, data);
    }
}

export default UserService;