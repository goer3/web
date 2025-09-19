import { Outlet } from 'react-router';

const ErrorLayout = () => {
  return (
    <>
      <h1>ERROR</h1>
      <Outlet />
    </>
  );
};

export default ErrorLayout;
