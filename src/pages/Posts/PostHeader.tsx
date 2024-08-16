import { Layout, Typography } from "antd"
import { EditOutlined } from "@ant-design/icons"

export function PostHeader({ children }: { children?: React.ReactNode }) {
    return <Layout.Header style={{ backgroundColor: "#F5F5F5", maxWidth: 800, textAlign: "left", padding: 10, height: 'auto' }}>
        <Typography>
            <Typography.Title level={3}><EditOutlined style={{ marginRight: 10 }} />Posts Repository</Typography.Title>
            <Typography.Paragraph>
                Manage your posts here. Write posts to share more about
                Ethnicity's projects, services, and updates.
                Note that only published posts are visible to the main site, you
                can always change the status of the post to draft or archived.
            </Typography.Paragraph>
        </Typography>
        {children}
    </Layout.Header>
}

export default PostHeader;