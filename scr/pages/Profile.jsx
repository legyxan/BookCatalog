import { useState } from 'react';
import { Link } from 'react-router-dom';
import { books } from '../data/books';
import { useFavorites } from '../hooks/useFavorites';
import { IconCrown, IconUser, IconSave, IconClose } from '../components/Icons';

const ROLE_NAMES = {
  admin: 'Администратор',
  manager: 'Менеджер',
  user: 'Читатель',
};

// Готовые эмодзи-аватарки
const AVATAR_PRESETS = [
  '📚', '📖', '📕', '📗', '📘', '📙',
  '🦉', '🦊', '🐱', '🐼', '🦁', '🐧',
  '🦄', '🎓', '👑', '🎩', '🚀', '☕',
];

function Profile({ user, role, nickname, avatar, onUpdateProfile }) {
  const { favorites } = useFavorites();

  // ----- Локальное состояние редактора -----
  const [isEditing, setIsEditing] = useState(false);
  const [draftNickname, setDraftNickname] = useState(nickname || user || '');
  const [draftAvatar, setDraftAvatar] = useState(avatar || '');
  const [avatarUrl, setAvatarUrl] = useState(
    avatar && (avatar.startsWith('http') || avatar.startsWith('/')) ? avatar : ''
  );

  const displayName = nickname || user;

  const startEdit = () => {
    setDraftNickname(nickname || user || '');
    setDraftAvatar(avatar || '');
    setAvatarUrl(
      avatar && (avatar.startsWith('http') || avatar.startsWith('/')) ? avatar : ''
    );
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const pickEmoji = (emoji) => {
    setDraftAvatar(emoji);
    setAvatarUrl(''); // очищаем URL, если выбрали emoji
  };

  const applyUrl = (url) => {
    setAvatarUrl(url);
    setDraftAvatar(url); // сохраняем как аватар
  };

  const clearAvatar = () => {
    setDraftAvatar('');
    setAvatarUrl('');
  };

  const save = () => {
    const trimmedNickname = draftNickname.trim().slice(0, 24);

    onUpdateProfile({
      nickname: trimmedNickname,
      avatar: draftAvatar,
    });

    setIsEditing(false);
  };

  // ----- Рендер аватарки в текущем режиме -----
  const renderAvatar = (value, size = 'lg') => {
    const cls = `profile-card__avatar profile-card__avatar--${size}`;

    if (!value) {
      const letter = (draftNickname || user || '?')[0].toUpperCase();
      return <div className={cls}>{letter}</div>;
    }

    if (value.startsWith('http') || value.startsWith('/')) {
      return (
        <div className={cls} style={{ padding: 0, overflow: 'hidden' }}>
          <img
            src={value}
            alt=""
            className="profile-card__avatar-img"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>
      );
    }

    return <div className={cls}>{value}</div>;
  };

  return (
    <div className="page">
      <h1>Личный кабинет</h1>

      {/* ============ Просмотр ============ */}
      {!isEditing && (
        <>
          <div className="profile-card">
            {renderAvatar(avatar)}

            <div className="profile-card__info">
              <p className="profile-card__name">{displayName}</p>
              <p className="profile-card__login">@{user}</p>
              <p className="profile-card__role">
                {role === 'admin' ? <IconCrown size={16} /> : <IconUser size={16} />}
                {ROLE_NAMES[role] || 'Читатель'}
              </p>
            </div>

            <button
              type="button"
              className="btn btn--primary profile-card__edit"
              onClick={startEdit}
            >
              ✎ Редактировать
            </button>
          </div>

          <ul className="profile-stats">
            <li>
              <span>{favorites.length}</span>
              книг в избранном
            </li>
            <li>
              <span>{books.length}</span>
              книг в каталоге
            </li>
            <li>
              <span>{role === 'admin' ? 'Да' : 'Нет'}</span>
              доступ к админ-панели
            </li>
          </ul>

          <div className="profile-actions">
            <Link className="btn btn--primary" to="/favorites">
              Открыть избранное
            </Link>
            <Link className="btn btn--ghost" to="/">
              В каталог
            </Link>
          </div>
        </>
      )}

      {/* ============ Редактирование ============ */}
      {isEditing && (
        <div className="profile-edit">
          <div className="profile-edit__preview">
            {renderAvatar(draftAvatar)}
            <p className="profile-edit__hint">Предпросмотр</p>
          </div>

          <div className="profile-edit__fields">
            {/* Ник */}
            <label className="field">
              <span>Ник (отображается в шапке)</span>
              <input
                type="text"
                value={draftNickname}
                maxLength={24}
                placeholder={user}
                onChange={(e) => setDraftNickname(e.target.value)}
              />
              <small className="field__hint">
                До 24 символов. Оставьте пустым, чтобы показывать логин.
              </small>
            </label>

            {/* Пресеты emoji */}
            <div className="profile-edit__group">
              <span className="profile-edit__label">Аватарка</span>
              <div className="avatar-grid">
                {AVATAR_PRESETS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    className={
                      draftAvatar === emoji
                        ? 'avatar-option avatar-option--active'
                        : 'avatar-option'
                    }
                    onClick={() => pickEmoji(emoji)}
                    title={emoji}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* URL картинки */}
            <label className="field">
              <span>Или вставьте ссылку на картинку</span>
              <input
                type="url"
                placeholder="https://example.com/avatar.jpg"
                value={avatarUrl}
                onChange={(e) => applyUrl(e.target.value)}
              />
            </label>

            {/* Действия */}
            <div className="profile-edit__actions">
              <button
                type="button"
                className="btn btn--primary btn--with-icon"
                onClick={save}
              >
                <IconSave size={16} />
                <span>Сохранить</span>
              </button>

              <button
                type="button"
                className="btn btn--ghost"
                onClick={clearAvatar}
              >
                Сбросить аватар
              </button>

              <button
                type="button"
                className="btn btn--ghost btn--with-icon"
                onClick={cancelEdit}
              >
                <IconClose size={14} />
                <span>Отмена</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;