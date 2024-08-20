import { createBrowserRouter } from 'react-router-dom';
import LoginPage from 'pages/LoginPage';
import MainApp from 'pages/MainApp';
import 'App.css';
import ErrorPage from 'pages/ErrorPage';
import ResetPasswordPage from 'pages/ResetPassword';
import PostsPage from 'pages/Posts/PostsPage';
import PatternsPage from 'pages/Patterns/PatternsPage';
import CollectionsPage from 'pages/Collections/CollectionsPage';
import ProductsPage from 'pages/Products/ProductsPage';

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/reset-password",
        element: <ResetPasswordPage />,
    },
    {
        path: "/",
        element: <MainApp />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <PostsPage />,
                children: [
                    {
                        path: "/",
                        lazy: async () => {
                            const def = await import("pages/Posts/PostsLists");
                            return { Component: def.PostsLists }
                        },
                    },
                    {
                        path: "/posts/:postId",
                        lazy: async () => {
                            const def = await import("pages/Posts/PostPage");
                            return { Component: def.PostPage }
                        },
                    }
                ]
            },
            {
                path: "/patterns",
                element: <PatternsPage />,
                children: [
                    {
                        path: "/patterns",
                        lazy: async () => {
                            const def = await import("pages/Patterns/PatternsLists");
                            return { Component: def.PatternsLists }
                        },
                    },
                    {
                        path: "/patterns/:patternId",
                        lazy: async () => {
                            const def = await import("pages/Patterns/PatternPage");
                            return { Component: def.PatternPage }
                        },
                    }
                ],
            },
            {
                path: "/collections",
                element: <CollectionsPage />,
                children: [
                    {
                        path: "/collections",
                        lazy: async () => {
                            const def = await import("pages/Collections/CollectionsList");
                            return { Component: def.CollectionsList }
                        },
                    },
                    {
                        path: "/collections/:collectionId",
                        lazy: async () => {
                            const def = await import("pages/Collections/CollectionPage");
                            return { Component: def.CollectionPage }
                        },
                    }
                ],
            },
            {
                path: "/products",
                element: <ProductsPage />,
                children: [
                    {
                        path: "/products",
                        lazy: async () => {
                            const def = await import("pages/Products/ProductsList");
                            return { Component: def.ProductsList }
                        },
                    },
                    {
                        path: "/products/:productId",
                        lazy: async () => {
                            const def = await import("pages/Products/ProductPage");
                            return { Component: def.ProductPage }
                        },
                    }
                ],
            }
        ]
    }
]);

export default router;
