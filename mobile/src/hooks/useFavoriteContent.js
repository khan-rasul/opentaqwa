import { useState, useEffect, useCallback } from "react";
import * as SecureStore from "expo-secure-store";

const PREFIX = "opentaqwa_content_";

async function loadItems(key) {
  try {
    const raw = await SecureStore.getItemAsync(PREFIX + key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

async function saveItems(key, items) {
  try {
    await SecureStore.setItemAsync(PREFIX + key, JSON.stringify(items));
  } catch {}
}

function getItemId(item) {
  return item.reference ?? item.number ?? item.id;
}

export function useFavoriteContent(key) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems(key).then(setItems);
  }, [key]);

  const isSaved = useCallback(
    (item) => {
      const id = getItemId(item);
      return items.some((i) => getItemId(i) === id);
    },
    [items]
  );

  const toggle = useCallback(
    (item) => {
      setItems((prev) => {
        const id = getItemId(item);
        const exists = prev.some((i) => getItemId(i) === id);
        const next = exists
          ? prev.filter((i) => getItemId(i) !== id)
          : [...prev, item];
        saveItems(key, next);
        return next;
      });
    },
    [key]
  );

  return { items, isSaved, toggle };
}
