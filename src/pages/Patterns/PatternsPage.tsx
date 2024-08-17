import { Button, Layout, Tabs } from 'antd';
import { PullRequestOutlined, FolderOpenOutlined, HighlightOutlined, DeploymentUnitOutlined } from '@ant-design/icons';
import PatternsHeader from 'pages/Patterns/PatternsHeader';
import { Link } from 'react-router-dom';
import PatternsList from 'pages/Patterns/PatternsList';
import { PATTERN_CATEGORY } from 'services/pattern.service';

const items = [
    {
        key: 'preserve',
        label: `Preserve`,
        children: <PatternsList category={PATTERN_CATEGORY.PRESERVE} />,
        icon: <FolderOpenOutlined />
    },
    {
        key: 'develop',
        label: 'Develop',
        children: <PatternsList category={PATTERN_CATEGORY.DEVELOP} />,
        icon: <PullRequestOutlined />
    },
    {
        key: 'apply',
        label: 'Apply',
        children: <PatternsList category={PATTERN_CATEGORY.APPLY} />,
        icon: <DeploymentUnitOutlined />
    },
    {
        key: 'illustration',
        label: 'illustration',
        children: <PatternsList category={PATTERN_CATEGORY.ILLUSTRATION} />,
        icon: <HighlightOutlined />
    }
];

const layoutStyle = {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
}

export function PatternsPage() {
    return <Layout style={layoutStyle}>
        <PatternsHeader />
        <Layout.Content style={{ display: 'flex', position: 'relative' }}>
            <Tabs type="card" items={items} />
            <Link to='patterns/create' style={{ position: 'absolute', right: 0 }}>
                <Button type='primary'>Create</Button>
            </Link>
        </Layout.Content>
    </Layout>;
}

export default PatternsPage;