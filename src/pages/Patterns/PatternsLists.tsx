import { Button, Layout, Tabs } from "antd";
import { DeploymentUnitOutlined, FolderOpenOutlined, HighlightOutlined, PullRequestOutlined } from "@ant-design/icons";
import PatternService, { PATTERN_CATEGORY } from "services/pattern.service";
import { Link } from "react-router-dom";
import { Timestamp } from "firebase/firestore";
import GridList from "common/GridList";

const loadData = (category: PATTERN_CATEGORY) => (cursor: Timestamp | undefined) => {
    return PatternService.getPatternsByCategory(category, cursor);
}

const handleDelete = (id: string) => {
    return PatternService.deletePattern(id);
}

const items = [
    {
        key: 'preserve',
        label: `Preserve`,
        children: <GridList handleDelete={handleDelete} loadData={loadData(PATTERN_CATEGORY.PRESERVE)} />,
        icon: <FolderOpenOutlined />
    },
    {
        key: 'develop',
        label: 'Develop',
        children: <GridList handleDelete={handleDelete} loadData={loadData(PATTERN_CATEGORY.DEVELOP)} />,
        icon: <PullRequestOutlined />
    },
    {
        key: 'apply',
        label: 'Apply',
        children: <GridList handleDelete={handleDelete} loadData={loadData(PATTERN_CATEGORY.APPLY)} />,
        icon: <DeploymentUnitOutlined />
    },
    {
        key: 'illustration',
        label: 'Illustration',
        children: <GridList handleDelete={handleDelete} loadData={loadData(PATTERN_CATEGORY.ILLUSTRATION)} />,
        icon: <HighlightOutlined />
    }
];

export function PatternsLists() {
    return (
        <Layout style={{ display: 'flex', position: 'relative' }}>
            <Tabs type="card" items={items} />
            <Link to='/patterns/create' style={{ position: 'absolute', right: 0 }}>
                <Button type='primary'>Create</Button>
            </Link>
        </Layout>
    );
}

export default PatternsLists;