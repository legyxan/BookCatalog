import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

import Home from './pages/Home';
import BookPage from './pages/BookPage';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import NotFound from './pages/NotFound';

function App() {
  // ----- Состояние авторизации -----
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  // ----- Состояние профиля (ник + аватар) -----
  const [nickname, setNickname] = useState(localStorage.getItem('nickname') || '');
  const [avatar, setAvatar] = useState(localStorage.getItem('avatar') || '');

  const handleLogin = (username, userRole) => {
    localStorage.setItem('user', username);
    localStorage.setItem('role', userRole);
    setUser(username);
    setRole(userRole);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    // nickname и avatar НЕ удаляем — при следующем входе вернутся
    setUser(null);
    setRole(null);
  };

  // Обновление ника и аватарки из Profile
  const handleUpdateProfile = ({ nickname: newNickname, avatar: newAvatar }) => {
    localStorage.setItem('nickname', newNickname);
    localStorage.setItem('avatar', newAvatar);
    setNickname(newNickname);
    setAvatar(newAvatar);
  };

  return (
    <>
      <Navbar
        user={user}
        role={role}
        nickname={nickname}
        avatar={avatar}
        onLogout={handleLogout}
      />

      <main className="container">
        <Routes>
          {/* Публичные маршруты */}
          <Route path="/" element={<Home user={user} />} />
          <Route path="/book/:id" element={<BookPage user={user} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {/* Защищённые маршруты */}
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile
                  user={user}
                  role={role}
                  nickname={nickname}
                  avatar={avatar}
                  onUpdateProfile={handleUpdateProfile}
                />
              </PrivateRoute>
            }
          />

          {/* Только для админа */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="footer">
        Проект №3 · Каталог книг · React + React Router + localStorage
      </footer>
    </>
  );
}

export default App;