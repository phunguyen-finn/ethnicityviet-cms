import { Layout, Tabs } from 'antd';
import { EditOutlined, GlobalOutlined, InboxOutlined } from '@ant-design/icons';
import PostsList from 'pages/Posts/PostsList';
import { POST_STATUS } from 'services/post.service';
import { Header } from 'pages/Posts/Header';

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

export function PostsPage() {
  const onChange = (key: string) => {
    console.log(key);
  };

  return <Layout style={{ justifyContent: "center", display: "flex", alignItems: "center" }}>
    <Header />
    <Layout.Content style={{ width: 800 }} >
      <Tabs onChange={onChange} type="card" items={items} />
    </Layout.Content>
  </Layout>;
}

export default PostsPage;