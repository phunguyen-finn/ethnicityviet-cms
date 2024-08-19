import { collection, doc, getDoc, getDocs, orderBy, query, setDoc, addDoc, startAfter, limit, Timestamp, deleteDoc } from "firebase/firestore";
import { Db } from "./firebase";
import { Auth } from "./firebase";
import PatternService from "./pattern.service";

const MAX_COLLECTIONS = 9;

export enum LANGUAGE {
    VI = 'vi',
    EN = 'en',
}

export interface Collection {
    id: string;
    name: string;
    description: string;
    thumbnailUrl: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    language: LANGUAGE;
}

export const CollectionService = {
    getCollections: async (cursor: Timestamp | undefined): Promise<[Collection[], Timestamp | undefined, boolean]> => {
        if (!cursor) cursor = Timestamp.now();
        const q = query(collection(Db, "collections"),
            orderBy("createdAt", "desc"),
            startAfter(cursor),
            limit(MAX_COLLECTIONS));
        const snapshot = await getDocs(q);
        const collections = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
            updatedAt: doc.data().updatedAt.toDate()
        })) as any;
        const hasMore = collections.length === MAX_COLLECTIONS;
        if (collections.length === 0) return [[], undefined, false];
        return [collections, collections[collections.length - 1].createdAt, hasMore];
    },
    getAllCollections: async (): Promise<Collection[]> => {
        const q = query(collection(Db, "collections"),
            orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const collections = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
            updatedAt: doc.data().updatedAt.toDate()
        })) as any;
        return collections;
    },
    getCollection: async (id: string): Promise<Collection | null> => {
        const result = await getDoc(doc(Db, "collections", id));
        if (!result.exists()) return Promise.reject(new Error("Resource not found"));
        return { id: result.id, ...result.data(), createdAt: result.data().createdAt.toDate(), updatedAt: result.data().updatedAt.toDate() } as any;
    },
    updateCollection: (id: string, data: Partial<Collection>) => {
        return setDoc(doc(Db, "collections", id), { ...data, updatedAt: Timestamp.now() }, { merge: true });
    },
    createCollection: (data: Partial<Collection>) => {
        if (!Auth.currentUser) return Promise.reject(new Error("Must be logged in to create resource"));
        return addDoc(collection(Db, "collections"), { ...data, createdAt: Timestamp.now(), updatedAt: Timestamp.now(), createdBy: Auth.currentUser?.email });
    },
    deleteCollection: async (id: string) => {
        const collectionRef = doc(Db, "collections", id);
        const patterns = await PatternService.getPatternsByCollection(id);
        const arr = patterns.map((pattern) => PatternService.removeCollectionFromPattern(pattern.id));
        await Promise.all(arr);
        await deleteDoc(collectionRef);
    }
};

export default CollectionService; 