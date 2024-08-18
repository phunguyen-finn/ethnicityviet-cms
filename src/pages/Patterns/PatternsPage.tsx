import { Layout } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import Header from 'common/Header';

const description = (
    <>
        Showcase the patterns library. You can create, update, delete and view patterns here.
        Please aware that patterns shown here can be downloaded free of charge in the main site.
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