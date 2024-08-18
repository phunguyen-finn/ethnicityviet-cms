import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { TeamOutlined } from '@ant-design/icons';
import Header from 'common/Header';

const layoutStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
}

const description = (
    <>
        You can create new account here, but cannot delete existing accounts for security reasons.
        Only create accounts when necessary and use strong password. This section is dangerous, please dont mess around.
    </>
)

export function AccountsPage() {
    return <Layout style={layoutStyle}>
        <Header icon={<TeamOutlined />} title={'Accounts'} description={description} />
        <Outlet />
    </Layout >;
}

export default AccountsPage;