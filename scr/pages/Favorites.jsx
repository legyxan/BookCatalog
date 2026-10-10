import { Link } from 'react-router-dom';
import { books } from '../data/books';
import BookCard from '../components/BookCard';
import { useFavorites } from '../hooks/useFavorites';
import { IconEmptyBox } from '../components/Icons';

function Favorites() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const favoriteBooks = books.filter((book) => favorites.includes(book.id));

  if (favoriteBooks.length === 0) {
    return (
      <div className="page">
        <h1>Избранное</h1>
        <div className="empty">
          <span className="empty__icon"><IconEmptyBox size={56} /></span>
          <h3>Список пуст</h3>
          <p>Добавляйте книги звёздочкой ☆ в каталоге.</p>
          <Link className="btn btn--primary" to="/">
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Избранное</h1>
      <p className="results-count">
        Книг в избранном: <strong>{favoriteBooks.length}</strong>
      </p>
      <div className="books-grid">
        {favoriteBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            isFavorite={isFavorite(book.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;