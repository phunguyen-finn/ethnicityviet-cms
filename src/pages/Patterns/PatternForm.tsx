import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { validateMessages } from "constants/index";
import StorageService from "services/storage.service";
import { makeThumbnail } from "utils/thumbnail";
import { Pattern, PATTERN_CATEGORY } from "services/pattern.service";
import { Collection } from "services/collection.service";
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

export function PatternForm({ initialData, onSubmit, collections }: { initialData?: Pattern, onSubmit: any, collections: Collection[] }) {
    const [form] = Form.useForm();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const handlePreview = async (file: any) => {
        if (file.response) setPreviewImage(file);
        else if (file.url) setPreviewImage(file.url);
        setPreviewOpen(true);
    };

    const handlePreviewVector = async (file: any) => {
        window.open(file.url, '_blank');
    }

    const uploadPattern = async ({ file, onError, onProgress, onSuccess }: any) => {
        const thumbnail = await makeThumbnail(file);
        const thumbnailUrl = await StorageService.upload(thumbnail);
        form.setFieldsValue({ thumbnailUrl });
        StorageService.upload(file, onProgress, onSuccess, onError);
    }

    const uploadVector = async ({ file, onError, onProgress, onSuccess }: any) => {
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
                <Radio.Button value="vi">VN</Radio.Button>
                <Radio.Button value="en">EN</Radio.Button>
            </Radio.Group>
        </Form.Item>
        <Form.Item
            label='Name'
            name='name'
            rules={[{ required: true }, { max: 100 }, { min: 5 }]}
        >
            <Input placeholder="Let us know the name of the pattern" />
        </Form.Item>
        <Form.Item
            label='Description'
            name='description'
            rules={[{ required: true }, { min: 50 }]}
        >
            <Input.TextArea showCount maxLength={800} style={{ height: 350 }} placeholder="Describe your pattern here" />
        </Form.Item>
        <Form.Item label="Category" name="category" rules={[{ required: true }]} >
            <Select style={{ width: 130 }} placeholder="Category">
                <Select.Option value={PATTERN_CATEGORY.PRESERVE}>Preserve</Select.Option>
                <Select.Option value={PATTERN_CATEGORY.DEVELOP}>Develop</Select.Option>
                <Select.Option value={PATTERN_CATEGORY.APPLY}>Apply</Select.Option>
                <Select.Option value={PATTERN_CATEGORY.ILLUSTRATION}>Illustration</Select.Option>
            </Select>
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
            name="fileUrl"
            label="Pattern vector file"
            rules={[{ required: true }]}
            normalize={normFile}
        >
            <Upload
                name="logo"
                listType="text"
                maxCount={1}
                customRequest={uploadVector}
                onPreview={handlePreviewVector}
                defaultFileList={initialData
                    ? [{
                        uid: initialData.fileUrl,
                        url: initialData.fileUrl,
                        name: "vector_file",
                        status: "done",
                    }] : []
                }
            >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
        </Form.Item>
        <Form.Item
            name="collectionId"
            label="Collection"
            required
        >
            <Select style={{ width: 130 }} placeholder="Collection" defaultValue={null}>
                <Select.Option value={null}>None</Select.Option>
                {
                    collections.map(
                        (collection) => (
                            <Select.Option key={collection.id} value={collection.id}>
                                {collection.name}
                            </Select.Option>
                        )
                    )
                }
            </Select>
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

export default PatternForm;