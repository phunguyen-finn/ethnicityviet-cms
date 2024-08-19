import AuthService from "services/auth.service";
import { App, Button, Divider, Layout, List, Typography } from "antd";
import { Link } from "react-router-dom";
import UserService, { User } from "services/user.service";
import { useCallback, useEffect, useState } from "react";
import { CalendarOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

const contentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    width: 800,
    height: 40,
    justifyContent: 'end',
    marginBottom: 16
}

export function AccountsList() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const { message } = App.useApp();

    useEffect(() => {
        UserService.getAllUsers().then((users) => {
            setUsers(users);
            setLoading(false);
        });
    }, []);

    const sendResetPassword = (email: string) => {
        message.loading(`Sending reset password email to ${email}`, 0);
        AuthService.passwordReset(email).then(() => {
            message.destroy();
            message.success(`Reset password email sent to ${email}`, 5);
        }).catch((error) => {
            message.destroy();
            message.error(`Failed to send reset password email to ${email}: ${error.message}`, 5);
        });
    }

    const renderItem = (item: User) => {
        const description = (
            <>
                <Typography.Text style={{ color: "gray" }}>
                    <CalendarOutlined /> Created at {item.createdAt.toLocaleDateString()}
                </Typography.Text>
                <Divider type="vertical" />
                <Typography.Text style={{ color: "gray" }}>
                    <UserOutlined /> Created by {item.createdBy}
                </Typography.Text>
            </>
        );

        return (
            <List.Item
                key={item.email}
                actions={[
                    <Typography.Link onClick={() => sendResetPassword(item.email)}><MailOutlined /> Send reset password email</ Typography.Link >
                ]}
            >
                <List.Item.Meta
                    title={item.email}
                    description={description}
                />
            </List.Item >
        );
    };

    if (loading)
        return null;

    return (
        <Layout>
            <div style={contentStyle}>
                <Link to="/accounts/create" style={{ width: 75 }}>
                    <Button type='primary' style={{ position: 'absolute' }}>Create</Button>
                </Link>
            </div>
            <List
                dataSource={users}
                renderItem={renderItem}
            />
        </Layout>
    );
}

export default AccountsList;