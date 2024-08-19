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
        For security reasons, you can only create/delete accounts from the firebase console.
        Please contact administrator for more information.
    </>
)

export function AccountsPage() {
    return <Layout style={layoutStyle}>
        <Header icon={<TeamOutlined />} title={'Accounts'} description={description} />
        <Outlet />
    </Layout >;
}

export default AccountsPage;