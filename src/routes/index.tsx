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
import PostCreatePage from 'pages/Posts/PostCreatPage';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/' element={<MainApp />} errorElement={<ErrorPage />}>
                    <Route path='/' element={<PostsPage />} />
                    <Route path='posts/create' element={<PostCreatePage />} />
                    <Route path='posts/:postId' element={<PostPage />} />
                    <Route path='accounts' element={<AccountsPage />} />
                    <Route path='patterns' element={<PatternsPage />} />
                    <Route path='static' element={<StaticPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
