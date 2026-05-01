'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseFavoritesResult {
  favorites: Set<number>;
  toggleFavorite: (id: number) => 'added' | 'removed';
}

export function useFavorites(): UseFavoritesResult {
  const [favorites, setFavorites] = useState<Set<number>>(() => {
    if (typeof window === 'undefined') return new Set();
    try {
      return new Set<number>(JSON.parse(localStorage.getItem('pkdx-favorites') || '[]'));
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    localStorage.setItem('pkdx-favorites', JSON.stringify([...favorites]));
  }, [favorites]);

  const toggleFavorite = useCallback((id: number): 'added' | 'removed' => {
    let action: 'added' | 'removed' = 'added';
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        action = 'removed';
      } else {
        next.add(id);
        action = 'added';
      }
      return next;
    });
    return action;
  }, []);

  return { favorites, toggleFavorite };
}
