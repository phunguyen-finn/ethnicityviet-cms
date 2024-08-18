import { Layout } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import Header from 'common/Header';

const description = (
    <>
        Showcase the patterns library. <br /> Add item to store. Create collections.
    </>
);

const layoutStyle = {
    alignItems: "center",
    display: "flex",
}

export function PatternsPage() {
    return <Layout style={layoutStyle}>
        <Header icon={<CopyOutlined />} description={description} title='Patterns Library' />
        <Outlet />
    </Layout>;
}

export default PatternsPage;