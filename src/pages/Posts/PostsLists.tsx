import { DeploymentUnitOutlined, FolderOpenOutlined, PullRequestOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Timestamp } from "firebase/firestore/lite";
import PostService, { POST_STATUS } from "services/post.service";
import PostsList from "./PostsList";
import Button from 'antd/es/button';
import Layout from 'antd/es/layout';
import Tabs from 'antd/es/tabs';

const loadData = (status: POST_STATUS) => (cursor: Timestamp | undefined) => {
    return PostService.getPostsByStatus(status, cursor) as any;
}

const items = [
    {
        key: 'published',
        label: 'Published',
        children: <PostsList loadData={loadData(POST_STATUS.PUBLISHED)} />,
        icon: <FolderOpenOutlined />
    },
    {
        key: 'draft',
        label: 'Draft',
        children: <PostsList loadData={loadData(POST_STATUS.DRAFT)} />,
        icon: <PullRequestOutlined />
    },
    {
        key: 'archive',
        label: 'Archive',
        children: <PostsList loadData={loadData(POST_STATUS.ARCHIVED)} />,
        icon: <DeploymentUnitOutlined />
    },
];

export function PostsLists() {
    return (
        <Layout style={{ display: 'flex', position: 'relative' }}>
            <Tabs type="card" items={items} />
            <Link to='/posts/create' style={{ position: 'absolute', right: 0 }}>
                <Button type='primary'>Create</Button>
            </Link>
        </Layout>
    );
}

export default PostsLists;