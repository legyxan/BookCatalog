import { Navigate } from 'react-router-dom';

/**
 * Маршрут только для администратора.
 */
function AdminRoute({ children }) {
  const role = localStorage.getItem('role');

  if (role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;