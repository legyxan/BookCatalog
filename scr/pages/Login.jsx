import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Мок-база пользователей (без сервера)
const USERS = [
  { username: 'admin', password: '1234', role: 'admin' },
  { username: 'manager', password: '1234', role: 'manager' },
  { username: 'reader', password: '1234', role: 'user' },
];

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  // Куда вернуться после входа
  const from = location.state?.from?.pathname || '/profile';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const found = USERS.find(
      (u) => u.username === username.trim() && u.password === password
    );

    if (!found) {
      setError('Неверный логин или пароль');
      return;
    }

    onLogin(found.username, found.role);
    navigate(from, { replace: true });
  };

  return (
    <div className="auth">
      <form className="auth__card" onSubmit={handleSubmit}>
        <h1>Вход</h1>
        <p className="auth__subtitle">Войдите, чтобы сохранять избранное</p>

        <label className="field">
          <span>Логин</span>
          <input
            type="text"
            placeholder="Введите логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </label>

        <label className="field">
          <span>Пароль</span>
          <input
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>

        {error && <p className="auth__error">{error}</p>}

        <button type="submit" className="btn btn--primary btn--block">
          Войти
        </button>

        <p className="auth__hint-text">
          Тестовые аккаунты — уточните у преподавателя. Пароль у всех: <code>1234</code>.
        </p>
      </form>
    </div>
  );
}

export default Login;