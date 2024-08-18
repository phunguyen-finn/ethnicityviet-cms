import { Button, Layout } from "antd";
import GridList from "common/GridList";
import { Link } from "react-router-dom";
import CollectionService from "services/collection.service";

const contentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    width: 800,
    height: 40,
    justifyContent: 'end',
    marginBottom: 16
}

export function CollectionsList() {
    const handleDelete = (id: string) => {
        return CollectionService.deleteCollection(id);
    }

    const loadData = CollectionService.getCollections;

    return (
        <Layout>
            <div style={contentStyle}>
                <Link to="/collections/create" style={{ width: 75 }}>
                    <Button type='primary' style={{ position: 'absolute' }}>Create</Button>
                </Link>
            </div>
            <GridList handleDelete={handleDelete} loadData={loadData} />
        </Layout>
    );
}

export default CollectionsList