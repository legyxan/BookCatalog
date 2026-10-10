import { NavLink, useNavigate } from 'react-router-dom';
import { IconBook, IconLogout } from './Icons';

function Navbar({ user, role, nickname, avatar, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const linkClass = ({ isActive }) => (isActive ? 'active' : '');

  // Что показать: emoji, URL-картинку или иконку-заглушку
  const renderAvatar = () => {
    if (!avatar) {
      // fallback: первая буква ника/логина
      const letter = (nickname || user || '?')[0].toUpperCase();
      return <span className="navbar__avatar-letter">{letter}</span>;
    }

    // Если это ссылка (http/https или /) — рендерим img
    if (avatar.startsWith('http') || avatar.startsWith('/')) {
      return <img src={avatar} alt="" className="navbar__avatar-img" />;
    }

    // Иначе — emoji
    return <span className="navbar__avatar-emoji">{avatar}</span>;
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar__logo" aria-label="BookCatalog — на главную">
        <IconBook size={24} />
        <span>BookCatalog</span>
      </NavLink>

      <div className="navbar__links">
        <NavLink to="/" className={linkClass} end>
          Каталог
        </NavLink>
        <NavLink to="/favorites" className={linkClass}>
          Избранное
        </NavLink>
        {user && (
          <NavLink to="/profile" className={linkClass}>
            Профиль
          </NavLink>
        )}
        {role === 'admin' && (
          <NavLink to="/admin" className={linkClass}>
            Админ
          </NavLink>
        )}
      </div>

      <div className="navbar__auth">
        {user ? (
          <>
            <NavLink to="/profile" className="navbar__user">
              <span className={`navbar__avatar ${role === 'admin' ? 'navbar__avatar--admin' : ''}`}>
                {renderAvatar()}
              </span>
              <span className="navbar__user-name">
                {nickname || user}
              </span>
            </NavLink>

            <button
              type="button"
              className="btn btn--ghost btn--with-icon"
              onClick={handleLogout}
            >
              <IconLogout size={16} />
              <span>Выйти</span>
            </button>
          </>
        ) : (
          <NavLink className="btn btn--primary" to="/login">
            Войти
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;