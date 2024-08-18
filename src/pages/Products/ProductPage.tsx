import { Layout, Breadcrumb, App } from "antd";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductService from "services/product.service";
import ProductForm from "./ProductForm";

const layoutStyle = {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
}

export function ProductPage() {
    let { productId } = useParams();
    const [product, setProduct] = useState<any>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { message } = App.useApp();

    useEffect(() => {
        if (productId && productId !== 'create') {
            ProductService.getProduct(productId).then((product) => setProduct(product)).catch((_) => { }).finally(() => setIsLoading(false));
        } else if (productId === 'create') {
            setIsLoading(false);
        }
    }, [productId]);

    const handleUpdate = (product: any) => {
        if (productId) {
            message.loading('Updating resource...', 0);
            ProductService.updateProduct(productId, product).then(() => {
                message.destroy();
                message.success('Update resource successfully', 5);
                navigate("..", { relative: "path" });
            }).catch((error) => {
                message.destroy();
                message.error('Update resource failed: ' + error.message, 5);
            });
        }
    }

    const handleCreate = (product: any) => {
        message.loading('Creating resource...', 0);
        ProductService.createProduct(product).then(() => {
            message.destroy();
            message.success('Create resource successfully', 5);
            navigate("..", { relative: "path" });
        }).catch((error) => {
            message.destroy();
            message.error('Create resource failed: ' + error.message, 5);
        });
    }

    if (isLoading)
        return null;

    if (productId !== 'create' && !product) {
        return <Navigate to='/products' />;
    }

    return (
        <Layout style={layoutStyle}>
            <Layout>
                <Breadcrumb style={{ marginBottom: 10 }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to=".." relative="path">Products</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>{productId === 'create' ? 'Create' : product.name}</Breadcrumb.Item>
                </Breadcrumb>
                <ProductForm initialData={product} onSubmit={productId === 'create' ? handleCreate : handleUpdate} />
            </Layout>
        </Layout >
    );
}

export default ProductPage;