import { Layout, Tabs, Typography } from 'antd';
import { EditOutlined, GlobalOutlined, InboxOutlined } from '@ant-design/icons';
import ListPost from 'pages/Posts/ListPost';
import { POST_STATUS } from 'services/post.service';

const items = [
  {
    key: '1',
    label: `Published`,
    children: <ListPost status={POST_STATUS.PUBLISHED} />,
    icon: <GlobalOutlined />
  },
  {
    key: '2',
    label: 'Draft',
    children: <ListPost status={POST_STATUS.DRAFT} />,
    icon: <EditOutlined />
  },
  {
    key: '3',
    label: 'Archived',
    children: <ListPost status={POST_STATUS.ARCHIVED} />,
    icon: <InboxOutlined />
  }
];

export function PostsPage() {
  const onChange = (key: string) => {
    console.log(key);
  };

  return <Layout style={{ justifyContent: "center", display: "flex", alignItems: "center" }}>
    <Layout.Header style={{ backgroundColor: "#F5F5F5", width: 800, textAlign: "left", padding: 10, height: '125px' }}>
      <Typography>
        <Typography.Title level={3}><EditOutlined style={{ marginRight: 10 }} />Posts Repository</Typography.Title>
        <Typography.Paragraph>
          Manage your posts here. Write posts to share more about Ethnicity's projects, services, and updates.
        </Typography.Paragraph>
      </Typography>
    </Layout.Header>
    <Layout.Content style={{ width: 800 }} >
      <Tabs
        onChange={onChange}
        type="card"
        items={items}
      />
    </Layout.Content>
  </Layout>;
}

export default PostsPage;