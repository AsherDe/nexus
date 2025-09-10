import { useCallback, useEffect, useState } from "react";

interface CachedData<T> {
  data: T;
  timestamp: number;
}

interface UseCachedDataOptions {
  cacheKey: string;
  url: string;
  cacheDurationMinutes: number;
}

export function useCachedData<T>({
  cacheKey,
  url,
  cacheDurationMinutes,
}: UseCachedDataOptions) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadData = useCallback(async () => {
    try {
      setError(null);

      const cachedItem = localStorage.getItem(cacheKey);
      const now = Date.now();
      const cacheExpiryMs = cacheDurationMinutes * 60 * 1000;

      if (cachedItem) {
        try {
          const cached: CachedData<T> = JSON.parse(cachedItem);
          const isExpired = now - cached.timestamp > cacheExpiryMs;

          if (!isExpired) {
            setData(cached.data);
            setLoading(false);
            return;
          }
        } catch {
          localStorage.removeItem(cacheKey);
        }
      }

      setLoading(true);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newData: T = await response.json();

      const cacheData: CachedData<T> = {
        data: newData,
        timestamp: now,
      };

      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
      setData(newData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, [cacheKey, url, cacheDurationMinutes]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { data, loading, error };
}
