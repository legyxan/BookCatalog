import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { books, genres } from '../data/books';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import GenreFilter from '../components/GenreFilter';
import { useFavorites } from '../hooks/useFavorites';
import { IconNotFound } from '../components/Icons';

function Home({ user }) {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('Все');

  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  // Фильтрация: поиск по названию + жанр
  const filteredBooks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return books.filter((book) => {
      const matchesTitle = book.title.toLowerCase().includes(query);
      const matchesGenre = genre === 'Все' || book.genre === genre;
      return matchesTitle && matchesGenre;
    });
  }, [search, genre]);

  const handleToggleFavorite = (id) => {
    if (!user) {
      // неавторизованного отправляем на вход
      navigate('/login', { state: { from: { pathname: '/' } } });
      return;
    }
    toggleFavorite(id);
  };

  const resetFilters = () => {
    setSearch('');
    setGenre('Все');
  };

  return (
    <div className="page">
      <header className="hero">
        <h1>Каталог книг</h1>
        <p>
          Найдите книгу по названию или выберите жанр. В избранном:{' '}
          <strong>{favorites.length}</strong>
        </p>
      </header>

      <div className="toolbar">
        <SearchBar value={search} onChange={setSearch} />
        <GenreFilter genres={genres} active={genre} onChange={setGenre} />
      </div>

      <p className="results-count">
        Найдено книг: <strong>{filteredBooks.length}</strong> из {books.length}
      </p>

      {filteredBooks.length === 0 ? (
        <div className="empty">
          <span className="empty__icon"><IconNotFound size={56} /></span>
          <h3>Ничего не найдено</h3>
          <p>Попробуйте изменить запрос или сбросить фильтры.</p>
          <button className="btn btn--primary" onClick={resetFilters}>
            Сбросить фильтры
          </button>
        </div>
      ) : (
        <div className="books-grid">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isFavorite={isFavorite(book.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;