import { Button, Layout, Tabs } from 'antd';
import { EditOutlined, GlobalOutlined, InboxOutlined } from '@ant-design/icons';
import PostsList from 'pages/Posts/PostsList';
import { POST_STATUS } from 'services/post.service';
import PostHeader from 'pages/Posts/PostHeader';
import { Link } from 'react-router-dom';

const items = [
  {
    key: '1',
    label: `Published`,
    children: <PostsList status={POST_STATUS.PUBLISHED} />,
    icon: <GlobalOutlined />
  },
  {
    key: '2',
    label: 'Draft',
    children: <PostsList status={POST_STATUS.DRAFT} />,
    icon: <EditOutlined />
  },
  {
    key: '3',
    label: 'Archived',
    children: <PostsList status={POST_STATUS.ARCHIVED} />,
    icon: <InboxOutlined />
  }
];

const layoutStyle = {
  justifyContent: "center",
  display: "flex",
  alignItems: "center",
}

export function PostsPage() {
  const onChange = (key: string) => {
    console.log(key);
  };

  return <Layout style={layoutStyle}>
    <PostHeader />
    <Layout.Content style={{ display: 'flex', position: 'relative' }}>
      <Tabs onChange={onChange} type="card" items={items} />
      <Link to='posts/create' style={{ position: 'absolute', right: 0 }}>
        <Button type='primary'>Create</Button>
      </Link>
    </Layout.Content>
  </Layout>;
}

export default PostsPage;