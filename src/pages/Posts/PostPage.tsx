import { Layout, Breadcrumb, Typography, App } from "antd";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import PostService from "services/post.service";
import { useEffect, useState } from "react";
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
        if (postId && postId !== 'create') {
            PostService.getPost(postId).then((post) => setPost(post)).catch((_) => { }).finally(() => setIsLoading(false));
        } else if (postId === 'create')
            setIsLoading(false);
    }, [postId]);

    const handleUpdate = (post: any) => {
        if (postId) {
            message.loading('Updating resource...', 0);
            PostService.updatePost(postId, post).then(() => {
                message.destroy();
                message.success('Update resource successfully', 5);
                navigate("..");
            }).catch((error) => {
                message.destroy();
                message.error('Update resource failed: ' + error.message, 5);
            });
        }
    }

    const handleCreate = (post: any) => {
        message.loading('Create resource...', 0);
        PostService.createPost(post).then(() => {
            message.destroy();
            message.success('Create resource successfully', 5);
            navigate("..");
        }).catch((error) => {
            message.destroy();
            message.error('Create resource failed: ' + error.message, 5);
        });
    }

    if (isLoading)
        return null;

    if (postId !== 'create' && !post) {
        return <Navigate to='/' />;
    }

    return (
        <Layout style={layoutStyle}>
            <Layout>
                <Breadcrumb style={{ marginBottom: 10 }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/">Products</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>{postId === 'create' ? 'Create' : post.title}</Breadcrumb.Item>
                </Breadcrumb>
                <PostForm initialData={post} onSubmit={postId === 'create' ? handleCreate : handleUpdate} />
            </Layout>
        </Layout >
    );
}

export default PostPage;