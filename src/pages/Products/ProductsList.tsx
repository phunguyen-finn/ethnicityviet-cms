import GridList from "common/GridList";
import { Link } from "react-router-dom";
import ProductService from "services/product.service";
import Button from 'antd/es/button';
import Layout from 'antd/es/layout';

const contentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    width: 800,
    height: 40,
    justifyContent: 'end',
    marginBottom: 16
}

export function ProductsList() {
    const handleDelete = (id: string) => {
        return ProductService.deleteProduct(id);
    }

    const loadData = ProductService.getProducts;

    return (
        <Layout>
            <div style={contentStyle}>
                <Link to="/products/create" style={{ width: 75 }}>
                    <Button type='primary' style={{ position: 'absolute' }}>Create</Button>
                </Link>
            </div>
            <GridList handleDelete={handleDelete} loadData={loadData} />
        </Layout>
    );
}

export default ProductsList