import { collection, doc, getDoc, getDocs, orderBy, query, setDoc, addDoc, startAfter, limit, Timestamp, deleteDoc, where, deleteField } from "firebase/firestore/lite";
import { Db } from "./firebase";
import { Auth } from "./firebase";

const MAX_PATTERNS = 9;

export enum PATTERN_CATEGORY {
    PRESERVE = 'preserve',
    DEVELOP = 'develop',
    APPLY = 'apply',
    ILLUSTRATION = 'illustration',
}

export enum LANGUAGE {
    VI = 'vi',
    EN = 'en',
}

export interface Pattern {
    id: string;
    name: string;
    description: string;
    thumbnailUrl: string;
    hdUrl: string;
    fileUrl: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    category: PATTERN_CATEGORY;
    collectionId?: string;
    language: LANGUAGE;
}

export const PatternService = {
    getPatternsByCategory: async (category: PATTERN_CATEGORY, cursor: Timestamp | undefined): Promise<[Pattern[], Timestamp | undefined, boolean]> => {
        if (!cursor) cursor = Timestamp.now();
        const q = query(collection(Db, "patterns"),
            where("category", "==", category),
            orderBy("createdAt", "desc"),
            startAfter(cursor),
            limit(MAX_PATTERNS));
        const snapshot = await getDocs(q);
        const patterns = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
            updatedAt: doc.data().updatedAt.toDate()
        })) as any;
        const hasMore = patterns.length === MAX_PATTERNS;
        if (patterns.length === 0) return [[], undefined, false];
        return [patterns, patterns[patterns.length - 1].createdAt, hasMore];
    },
    getPatternsByCollection: async (collectionId: string): Promise<Pattern[]> => {
        const q = query(collection(Db, "patterns"),
            where("collectionId", "==", collectionId),
            orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const patterns = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
            updatedAt: doc.data().updatedAt.toDate()
        })) as any;
        return patterns;
    },
    getPattern: async (id: string): Promise<Pattern> => {
        const pattern = await getDoc(doc(Db, "patterns", id));
        if (!pattern.exists()) return Promise.reject(new Error("Resource not found"));
        return { id: pattern.id, ...pattern.data(), createdAt: pattern.data().createdAt.toDate(), updatedAt: pattern.data().updatedAt.toDate() } as any;
    },
    updatePattern: (id: string, data: Partial<Pattern>) => {
        if (data.collectionId == null) return setDoc(doc(Db, "patterns", id), { ...data, updatedAt: Timestamp.now(), collectionId: deleteField() }, { merge: true });
        return setDoc(doc(Db, "patterns", id), { ...data, updatedAt: Timestamp.now() }, { merge: true });
    },
    removeCollectionFromPattern: (id: string) => {
        return setDoc(doc(Db, "patterns", id), { collectionId: deleteField() }, { merge: true });
    },
    createPattern: (data: Partial<Pattern>) => {
        if (!Auth.currentUser) return Promise.reject(new Error("Must be logged in to create resource"));
        if (data.collectionId == null) {
            const { collectionId, ...rest } = data;
            return addDoc(collection(Db, "patterns"), { ...rest, createdAt: Timestamp.now(), updatedAt: Timestamp.now(), createdBy: Auth.currentUser?.email });
        }
        return addDoc(collection(Db, "patterns"), { ...data, createdAt: Timestamp.now(), updatedAt: Timestamp.now(), createdBy: Auth.currentUser?.email });
    },
    deletePattern: (id: string) => {
        return deleteDoc(doc(Db, "patterns", id));
    }
};

export default PatternService; 