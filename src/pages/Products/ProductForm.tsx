import { Form, Input, Radio, Upload, Button, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { validateMessages } from "constants/index";
import StorageService from "services/storage.service";
import { makeThumbnail } from "utils/thumbnail";
import { Product } from "services/product.service";

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

export function ProductForm({ initialData, onSubmit }: { initialData?: Product, onSubmit: any }) {
    const [form] = Form.useForm();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const handlePreview = async (file: any) => {
        if (file.response) setPreviewImage(file);
        else if (file.url) setPreviewImage(file.url);
        setPreviewOpen(true);
    };

    const uploadPattern = async ({ file, onError, onProgress, onSuccess }: any) => {
        const thumbnail = await makeThumbnail(file);
        const thumbnailUrl = await StorageService.upload(thumbnail);
        form.setFieldsValue({ thumbnailUrl });
        StorageService.upload(file, onProgress, onSuccess, onError);
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
            <Input placeholder="Let us know the name of the product" />
        </Form.Item>
        <Form.Item
            label='Description'
            name='description'
            rules={[{ required: true }, { min: 50 }]}
        >
            <Input.TextArea showCount maxLength={800} style={{ height: 350 }} placeholder="Describe your product here" />
        </Form.Item>
        <Form.Item
            name="thumbnailUrl"
            rules={[{ required: true }]}
            hidden
        ></Form.Item>
        <Form.Item
            name="hdUrl"
            label="Pattern image"
            rules={[{ required: true }]}
            normalize={normFile}
        >
            <Upload
                name="logo"
                listType="picture-card"
                maxCount={1}
                customRequest={uploadPattern}
                onPreview={handlePreview}
                defaultFileList={initialData
                    ? [{
                        uid: initialData.hdUrl,
                        url: initialData.hdUrl,
                        name: "thumbnail.jpg",
                        status: "done",
                        thumbUrl: initialData.thumbnailUrl,
                    }] : []
                }
            >
                {uploadButton}
            </Upload>
        </Form.Item>
        <Form.Item
            name="purchaseUrl"
            label="Purchase URL"
            rules={[{ required: true }, { type: 'url' }]}
        >
            <Input placeholder="The url to third-party product link" />
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

export default ProductForm;