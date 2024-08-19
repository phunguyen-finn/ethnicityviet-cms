import { App, Divider, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import CardItem from './CardItem';

const scrollableDivStyle = {
    height: 'calc(100vh - 220px)',
    overflow: 'auto',
    padding: '0 16px',
    width: 800,
    border: '1px solid rgba(140, 140, 140, 0.35)',
};

const mergeLists = (data: Item[], newData: Item[]) => {
    data = [...data];
    newData = [...newData];
    const ids = new Set(data.map((item) => item.id));
    const merged = data.concat(newData.filter((item) => !ids.has(item.id)));
    return merged;
}

interface Item {
    id: string;
    name: string;
    description: string;
    thumbnailUrl: string;
}

interface GridListProps {
    loadData: (cursor: Timestamp | undefined) => Promise<[Item[], Timestamp | undefined, boolean]>;
    handleDelete: (id: string) => Promise<void>;
}

export function GridList({ loadData, handleDelete }: GridListProps) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Item[]>([]);
    const [cursor, setCursor] = useState<Timestamp | undefined>(undefined);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();
    const { message } = App.useApp();

    const loadMoreData = () => {
        if (loading || !hasMore) return;
        setLoading(true);
        loadData(cursor).then(([items, nextCursor, hasMore]) => {
            setData(mergeLists(data, items));
            setCursor(nextCursor);
            setHasMore(hasMore);
            setLoading(false);
        });
    };

    useEffect(() => {
        loadMoreData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEdit = (id: string) => {
        navigate(`${id}`);
    }

    const handleDeleteWrapper = (id: string) => {
        handleDelete(id).then(() => {
            message.success("Resource deleted successfully", 5);
            setData([...data.filter((item) => item.id !== id)]);
        }).catch((error) => {
            message.error(error.message, 5);
        })
    }

    const renderItem = (item: Item) => (
        <CardItem key={item.id} item={item} handleDelete={() => handleDeleteWrapper(item.id)} handleEdit={() => handleEdit(item.id)} />
    );

    return (
        <div id="scrollableDiv" style={scrollableDivStyle}>
            <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                hasMore={hasMore}
                loader={<Skeleton avatar paragraph={{ rows: 3 }} active />}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    style={{ width: '100%', overflowX: 'hidden' }}
                    dataSource={data}
                    renderItem={renderItem}
                />
            </InfiniteScroll>
        </div>
    );
};

export default GridList;