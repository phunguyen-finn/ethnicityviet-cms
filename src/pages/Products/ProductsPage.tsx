import { Outlet } from 'react-router-dom';
import { ShopOutlined } from '@ant-design/icons';
import Header from 'common/Header';
import Layout from 'antd/es/layout';

const layoutStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
}

const description = (
    <>
        Manage your products here. Note that we rely on third-party services to provide payment service,
        so you need to create a product on Shopee/Stripe and embed the purchase link here.
    </>
)

export function ProductsPage() {
    return <Layout style={layoutStyle}>
        <Header icon={<ShopOutlined />} title={'Products'} description={description} />
        <Outlet />
    </Layout >;
}

export default ProductsPage;