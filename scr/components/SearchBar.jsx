import { IconSearch, IconClose } from './Icons';

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <span className="search-bar__icon" aria-hidden="true">
        <IconSearch size={18} />
      </span>

      <input
        type="text"
        placeholder="Поиск по названию..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {value && (
        <button
          type="button"
          className="search-bar__clear"
          onClick={() => onChange('')}
          title="Очистить"
          aria-label="Очистить поиск"
        >
          <IconClose size={12} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;