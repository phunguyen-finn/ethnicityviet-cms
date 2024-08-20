import { Outlet } from 'react-router-dom';
import { FolderOpenOutlined } from '@ant-design/icons';
import Header from 'common/Header';
import Layout from 'antd/es/layout';

const layoutStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
}

const description = (
    <>
        Create a collections of patterns. After creating a collection, you can go to Patterns section and add patterns to the created collection.
        Notes that a pattern can only be added to one collection.
    </>
)

export function CollectionsPage() {
    return <Layout style={layoutStyle}>
        <Header icon={<FolderOpenOutlined />} title={'Collections'} description={description} />
        <Outlet />
    </Layout >;
}

export default CollectionsPage;