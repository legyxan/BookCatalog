import { useEffect, useState } from 'react';

const STORAGE_KEY = 'favorites';

// Безопасное чтение из localStorage
function readFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Хук для работы с избранным.
 * Хранит массив id книг в состоянии и синхронизирует его с localStorage.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState(readFavorites);

  // Каждое изменение избранного сохраняем в localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (id) => favorites.includes(id);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return { favorites, isFavorite, toggleFavorite };
}