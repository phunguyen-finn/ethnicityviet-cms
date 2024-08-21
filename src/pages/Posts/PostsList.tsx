import { CalendarOutlined, UserOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import React, { useEffect, useState } from 'react';
import { Post } from 'services/post.service';
import { Link } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore/lite';
import Divider from 'antd/es/divider';
import List from 'antd/es/list';
import Skeleton from 'antd/es/skeleton';
import Space from 'antd/es/space';
import Badge from 'antd/es/badge';


const scrollableDivStyle = {
    height: 'calc(100vh - 220px)',
    overflow: 'auto',
    padding: '0 16px',
    width: 800,
    border: '1px solid rgba(140, 140, 140, 0.35)',
};

const IconText = ({ icon, text }: any) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const renderItem = (item: Post) => (
    <List.Item
        key={item.id}
        actions={[
            <IconText
                icon={UserOutlined}
                text={`Author by ${item.createdBy}`}
                key="author"
            />,
            <IconText
                icon={CalendarOutlined}
                text={`Updated at ${item.updatedAt.toLocaleString()}`}
                key="updatedAt"
            />
        ]}
        extra={
            <Badge.Ribbon text={item.language.toUpperCase()}>
                <img
                    width={200}
                    alt="thumbnail"
                    src={item.thumbnailUrl}
                />
            </Badge.Ribbon>
        }
    >
        <List.Item.Meta
            title={
                <Link to={`/posts/${item.id}`}>
                    {item.title}
                </Link>
            }
        />
        {item.description}
    </List.Item>
)

const mergeLists = (data: Post[], newData: Post[]) => {
    data = [...data];
    newData = [...newData];
    const ids = new Set(data.map((item) => item.id));
    const merged = data.concat(newData.filter((item) => !ids.has(item.id)));
    return merged;
}

interface postsListProps {
    loadData: (cursor: Timestamp | undefined) => Promise<[Post[], Timestamp | undefined, boolean]>;
}

export const PostsList = ({ loadData }: postsListProps) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Post[]>([]);
    const [cursor, setCursor] = useState<Timestamp | undefined>(undefined);
    const [hasMore, setHasMore] = useState(true);

    const loadMoreData = () => {
        if (loading) return;
        setLoading(true);
        loadData(cursor)
            .then(([posts, cursor, hasMore]) => {
                setData(mergeLists(data, posts));
                setCursor(cursor);
                setLoading(false);
                setHasMore(hasMore);
            });
    };

    useEffect(() => {
        loadMoreData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    dataSource={data}
                    size="large"
                    itemLayout="vertical"
                    renderItem={renderItem}
                />
            </InfiniteScroll>
        </div>
    );
};

export default PostsList;