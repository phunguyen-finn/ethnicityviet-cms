import { Layout, Breadcrumb, Typography, App } from "antd";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PatternForm } from "./PatternForm";
import PatternService from "services/pattern.service";

const layoutStyle = {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
}

export function PatternPage() {
    let { patternId } = useParams();
    const [pattern, setPattern] = useState<any>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { message } = App.useApp();

    useEffect(() => {
        if (patternId && patternId !== 'create') {
            PatternService.getPattern(patternId).then((pattern) => setPattern(pattern)).catch((_) => { }).finally(() => setIsLoading(false));
        } else if (patternId === 'create')
            setIsLoading(false);
    }, [patternId]);

    const handleUpdate = (pattern: any) => {
        if (patternId) {
            message.loading('Updating pattern...', 0);
            PatternService.updatePattern(patternId, pattern).then(() => {
                message.destroy();
                message.success('Update pattern successfully', 5);
                navigate("..", { relative: "path" });
            }).catch((error) => {
                message.destroy();
                message.error('Update pattern failed: ' + error.message, 5);
            });
        }
    }

    const handleCreate = (pattern: any) => {
        message.loading('Creating resource...', 0);
        PatternService.createPattern(pattern).then(() => {
            message.destroy();
            message.success('Create resource successfully', 5);
            navigate("..", { relative: "path" });
        }).catch((error) => {
            message.destroy();
            message.error('Create resource failed: ' + error.message, 5);
        });
    }

    if (isLoading)
        return null;

    if (patternId !== 'create' && !pattern) {
        return <Navigate to='/' />;
    }

    return (
        <Layout style={layoutStyle}>
            <Layout>
                <Breadcrumb style={{ marginBottom: 10 }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to=".." relative="path">Pattern</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>{patternId === 'create' ? 'Create' : pattern.name}</Breadcrumb.Item>
                </Breadcrumb>
                <PatternForm initialData={pattern} onSubmit={patternId === 'create' ? handleCreate : handleUpdate} />
                <Layout.Footer style={{ textAlign: 'center' }}>
                    <Typography.Text type='secondary'>Ethnicity Vietnam © 2024</Typography.Text>
                </Layout.Footer>
            </Layout>
        </Layout >
    );
}

export default PatternPage;