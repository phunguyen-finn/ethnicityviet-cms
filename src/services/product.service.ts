import { collection, doc, getDoc, getDocs, orderBy, query, setDoc, addDoc, startAfter, limit, Timestamp, deleteDoc, where } from "firebase/firestore";
import { Db } from "./firebase";
import { Auth } from "./firebase";

const MAX_PRODUCTS = 9;

export enum LANGUAGE {
    VI = 'vi',
    EN = 'en',
}

export interface Product {
    id: string;
    name: string;
    description: string;
    thumbnailUrl: string;
    hdUrl: string;
    purchaseUrl: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    language: LANGUAGE;
}

export const ProductService = {
    getProducts: async (cursor: Timestamp | undefined): Promise<[Product[], Timestamp | undefined, boolean]> => {
        if (!cursor) cursor = Timestamp.now();
        const q = query(collection(Db, "products"),
            orderBy("createdAt", "desc"),
            startAfter(cursor),
            limit(MAX_PRODUCTS));
        const snapshot = await getDocs(q);
        const products = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
            updatedAt: doc.data().updatedAt.toDate()
        })) as any;
        const hasMore = products.length === MAX_PRODUCTS;
        if (products.length === 0) return [[], undefined, false];
        return [products, products[products.length - 1].createdAt, hasMore];
    },
    getProduct: async (id: string): Promise<Product | null> => {
        const product = await getDoc(doc(Db, "products", id));
        if (!product.exists()) return Promise.reject(new Error("Resource not found"));
        return { id: product.id, ...product.data(), createdAt: product.data().createdAt.toDate(), updatedAt: product.data().updatedAt.toDate() } as any;
    },
    updateProduct: (id: string, data: Partial<Product>) => {
        return setDoc(doc(Db, "products", id), { ...data, updatedAt: Timestamp.now() }, { merge: true });
    },
    createProduct: (data: Partial<Product>) => {
        if (!Auth.currentUser) return Promise.reject(new Error("Must be logged in to create resource"));
        return addDoc(collection(Db, "products"), { ...data, createdAt: Timestamp.now(), updatedAt: Timestamp.now(), createdBy: Auth.currentUser?.email });
    },
    deleteProduct: (id: string) => {
        return deleteDoc(doc(Db, "products", id));
    }
};

export default ProductService; 