import { Layout, } from 'antd';
import NavigationMenu from 'common/NavigationMenu'
import { ProtectedRoute } from 'common/ProtectedRoute';
import { Outlet } from 'react-router-dom';

export function MainApp() {
    return (
        <ProtectedRoute>
            <Layout style={{ height: '100vh' }}>
                <Layout.Sider width='256px' theme='light'>
                    <NavigationMenu />
                </Layout.Sider>
                <Layout style={{ overflowY: 'auto' }}>
                    <Outlet />
                </Layout>
            </Layout>
        </ProtectedRoute>
    );
}

export default MainApp;