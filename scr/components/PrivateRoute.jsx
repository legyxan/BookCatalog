import { Navigate, useLocation } from 'react-router-dom';

/**
 * Защищённый маршрут: пускает только авторизованных.
 * Если пользователя нет — редирект на /login и запоминаем, откуда пришли.
 */
function PrivateRoute({ children }) {
  const user = localStorage.getItem('user');
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default PrivateRoute;