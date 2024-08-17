import { Layout, Breadcrumb, Typography, App } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import PostService from "services/post.service";
import { useEffect, useState } from "react";
import 'react-quill/dist/quill.snow.css';
import PostHeader from "pages/Posts/PostHeader";
import PostForm from "./PostForm";

const layoutStyle = {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    marginBottom: '10px'
}

export function PostPage() {
    let { postId } = useParams();
    const [post, setPost] = useState<any>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { message } = App.useApp();

    useEffect(() => {
        if (postId) {
            PostService.getPost(postId).then((post) => setPost(post)).finally(() => setIsLoading(false));
        }
    }, [postId]);

    const handleSubmit = (post: any) => {
        if (postId) {
            message.loading('Updating post...', 0);
            PostService.updatePost(postId, post).then(() => {
                message.destroy();
                message.success('Update post successfully', 5);
                navigate(-1);
            }).catch((error) => {
                message.destroy();
                message.error('Update post failed: ' + error.message, 5);
            });
        }
    }

    if (isLoading)
        return null;

    if (!post) {
        return <Typography.Text type='danger'>Post not found</Typography.Text>
    }

    return (
        <Layout style={layoutStyle}>
            <PostHeader>
                <Breadcrumb
                    items={[
                        { title: 'Home' },
                        { title: <a onClick={() => navigate(-1)}>Posts</a> },
                        { title: 'Edit' }
                    ]}
                />
            </PostHeader>
            {
                !post && <Typography.Text type='danger'>Post not found</Typography.Text>
            }
            {
                post && <Layout.Content>
                    <PostForm initialData={post} onSubmit={handleSubmit} />
                    <Layout.Footer style={{ textAlign: 'center' }}>
                        <Typography.Text type='secondary'>Ethnicity Vietnam © 2024</Typography.Text>
                    </Layout.Footer>
                </Layout.Content>
            }
        </Layout >
    );
}

export default PostPage;