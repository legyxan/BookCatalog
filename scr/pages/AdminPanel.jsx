import { books } from '../data/books';

// Мок-данные пользователей
const mockUsers = [
  { id: 1, username: 'admin', role: 'admin', favorites: 3, registered: '01.02.2026' },
  { id: 2, username: 'manager', role: 'manager', favorites: 1, registered: '14.02.2026' },
  { id: 3, username: 'reader', role: 'user', favorites: 5, registered: '20.03.2026' },
];

const ROLE_LABELS = { admin: 'Администратор', manager: 'Менеджер', user: 'Читатель' };

function AdminPanel() {
  return (
    <div className="page">
      <h1>Админ-панель</h1>
      <p className="results-count">
        Доступ только для администратора. Книг в каталоге:{' '}
        <strong>{books.length}</strong>
      </p>

      <h2>Пользователи</h2>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Логин</th>
              <th>Роль</th>
              <th>В избранном</th>
              <th>Дата регистрации</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>
                  <span className={`badge badge--${u.role}`}>
                    {ROLE_LABELS[u.role]}
                  </span>
                </td>
                <td>{u.favorites}</td>
                <td>{u.registered}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel;