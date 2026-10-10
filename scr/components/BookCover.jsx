import { useState } from 'react';

/**
 * Обложка книги.
 * - Показывает <img>, если URL валидный.
 * - Показывает цветной блок с названием, если картинка не загрузилась.
 *
 * @param {Object} book — объект книги
 * @param {string} className — дополнительный CSS-класс (например, book-card__cover)
 * @param {boolean} lazy — использовать lazy-загрузку
 */
function BookCover({ book, className = '', lazy = true }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`book-cover ${className}`}
      style={{ background: book.color }}
    >
      {failed ? (
        <div className="book-cover__fallback">
          <span className="book-cover__fallback-title">{book.title}</span>
          <span className="book-cover__fallback-author">{book.author}</span>
        </div>
      ) : (
        <img
          className="book-cover__img"
          src={book.cover}
          alt={`Обложка книги «${book.title}» — ${book.author}`}
          loading={lazy ? 'lazy' : 'eager'}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

export default BookCover;