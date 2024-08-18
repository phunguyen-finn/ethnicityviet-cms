import { Layout, Breadcrumb, App } from "antd";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CollectionForm from "./CollectionForm";
import CollectionService from "services/collection.service";

const layoutStyle = {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
}

export function CollectionPage() {
    let { collectionId } = useParams();
    const [collection, setCollection] = useState<any>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { message } = App.useApp();

    useEffect(() => {
        if (collectionId && collectionId !== 'create') {
            CollectionService.getCollection(collectionId).then((collection) => setCollection(collection)).catch((_) => { }).finally(() => setIsLoading(false));
        } else if (collectionId === 'create') {
            setIsLoading(false);
        }
    }, [collectionId]);

    const handleUpdate = (collection: any) => {
        if (collectionId) {
            message.loading('Updating resource...', 0);
            CollectionService.updateCollection(collectionId, collection).then(() => {
                message.destroy();
                message.success('Update resource successfully', 5);
                navigate("..", { relative: "path" });
            }).catch((error) => {
                message.destroy();
                message.error('Update resource failed: ' + error.message, 5);
            });
        }
    }

    const handleCreate = (collection: any) => {
        message.loading('Creating resource...', 0);
        CollectionService.createCollection(collection).then(() => {
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

    if (collectionId !== 'create' && !collection) {
        return <Navigate to='/collections' />;
    }

    return (
        <Layout style={layoutStyle}>
            <Layout>
                <Breadcrumb style={{ marginBottom: 10 }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to=".." relative="path">Collections</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>{collectionId === 'create' ? 'Create' : collection.name}</Breadcrumb.Item>
                </Breadcrumb>
                <CollectionForm initialData={collection} onSubmit={collectionId === 'create' ? handleCreate : handleUpdate} />
            </Layout>
        </Layout >
    );
}

export default CollectionPage;