import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useFavorites(key) {
  const storageKey = `opentaqwa:favorites:${key}`;
  const [favoriteIds, setFavoriteIds] = useState(new Set());

  useEffect(() => {
    AsyncStorage.getItem(storageKey).then((value) => {
      if (value) {
        setFavoriteIds(new Set(JSON.parse(value)));
      }
    });
  }, [storageKey]);

  const toggle = useCallback(
    (id) => {
      setFavoriteIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        AsyncStorage.setItem(storageKey, JSON.stringify([...next]));
        return next;
      });
    },
    [storageKey]
  );

  const isFavorite = useCallback((id) => favoriteIds.has(id), [favoriteIds]);

  return { favoriteIds, toggle, isFavorite };
}
