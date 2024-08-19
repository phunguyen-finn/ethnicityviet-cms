import { Layout, Breadcrumb, App } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AccountForm from "./AccountForm";
import AuthService from "services/auth.service";

const layoutStyle = {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    marginBottom: '10px'
}

export function AccountPage() {
    const navigate = useNavigate();
    const { message } = App.useApp();

    const handleCreate = (account: any) => {
        message.loading('Creating resource...', 0);
        AuthService.register(account.username, account.password).then(() => {
            message.destroy();
            message.success('Create resource successfully', 5);
            navigate("..");
        }).catch((error) => {
            message.destroy();
            message.error('Create resource failed: ' + error.message, 5);
        });
    };

    return (
        <Layout style={layoutStyle}>
            <Layout>
                <Breadcrumb style={{ marginBottom: 10 }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to=".." relative="path">Accounts</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Create</Breadcrumb.Item>
                </Breadcrumb>
                <AccountForm onSubmit={handleCreate} />
            </Layout>
        </Layout >
    );
}

export default AccountPage;