import { Link, useNavigate, useParams } from 'react-router-dom';
import { books } from '../data/books';
import { useFavorites } from '../hooks/useFavorites';
import BookCover from '../components/BookCover';
import { IconNotFound } from '../components/Icons';

function BookPage({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const book = books.find((b) => b.id === Number(id));

  // Книга не найдена
  if (!book) {
    return (
      <div className="empty">
<span className="empty__icon"><IconNotFound size={56} /></span>
        <h2>Книга не найдена</h2>
        <Link className="btn btn--primary" to="/">
          ← Вернуться в каталог
        </Link>
      </div>
    );
  }

  const favorite = isFavorite(book.id);

  const handleToggleFavorite = () => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: `/book/${book.id}` } } });
      return;
    }
    toggleFavorite(book.id);
  };

  return (
    <div className="book-page">
      <Link to="/" className="back-link">
        ← Назад в каталог
      </Link>

      <div className="book-page__content">
        <BookCover book={book} className="book-page__cover" lazy={false} />

        <div className="book-page__info">
          <span className="book-card__genre">{book.genre}</span>
          <h1>{book.title}</h1>
          <p className="book-page__author">
            {book.author} · {book.year}
          </p>
          <p className="book-page__rating">★ {book.rating} / 5</p>

          <p className="book-page__description">{book.description}</p>

          <p className="book-page__price">{book.price} ₽</p>

          <button
            className={favorite ? 'btn btn--primary' : 'btn btn--ghost'}
            onClick={handleToggleFavorite}
          >
            {favorite ? '★ Убрать из избранного' : '☆ Добавить в избранное'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookPage;