import { Link } from 'react-router-dom';
import { IconLock } from '../components/Icons';

function NotFound() {
  return (
    <div className="empty">
      <span className="empty__icon"><IconLock size={56} /></span>
      <h1>404 — Страница не найдена</h1>
      <p>Такой страницы не существует.</p>
      <Link className="btn btn--primary" to="/">
        На главную
      </Link>
    </div>
  );
}

export default NotFound;