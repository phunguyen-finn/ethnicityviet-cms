import { Button, Checkbox, Form, Input, Layout, Typography, App } from 'antd';
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

const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
};

export function LoginPage() {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const { message } = App.useApp();

    const onFinish = (values: any) => {
        message.loading('Logging in...', 0);
        AuthService.login(values.username, values.password, values.remember)
            .then(() => {
                message.destroy();
            })
            .catch((error) => {
                message.destroy();
                message.error('Login failed: ' + error.message, 5);
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
                            label='Username'
                            name='username'
                            labelAlign='left'
                            rules={[{ required: true, type: 'email' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label='Password'
                            name='password'
                            labelAlign='left'
                            rules={[{ required: true }, { min: 8 }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <div style={rowStyle}>
                            <Form.Item name='remember' valuePropName='checked'>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                        </div>
                        <Form.Item style={{ marginBottom: "0px" }}>
                            <Button type='primary' htmlType='submit'>
                                Log in
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

export default LoginPage;