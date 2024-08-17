import { Layout, Form, Input, Button } from "antd";

export function AccountsPage() {
    const onFinish = (values: any) => {

    }
    return (
        <Layout>
            <Form
                name='login-form'
                initialValues={{ remember: false }}
                onFinish={onFinish}
                colon={false}
            >
                <Form.Item
                    label='Username'
                    name='username'
                    labelAlign='left'
                    rules={[{
                        required: true,
                        message: 'Please input your username!',
                        type: 'email'
                    }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Password'
                    name='password'
                    labelAlign='left'
                    rules={[{ required: true, message: 'Please input your password!' },
                    { min: 8, message: 'Password must be at least 8 characters long' }
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item style={{ marginBottom: "0px" }}>
                    <Button type='primary' htmlType='submit'>
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    );
}

export default AccountsPage;