import { Layout, Typography } from "antd"

interface headerProps {
    icon: React.ReactNode;
    title: string;
    description: React.ReactNode;
}

export function Header({ icon, title, description }: headerProps) {
    return <Layout.Header style={{ backgroundColor: "#F5F5F5", width: 800, textAlign: "left", padding: 0, height: 'auto' }}>
        <Typography>
            <Typography.Title level={3}>{icon} {title}</Typography.Title>
            <Typography.Paragraph>
                {description}
            </Typography.Paragraph>
        </Typography>
    </Layout.Header>
}

export default Header;