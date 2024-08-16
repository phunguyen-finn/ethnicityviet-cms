import { Menu } from "antd";
import { EditOutlined, SettingOutlined, ShopOutlined, TeamOutlined, GoogleOutlined, CodeOutlined, GithubOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AuthService from "services/auth.service";

export const MENU_ITEM_KEYS = {
    POSTS: 'posts',
    PATTERNS: 'patterns',
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
        icon: <ShopOutlined />,
        label: 'Patterns',
    },
    {
        key: MENU_ITEM_KEYS.ACCOUNTS,
        icon: <TeamOutlined />,
        label: 'Accounts',
    },
    {
        key: MENU_ITEM_KEYS.SETTINGS,
        icon: <SettingOutlined />,
        label: 'Settings',
        children: [
            {
                key: MENU_ITEM_KEYS.STATIC,
                label: 'Static',
            },
            {
                key: MENU_ITEM_KEYS.SIGNOUT,
                label: 'Sign Out'
            }
        ]
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

export default function NavigationMenu() {
    const navigate = useNavigate();

    const onClick = ({ key }: any) => {
        switch (key) {
            case MENU_ITEM_KEYS.POSTS:
                navigate('/');
                break;
            case MENU_ITEM_KEYS.PATTERNS:
                navigate('/patterns');
                break;
            case MENU_ITEM_KEYS.ACCOUNTS:
                navigate('/accounts');
                break;
            case MENU_ITEM_KEYS.SETTINGS:
                navigate('/settings');
                break;
            case MENU_ITEM_KEYS.STATIC:
                navigate('/static');
                break;
            case MENU_ITEM_KEYS.SIGNOUT:
                AuthService.logout();
                break;
            case MENU_ITEM_KEYS.GOOGLE_ANALYTICS:
                window.open('https://console.firebase.google.com/u/1/project/ethnicityvn/analytics/app/web:NzQ4ZGU4YTQtY2Y3Yy00OGNhLWI0OWEtYTU1N2QyNmY5MWMx/overview/reports~2Fdashboard%3Fr%3Dfirebase-overview&fpn%3D1019016524204');
                break;
            case MENU_ITEM_KEYS.CONSOLE:
                window.open('https://console.firebase.google.com/u/1/project/ethnicityvn/overview');
                break;
            case MENU_ITEM_KEYS.GITHUB:
                window.open('https://github.com');
                break;
            default:
                break;
        }
    }

    return <div style={{ display: 'flex', flexDirection: "column" }}>
        <img src='/logo.svg' alt='logo' style={logoStyle} width={250} height={60} />
        <Menu
            style={{
                width: 256,
                height: "calc(100vh - 60px)",
                textAlign: "left",
            }}
            mode="inline"
            items={MENU_ITEMS}
            onSelect={onClick}
            defaultSelectedKeys={[MENU_ITEM_KEYS.POSTS]}
        />
    </div>
}