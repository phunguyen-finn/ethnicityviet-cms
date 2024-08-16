import { Divider, List, Skeleton, Space, Badge } from 'antd';
import { CloudUploadOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import React, { useEffect, useState } from 'react';
import PostService, { Post } from 'services/post.service';
import { Link } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore';

const scrollableDivStyle = {
    height: 'calc(100vh - 140px - 60px)',
    overflow: 'auto',
    padding: '0 16px',
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
            <img
                width={250}
                alt="thumbnail"
                src={item.thumbnailUrl}
            />
        }
    >
        <List.Item.Meta
            title={
                <Badge
                    color={"blue"}
                    count={item.language.toUpperCase()}
                    offset={[20, 5]}
                >
                    <Link to={`posts/${item.id}`}>
                        {item.title}
                    </Link>
                </Badge>}
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

export const ListPost = ({ status }: any) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Post[]>([]);
    const [cursor, setCursor] = useState<Timestamp | undefined>(undefined);
    const [hasMore, setHasMore] = useState(true);

    const loadMoreData = () => {
        if (loading) return;
        setLoading(true);
        PostService.getPosts(status, cursor)
            .then(([posts, cursor, hasMore]) => {
                setData(mergeLists(data, posts));
                setCursor(cursor);
                setLoading(false);
                setHasMore(hasMore);
            });
    };

    useEffect(() => {
        loadMoreData();
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


export default ListPost;