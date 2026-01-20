/**
 * Service Brightdata pour récupérer des données web
 * Documentation: https://brightdata.com/products/web-scraper
 */

interface BrightdataConfig {
  apiKey: string;
  collectorId: string;
}

export const brightdataConfig: BrightdataConfig = {
  apiKey: process.env.BRIGHTDATA_API_KEY || '',
  collectorId: process.env.BRIGHTDATA_COLLECTOR_ID || '',
};

/**
 * Interface pour les résultats Brightdata
 */
export interface BrightdataScrapResult {
  title: string;
  url: string;
  description?: string;
  imageUrl?: string;
  source?: string;
  category?: string;
  date?: string;
  tags?: string[];
}

/**
 * Récupère les données via Brightdata API
 */
export async function fetchFromBrightdata(
  query: string,
  options?: {
    limit?: number;
    category?: string;
  }
): Promise<BrightdataScrapResult[]> {
  if (!brightdataConfig.apiKey || !brightdataConfig.collectorId) {
    console.warn('Brightdata API key or collector ID not configured');
    return [];
  }

  try {
    const params = new URLSearchParams({
      api_key: brightdataConfig.apiKey,
      collector_id: brightdataConfig.collectorId,
      query,
      limit: (options?.limit || 20).toString(),
      ...(options?.category && { category: options.category }),
    });

    const response = await fetch(
      `https://api.brightdata.com/datasets?${params}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Brightdata API error:', response.statusText);
      return [];
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching from Brightdata:', error);
    return [];
  }
}

/**
 * Récupère des tendances de design
 */
export async function fetchDesignTrends(): Promise<BrightdataScrapResult[]> {
  return fetchFromBrightdata('design trends 2026', {
    limit: 20,
    category: 'Design',
  });
}

/**
 * Récupère des contenus d'inspiration
 */
export async function fetchDesignInspiration(): Promise<BrightdataScrapResult[]> {
  return fetchFromBrightdata('design inspiration ui ux', {
    limit: 20,
    category: 'Inspiration',
  });
}

/**
 * Récupère des articles d'apprentissage
 */
export async function fetchDesignLearning(): Promise<BrightdataScrapResult[]> {
  return fetchFromBrightdata('design learning tutorial', {
    limit: 20,
    category: 'Learning',
  });
}
