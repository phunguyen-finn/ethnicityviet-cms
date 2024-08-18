import { Form, Input, Button } from "antd";
import { validateMessages } from "constants/index";

export function AccountForm({ onSubmit }: { onSubmit: any }) {
    return <Form
        validateMessages={validateMessages}
        colon={false}
        labelCol={{ span: 5 }}
        labelAlign='left'
        style={{ width: 800 }}
        onFinish={onSubmit}
    >
        <Form.Item
            label='Username'
            name='username'
            rules={[{ required: true, type: "email", message: "Please enter an email!" }]}
        >
            <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true }, { min: 8 }]}
        >
            <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item style={{ display: "flex", width: 800, justifyContent: "end" }}>
            <Button type='primary' htmlType='submit'>
                Confirm
            </Button>
        </Form.Item>
    </Form>;
}

export default AccountForm;