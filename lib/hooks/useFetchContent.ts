'use client';

import { useState, useEffect } from 'react';
import { ContentItem } from '@/lib/types';

interface UseFetchContentOptions {
  category?: 'all' | 'Trends' | 'Inspiration' | 'Learning';
  limit?: number;
}

interface FetchContentResult {
  items: ContentItem[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  total: number;
}

/**
 * Hook pour récupérer les contenus depuis l'API
 */
export function useFetchContent(
  options: UseFetchContentOptions = {}
): FetchContentResult {
  const { category = 'all', limit = 20 } = options;
  const [items, setItems] = useState<ContentItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const query = new URLSearchParams({
        category: category === 'all' ? 'all' : category,
        limit: limit.toString(),
      });

      const response = await fetch(`/api/content?${query}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setItems(data.items);
        setTotal(data.total || data.count);
      } else {
        setError(data.message || 'Failed to fetch content');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching content:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [category, limit]);

  return {
    items,
    total,
    isLoading,
    error,
    refetch: fetchContent,
  };
}
