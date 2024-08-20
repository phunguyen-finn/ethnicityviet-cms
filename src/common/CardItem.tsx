import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Card from "antd/es/card";
import List from "antd/es/list";
import Badge from "antd/es/badge";
import Typography from "antd/es/typography";
import Popconfirm from "antd/es/popconfirm";

export function CardItem({ item, handleDelete, handleEdit }: any) {
    const actions = [
        <EditOutlined key="edit" onClick={handleEdit} />,
        <Popconfirm
            title="Delete this resource"
            description="Are you sure to delete?"
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
        >
            <DeleteOutlined key="delete" />,
        </Popconfirm>
    ];

    const description = (
        <Typography>
            <Typography.Paragraph>
                {item.description.slice(0, 20) + "..."}
            </Typography.Paragraph>
        </Typography>
    )

    return <List.Item key={item.id} >
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
    </List.Item >
}


export default CardItem;