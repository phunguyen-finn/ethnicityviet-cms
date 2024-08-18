import { Menu } from "antd";
import { EditOutlined, LogoutOutlined, ShopOutlined, TeamOutlined, GoogleOutlined, CodeOutlined, GithubOutlined, FolderOpenOutlined, CopyOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import AuthService from "services/auth.service";
import { useContext } from "react";
import AuthContext from "contexts/AuthContext";
import Typography from "antd/es/typography/Typography";

export const MENU_ITEM_KEYS = {
    POSTS: 'posts',
    PATTERNS: 'patterns',
    COLLECTIONS: 'collections',
    PRODUCTS: 'products',
    ACCOUNTS: 'accounts',
    SETTINGS: 'settings',
    STATIC: 'static',
    SIGNOUT: 'signout',
    GOOGLE_ANALYTICS: 'google-analytics',
    CONSOLE: 'console',
    GITHUB: 'github',
}

export const MENU_ITEMS: any = [
    {
        key: MENU_ITEM_KEYS.POSTS,
        icon: <EditOutlined />,
        label: 'Posts',
    },
    {
        key: MENU_ITEM_KEYS.PATTERNS,
        icon: <CopyOutlined />,
        label: 'Patterns',
    },
    {
        key: MENU_ITEM_KEYS.COLLECTIONS,
        icon: <FolderOpenOutlined />,
        label: 'Collections',
    },
    {
        key: MENU_ITEM_KEYS.PRODUCTS,
        icon: <ShopOutlined />,
        label: 'Products',
    },
    {
        key: MENU_ITEM_KEYS.ACCOUNTS,
        icon: <TeamOutlined />,
        label: 'Accounts',
    },
    {
        key: MENU_ITEM_KEYS.SIGNOUT,
        label: 'Sign Out',
        icon: <LogoutOutlined />,
    },
    {
        type: "divider",
    },
    {
        type: 'group',
        label: 'External Links',
        children: [
            {
                key: MENU_ITEM_KEYS.GOOGLE_ANALYTICS,
                icon: <GoogleOutlined />,
                label: 'Google Analytics'
            },
            {
                key: MENU_ITEM_KEYS.CONSOLE,
                icon: <CodeOutlined />,
                label: 'Console'
            },
            {
                key: MENU_ITEM_KEYS.GITHUB,
                icon: <GithubOutlined />,
                label: 'GitHub'
            },
        ],
    }
];

const logoStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '0px'
}

const textStyle: React.CSSProperties = {
    textAlign: 'left',
    padding: '0px 30px',
    marginBottom: 10,
    maxHeight: 54,
    textOverflow: "ellipsis",
    msTextOverflow: "ellipsis",
    display: 'inline-block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
}


export default function NavigationMenu() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const authContext = useContext(AuthContext);

    const onClick = ({ key }: any) => {
        switch (key) {
            case MENU_ITEM_KEYS.POSTS:
                navigate('/');
                break;
            case MENU_ITEM_KEYS.GOOGLE_ANALYTICS:
                window.open('https://console.firebase.google.com/u/1/project/ethnicityvn/analytics/app/web:NzQ4ZGU4YTQtY2Y3Yy00OGNhLWI0OWEtYTU1N2QyNmY5MWMx/overview/reports~2Fdashboard%3Fr%3Dfirebase-overview&fpn%3D1019016524204');
                break;
            case MENU_ITEM_KEYS.CONSOLE:
                window.open('https://console.firebase.google.com/u/1/project/ethnicityvn/overview');
                break;
            case MENU_ITEM_KEYS.GITHUB:
                window.open('https://github.com/nnphongphu/ethnicityviet-cms-client');
                break;
            case MENU_ITEM_KEYS.SIGNOUT:
                AuthService.logout();
                break;
            default:
                navigate(key);
                break;
        }
    }

    return <div style={{ display: 'flex', flexDirection: "column" }}>
        <img src='/logo.svg' alt='logo' style={logoStyle} width={250} height={60} />
        <Typography style={textStyle}>
            🚀 Signed in as <br />
            <b>{authContext.user?.email}</b>
        </Typography>
        <Menu
            style={{
                width: 256,
                height: "calc(100vh - 60px - 54px)",
                textAlign: "left",
            }}
            mode="inline"
            items={MENU_ITEMS}
            onSelect={onClick}
            selectedKeys={[pathname.split('/')[1] || 'posts']}
        />
    </div>
}