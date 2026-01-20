import { ContentItem } from '@/lib/types';
import { BrightdataScrapResult } from './brightdata';

/**
 * Convertit un résultat Brightdata en ContentItem
 */
export function brightnessResultToContentItem(
  result: BrightdataScrapResult,
  id: string
): ContentItem {
  // Générer des gauges basées sur des mots clés
  const title = (result.title || '').toLowerCase();
  const description = (result.description || '').toLowerCase();
  const combined = `${title} ${description}`;

  // Calcul heuristique des gauges
  const realGauge = calculateRealGauge(combined);
  const conceptualGauge = calculateConceptualGauge(combined);

  return {
    id,
    title: result.title || 'Sans titre',
    source: result.source || 'Design Web',
    category: result.category || 'Inspiration',
    imageUrl:
      result.imageUrl ||
      `https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=600&fit=crop&q=80&random=${Math.random()}`,
    description: result.description,
    realGauge,
    conceptualGauge,
    isFavorite: false,
    createdAt: result.date ? new Date(result.date) : new Date(),
  };
}

/**
 * Calcule le gauge "Réel" basé sur les mots clés
 */
function calculateRealGauge(text: string): number {
  const technicalKeywords = [
    'html',
    'css',
    'javascript',
    'react',
    'vue',
    'development',
    'code',
    'frontend',
    'backend',
    'technical',
    'implementation',
  ];

  const count = technicalKeywords.filter((kw) => text.includes(kw)).length;
  return Math.min(50 + count * 10, 95);
}

/**
 * Calcule le gauge "Conceptuel" basé sur les mots clés
 */
function calculateConceptualGauge(text: string): number {
  const conceptualKeywords = [
    'theory',
    'concept',
    'principle',
    'design',
    'ux',
    'user',
    'experience',
    'psychology',
    'color',
    'typography',
    'layout',
    'composition',
    'aesthetic',
    'philosophy',
  ];

  const count = conceptualKeywords.filter((kw) => text.includes(kw)).length;
  return Math.min(50 + count * 8, 100);
}

/**
 * Convertit un tableau de résultats Brightdata
 */
export function brightnessResultsToContentItems(
  results: BrightdataScrapResult[]
): ContentItem[] {
  return results.map((result, index) =>
    brightnessResultToContentItem(result, `bd-${Date.now()}-${index}`)
  );
}
