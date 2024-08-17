import { App, Divider, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import PatternService, { PATTERN_CATEGORY } from 'services/pattern.service';
import { Pattern } from 'services/pattern.service';
import { PatternItem } from './PatternItem';
import { useNavigate } from 'react-router-dom';

const scrollableDivStyle = {
    height: 'calc(100vh - 220px)',
    overflow: 'auto',
    padding: '0 16px',
    width: 800,
    border: '1px solid rgba(140, 140, 140, 0.35)',
};

const mergeLists = (data: Pattern[], newData: Pattern[]) => {
    data = [...data];
    newData = [...newData];
    const ids = new Set(data.map((item) => item.id));
    const merged = data.concat(newData.filter((item) => !ids.has(item.id)));
    return merged;
}

export function PatternsList({ category }: { category: PATTERN_CATEGORY }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Pattern[]>([]);
    const [cursor, setCursor] = useState<Timestamp | undefined>(undefined);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();
    const { message } = App.useApp();

    const loadMoreData = () => {
        if (loading || !hasMore) return;
        setLoading(true);
        PatternService.getPatternsByCategory(category, cursor).then(([patterns, nextCursor, hasMore]) => {
            setData(mergeLists(data, patterns));
            setCursor(nextCursor);
            setHasMore(hasMore);
            setLoading(false);
        });
    };

    useEffect(() => {
        loadMoreData();
    }, []);

    const handleEdit = (id: string) => {
        navigate(`${id}`);
    }

    const handleDelete = (id: string) => {
        PatternService.deletePattern(id).then(() => {
            message.success("Pattern deleted successfully", 5);
            setData(data.filter((item) => item.id !== id));
        }).catch((error) => {
            message.error(error.message, 5);
        })
    }

    const renderItem = (item: Pattern) => (
        <PatternItem key={item.id} item={item} handleDelete={handleDelete} handleEdit={handleEdit} />
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

export default PatternsList;