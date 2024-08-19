import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from 'pages/LoginPage';
import MainApp from 'pages/MainApp';
import 'App.css';
import PostsPage from 'pages/Posts/PostsPage';
import AccountsPage from 'pages/Accounts/AccountsPage';
import PatternsPage from 'pages/Patterns/PatternsPage';
import StaticPage from 'pages/Static/StaticPage';
import PostPage from 'pages/Posts/PostPage';
import ErrorPage from 'pages/ErrorPage';
import PatternPage from 'pages/Patterns/PatternPage';
import ProductsPage from 'pages/Products/ProductsPage';
import ProductPage from 'pages/Products/ProductPage';
import ProductsList from 'pages/Products/ProductsList';
import PatternsLists from 'pages/Patterns/PatternsLists';
import PostsLists from 'pages/Posts/PostsLists';
import CollectionsPage from 'pages/Collections/CollectionsPage';
import CollectionsList from 'pages/Collections/CollectionsList';
import CollectionPage from 'pages/Collections/CollectionPage';
import ResetPasswordPage from 'pages/ResetPassword';
import AccountsList from 'pages/Accounts/AccountsList';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/reset-password' element={<ResetPasswordPage />} />
                <Route path='/' element={<MainApp />}>
                    <Route path='/' element={<PostsPage />} >
                        <Route path='/' element={<PostsLists />} />
                        <Route path='/posts/:postId' element={<PostPage />} />
                    </Route>
                    <Route path='/patterns' element={<PatternsPage />} >
                        <Route path='/patterns' element={<PatternsLists />} />
                        <Route path='/patterns/:patternId' element={<PatternPage />} />
                    </Route>
                    <Route path='/collections' element={<CollectionsPage />}>
                        <Route path='/collections' element={<CollectionsList />} />
                        <Route path='/collections/:collectionId' element={<CollectionPage />} />
                    </Route>
                    <Route path='/products' element={<ProductsPage />}>
                        <Route path='/products' element={<ProductsList />} />
                        <Route path='/products/:productId' element={<ProductPage />} />
                    </Route>
                    <Route path='/accounts' element={<AccountsPage />} >
                        <Route path='/accounts' element={<AccountsList />} />
                    </Route>
                    <Route path='static' element={<StaticPage />} />
                    <Route path='*' element={<ErrorPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
