import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { validateMessages } from "constants/index";
import StorageService from "services/storage.service";
import { makeThumbnail } from "utils/thumbnail";
import { Collection } from "services/collection.service";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Radio from "antd/es/radio";
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

export function CollectionForm({ initialData, onSubmit }: { initialData?: Collection, onSubmit: any }) {
    const [form] = Form.useForm();
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
            label='Name'
            name='name'
            rules={[{ required: true }, { max: 100 }, { min: 5 }]}
        >
            <Input placeholder="Let us know the name of the collection" />
        </Form.Item>
        <Form.Item
            label='Description'
            name='description'
            rules={[{ required: true }, { min: 50 }]}
        >
            <Input.TextArea showCount maxLength={800} style={{ height: 350 }} placeholder="Describe your collection here" />
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

export default CollectionForm;