import { Layout } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import Header from 'common/Header';

const layoutStyle = {
  display: "flex",
  alignItems: "center",
}

const description = (
  <>
    Manage your posts here. Write posts to share more about
    Ethnicity's projects, services, and updates.
    Note that only published posts are visible to the main site, you
    can always change the status of the post to draft or archived.
  </>
)

export function PostsPage() {
  return <Layout style={layoutStyle}>
    <Header icon={<EditOutlined />} title="Posts Repository" description={description} />
    <Outlet />
  </Layout>;
}

export default PostsPage;