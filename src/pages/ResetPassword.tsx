import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Layout, Typography, App } from 'antd';
import { validateMessages } from 'constants/index';
import AuthContext from 'contexts/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from 'services/auth.service';

const layoutStyle: React.CSSProperties = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
};

const contentStyle: React.CSSProperties = {
    maxWidth: '350px',
    padding: '20px',
};

export function ResetPasswordPage() {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const { message } = App.useApp();

    const onFinish = (values: any) => {
        message.loading('Sending email...', 0);
        AuthService.passwordReset(values.email).then(() => {
            message.destroy();
            message.success('Email sent. Please check your inbox.', 5);
        }).catch((error) => {
            message.destroy();
            message.error('Failed to send email: ' + error.message, 5);
        })
    }

    if (authContext.loading) {
        return null;
    }

    if (authContext.user) {
        navigate('/');
        return null;
    }

    return (
        <Layout style={layoutStyle}>
            <div>
                <Layout.Content style={contentStyle}>
                    <img src='/logo.svg' alt='logo'
                        style={{ width: '300px', marginBottom: '10px' }}
                        width={300}
                        height={75} />
                    <Form
                        name='login-form'
                        initialValues={{ remember: false }}
                        onFinish={onFinish}
                        colon={false}
                        validateMessages={validateMessages}
                    >
                        <Form.Item
                            name='email'
                            labelAlign='left'
                            rules={[{ required: true, type: 'email', message: 'Please input an email!' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Your account email" />
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit' style={{ marginBottom: "0px", width: '300px' }}>
                                Reset Password
                            </Button>
                        </Form.Item>
                    </Form>
                </Layout.Content>
                <Layout.Footer style={{ textAlign: 'center' }}>
                    <Typography.Text type='secondary'>Ethnicity Vietnam © 2024</Typography.Text>
                </Layout.Footer>
            </div>
        </Layout>
    );
}

export default ResetPasswordPage;