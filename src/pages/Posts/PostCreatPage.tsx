import { Layout, Breadcrumb, Typography, App } from "antd";
import { useNavigate } from "react-router-dom";
import PostService from "services/post.service";
import 'react-quill/dist/quill.snow.css';
import PostHeader from "pages/Posts/PostHeader";
import PostForm from "./PostForm";

const layoutStyle = {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    marginBottom: '10px'
}

export function PostCreatePage() {
    const navigate = useNavigate();
    const { message } = App.useApp();

    const handleSubmit = (post: any) => {
        message.loading('Updating post...', 0);
        PostService.createPost(post).then(() => {
            message.destroy();
            message.success('Update post successfully', 5);
            navigate(-1);
        }).catch((error) => {
            message.destroy();
            message.error('Update post failed: ' + error.message, 5);
        });
    }

    return (
        <Layout style={layoutStyle}>
            <PostHeader>
                <Breadcrumb
                    items={[
                        { title: 'Home' },
                        { title: <a onClick={() => navigate(-1)}>Posts</a> },
                        { title: 'Create' }
                    ]}
                />
            </PostHeader>
            <Layout.Content>
                <PostForm onSubmit={handleSubmit} />
                <Layout.Footer style={{ textAlign: 'center' }}>
                    <Typography.Text type='secondary'>Ethnicity Vietnam © 2024</Typography.Text>
                </Layout.Footer>
            </Layout.Content>
        </Layout >
    );
}

export default PostCreatePage;