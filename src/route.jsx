import { BrowserRouter } from 'react-router';
import { GenerateRoutes } from '@/router/Rules.jsx';

const AdminRoute = () => {
  return (
    <BrowserRouter>
      <GenerateRoutes />
    </BrowserRouter>
  );
};

export default AdminRoute;
