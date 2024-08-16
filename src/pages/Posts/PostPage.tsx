import { Layout, Form, Input, Breadcrumb, Typography, Button, Radio, Select, Upload } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import RichTextEditor from "common/RichTextEditor";
import PostService from "services/post.service";
import { useEffect, useState } from "react";
import 'react-quill/dist/quill.snow.css';
import { Header } from "pages/Posts/Header";

export function PostPage() {
    let { postId } = useParams();
    const [post, setPost] = useState<any>(undefined);
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    useEffect(() => {
        if (postId) {
            PostService.getPost(postId).then((post) => {
                setPost(post);
                form.setFieldsValue(post);
            })
        }
    }, [postId]);

    return (
        <Layout style={{ justifyContent: "center", display: "flex", alignItems: "center" }}>
            <Header>
                <Breadcrumb
                    items={[
                        { title: 'Home' },
                        { title: <a onClick={() => navigate(-1)}>Posts</a> },
                        { title: 'Edit' }
                    ]}
                />
            </Header>
            <Layout.Content>
                <Form
                    form={form}
                    name='edit-post-form'
                    validateMessages={{ required: 'This field is required!' }}
                    colon={false}
                    labelCol={{ span: 5 }}
                    labelAlign='left'
                    style={{ maxWidth: 800, margin: 'auto' }}
                >
                    <Form.Item label="Language" name="language" rules={[{ required: true }]}>
                        <Radio.Group>
                            <Radio.Button value="vn">VN</Radio.Button>
                            <Radio.Button value="en">EN</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label='Title'
                        name='title'
                        rules={[{
                            required: true,
                        }, { max: 100, message: 'Title must be less than 100 characters' }]}
                    >
                        <Input defaultValue={post?.title} placeholder="Let us know the title" />
                    </Form.Item>

                    <Form.Item
                        label='Description'
                        name='description'
                        rules={[{ required: true, message: 'Please input your password!' },
                        { min: 8, message: 'Password must be at least 8 characters long' }
                        ]}
                    >
                        <Input.TextArea showCount maxLength={500} style={{ height: 150 }} placeholder="Describe your post here" />
                    </Form.Item>
                    <Form.Item label="Category" name="category" rules={[{ required: true }]} >
                        <Select style={{ width: 130 }} placeholder="Category">
                            <Select.Option value="media">Media</Select.Option>
                            <Select.Option value="discover">Discover</Select.Option>
                            <Select.Option value="update">Update</Select.Option>
                            <Select.Option value="project">Project</Select.Option>
                            <Select.Option value="project">Service</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="thumbnail"
                        label="Thumbnail"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[{ required: true }]}

                    >
                        <Upload name="logo" listType="picture-card" maxCount={1}>
                            <button
                                style={{
                                    border: 0,
                                    background: 'none',
                                    cursor: 'pointer',
                                }}
                                type="button"
                            >
                                <PlusOutlined />
                                <div
                                    style={{
                                        marginTop: 8,
                                    }}
                                >
                                    Upload
                                </div>
                            </button>
                        </Upload>
                    </Form.Item>
                    <Form.Item style={{ margin: 0, height: "400px" }}
                        label="Content"
                        name="content"
                        required
                    >
                        <RichTextEditor style={{ height: '300px' }} theme="snow" value={content} onChange={setContent} />
                    </Form.Item>
                    <div style={{ display: 'flex' }}>
                        <Form.Item>
                            <Button type='primary' htmlType='submit'>
                                Draft
                            </Button>
                        </Form.Item>
                        <Form.Item style={{ marginBottom: "0px" }}>
                            <Button type='primary' htmlType='button'>
                                Publish
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Layout.Content>
        </Layout >
    );
}

export default PostPage;