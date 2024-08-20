import AuthContext from 'contexts/AuthContext';
import { useAuth } from 'hooks/useAuth';
import App from 'antd/es/app';
import 'App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

function AppWrapper() {
  const authContext = useAuth();

  return (
    <AuthContext.Provider value={authContext}>
      <App> <RouterProvider router={router} /> </App>
    </AuthContext.Provider>
  );
}

export default AppWrapper;
