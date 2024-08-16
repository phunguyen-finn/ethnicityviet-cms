import AuthContext from 'contexts/AuthContext';
import { useAuth } from 'hooks/useAuth';
import AppRoutes from 'routes';
import { App } from 'antd';
import 'App.css';

function AppWrapper() {
  const authContext = useAuth();

  return (
    <AuthContext.Provider value={authContext}>
      <App> <AppRoutes /> </App>
    </AuthContext.Provider>
  );
}

export default AppWrapper;
