import { Post, POST_CATEGORY } from "services/post.service";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import RichTextEditor from "common/RichTextEditor";
import { validateMessages } from "constants/index";
import StorageService from "services/storage.service";
import { makeThumbnail } from "utils/thumbnail";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Radio from "antd/es/radio";
import Select from "antd/es/select";
import Upload from "antd/es/upload";
import Button from "antd/es/button";
import Image from "antd/es/image";

const uploadButton = (
    <button
        style={{
            border: 0,
            background: 'none',
            cursor: 'pointer',
        }}
        type="button"
    >
        <PlusOutlined />
        <div
            style={{
                marginTop: 8,
            }}
        >
            Upload
        </div>
    </button>
);

export function PostForm({ initialData, onSubmit }: { initialData?: Post, onSubmit: any }) {
    const [form] = Form.useForm();
    const [content, setContent] = useState('');
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const handlePreview = async (file: any) => {
        if (file.response) setPreviewImage(file);
        else if (file.url) setPreviewImage(file.url);
        setPreviewOpen(true);
    };

    const uploadThumbnail = async ({ file, onError, onProgress, onSuccess }: any) => {
        const thumbnail = await makeThumbnail(file);
        StorageService.upload(thumbnail, onProgress, onSuccess, onError);
    }

    const normFile = (e: any) => {
        if (e.file.status === 'done')
            return e.file.response;
        return undefined;
    }

    return <Form
        form={form}
        validateMessages={validateMessages}
        colon={false}
        labelCol={{ span: 5 }}
        labelAlign='left'
        style={{ width: 800 }}
        onFinish={onSubmit}
        initialValues={initialData}
    >
        <Form.Item label="Language" name="language" rules={[{ required: true }]}>
            <Radio.Group>
                <Radio.Button value="vn">VN</Radio.Button>
                <Radio.Button value="en">EN</Radio.Button>
            </Radio.Group>
        </Form.Item>
        <Form.Item
            label='Title'
            name='title'
            rules={[{ required: true }, { max: 100 }, { min: 10 }]}
        >
            <Input placeholder="Let us know the title" />
        </Form.Item>
        <Form.Item
            label='Description'
            name='description'
            rules={[{ required: true }, { min: 50 }]}
        >
            <Input.TextArea showCount maxLength={500} style={{ height: 150 }} placeholder="Describe your post here" />
        </Form.Item>
        <Form.Item label="Category" name="category" rules={[{ required: true }]} >
            <Select style={{ width: 130 }} placeholder="Category">
                <Select.Option value={POST_CATEGORY.MEDIA}>Media</Select.Option>
                <Select.Option value={POST_CATEGORY.DISCOVER}>Discover</Select.Option>
                <Select.Option value={POST_CATEGORY.UPDATE}>Update</Select.Option>
                <Select.Option value={POST_CATEGORY.PROJECT}>Project</Select.Option>
                <Select.Option value={POST_CATEGORY.SERVICE}>Service</Select.Option>
            </Select>
        </Form.Item>
        <Form.Item
            name="thumbnailUrl"
            label="Thumbnail"
            rules={[{ required: true }]}
            normalize={normFile}
        >
            <Upload
                name="logo"
                listType="picture-card"
                maxCount={1}
                customRequest={uploadThumbnail}
                onPreview={handlePreview}
                defaultFileList={initialData
                    ? [{
                        uid: initialData.thumbnailUrl,
                        url: initialData.thumbnailUrl,
                        name: "thumbnail.jpg",
                        status: "done",
                    }] : []
                }
            >
                {uploadButton}
            </Upload>
        </Form.Item>
        <Form.Item
            style={{ height: '600px' }}
            layout="vertical"
            label="Content"
            name="content"
            required
        >
            <RichTextEditor style={{ height: '500px', margin: 'auto' }} theme="snow" value={content} onChange={setContent} />
        </Form.Item>
        <Form.Item label="Status" name="status" rules={[{ required: true }]}>
            <Radio.Group>
                <Radio.Button value="published">Published</Radio.Button>
                <Radio.Button value="draft">Draft</Radio.Button>
                <Radio.Button value="archived">Archived</Radio.Button>
            </Radio.Group>
        </Form.Item>
        <Form.Item style={{ display: "flex", width: 800, justifyContent: "end" }}>
            <Button type='primary' htmlType='submit'>
                Confirm
            </Button>
        </Form.Item>
        {previewImage && (
            <Image
                wrapperStyle={{
                    display: 'none',
                }}
                preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                }}
                src={previewImage}
            />
        )}
    </Form>;
}

export default PostForm;