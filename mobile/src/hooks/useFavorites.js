import { useState, useEffect, useCallback } from "react";
import * as SecureStore from "expo-secure-store";

const PREFIX = "opentaqwa_fav_";

async function loadFavorites(key) {
  try {
    const value = await SecureStore.getItemAsync(PREFIX + key);
    return value ? new Set(JSON.parse(value)) : new Set();
  } catch {
    return new Set();
  }
}

async function saveFavorites(key, set) {
  try {
    await SecureStore.setItemAsync(PREFIX + key, JSON.stringify([...set]));
  } catch {
    // fail silently — favorites are non-critical
  }
}

export function useFavorites(key) {
  const [favoriteIds, setFavoriteIds] = useState(new Set());

  useEffect(() => {
    loadFavorites(key).then(setFavoriteIds);
  }, [key]);

  const toggle = useCallback(
    (id) => {
      setFavoriteIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        saveFavorites(key, next);
        return next;
      });
    },
    [key]
  );

  const isFavorite = useCallback((id) => favoriteIds.has(id), [favoriteIds]);

  return { favoriteIds, toggle, isFavorite };
}
