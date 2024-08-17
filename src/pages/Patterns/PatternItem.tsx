import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, List, Badge, Typography } from "antd";
import { Link } from "react-router-dom";

export function PatternItem({ item, handleDelete, handleEdit }: any) {
    const actions = [
        <EditOutlined key="edit" onClick={handleEdit} />,
        <DeleteOutlined key="delete" onClick={handleDelete} />,
    ];

    const description = (
        <Typography>
            <Typography.Paragraph>
                {item.description.slice(0, 20) + "..."}
            </Typography.Paragraph>
        </Typography>
    )

    return <List.Item key={item.id} >
        <Link to={`${item.id}`}>
            <Badge.Ribbon text={item.language.toUpperCase()}>
                <Card
                    actions={actions}
                    hoverable
                    style={{
                        width: 250,
                    }}
                    cover={<img alt="example" width={250} height={250} src={item.thumbnailUrl} />}
                >
                    <Card.Meta title={item.name} description={description} />
                </Card>
            </Badge.Ribbon>
        </Link>
    </List.Item >
}
