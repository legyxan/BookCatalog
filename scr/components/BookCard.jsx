import { Link } from 'react-router-dom';
import BookCover from './BookCover';

function BookCard({ book, isFavorite, onToggleFavorite }) {
  return (
    <article className="book-card">
      <BookCover book={book} className="book-card__cover" />

      <div className="book-card__body">
        <span className="book-card__genre">{book.genre}</span>
        <h3 className="book-card__title">{book.title}</h3>
        <p className="book-card__author">{book.author}</p>

        <div className="book-card__bottom">
          <span className="book-card__price">{book.price} ₽</span>
          <span className="book-card__rating">★ {book.rating}</span>
        </div>

        <div className="book-card__actions">
          <Link className="btn btn--ghost" to={`/book/${book.id}`}>
            Подробнее
          </Link>
          <button
            type="button"
            className={isFavorite ? 'btn btn--fav is-active' : 'btn btn--fav'}
            title={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
            onClick={() => onToggleFavorite(book.id)}
          >
            {isFavorite ? '★' : '☆'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default BookCard;