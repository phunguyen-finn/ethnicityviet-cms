import { Layout, Typography } from "antd"
import { CopyOutlined } from "@ant-design/icons"

export function PatternsHeader({ children }: { children?: React.ReactNode }) {
    return <Layout.Header style={{ backgroundColor: "#F5F5F5", width: 800, textAlign: "left", padding: 10, height: 'auto' }}>
        <Typography>
            <Typography.Title level={3}><CopyOutlined style={{ marginRight: 10 }} />Patterns Library</Typography.Title>
            <Typography.Paragraph>
                Showcase the patterns library. Add item to store. Create collections.
            </Typography.Paragraph>
        </Typography>
        {children}
    </Layout.Header>
}

export default PatternsHeader;