/**
 * Service pour charger des données depuis un fichier JSON local
 * Support pour YouTube JSON API (Brightdata)
 */

import { ContentItem } from '@/lib/types';
import fs from 'fs';
import path from 'path';

interface YouTubeVideo {
  url?: string;
  title?: string;
  youtuber?: string;
  handle_name?: string;
  views?: number;
  likes?: number;
  date_posted?: string;
  description?: string;
  num_comments?: number;
  video_length?: number;
  preview_image?: string;
  error?: string;
  error_code?: string;
}

// Catégories basées sur les mots-clés du titre
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'Learning': ['tutorial', 'learn', 'how to', 'guide', 'beginner', 'course', 'introduction', 'tips', 'tricks', 'explained', 'lesson'],
  'Inspiration': ['design', 'inspiration', 'showcase', 'portfolio', 'case study', 'interview', 'creative', 'behind the scenes', 'spot', 'mistake', 'review'],
  'Trends': ['trend', '2025', '2024', '2026', 'future', 'new', 'latest', 'web design', 'ui', 'ux', 'trend']
};

function inferCategory(title: string): string {
  const lowerTitle = title.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(keyword => lowerTitle.includes(keyword))) {
      return category;
    }
  }
  return 'Learning';
}

function extractVideoId(url: string): string {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\&\n\r]+)/);
  return match ? match[1] : 'dQw4w9WgXcQ';
}

function convertYouTubeToContentItem(video: YouTubeVideo, index: number): ContentItem | null {
  if (!video.url || !video.title) return null;

  const videoId = extractVideoId(video.url);
  const viewCount = Math.max(100, video.views || 1000);
  const likeCount = Math.max(10, video.likes || 100);
  
  // Utiliser preview_image si disponible, sinon générer l'URL
  const imageUrl = video.preview_image || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  
  // Extraire la première ligne de la description
  const descriptionLines = (video.description || 'Video from YouTube').split('\n');
  const shortDesc = descriptionLines[0].substring(0, 150);

  return {
    id: `youtube-${index}`,
    title: video.title,
    source: video.youtuber?.replace('@', '') || video.handle_name || 'YouTube',
    category: inferCategory(video.title),
    imageUrl: imageUrl,
    sourceUrl: video.url, // URL vers la vidéo YouTube
    description: shortDesc.length > 0 ? shortDesc : 'Video from YouTube',
    realGauge: Math.min(100, Math.max(20, Math.floor(Math.log(viewCount) * 15))),
    conceptualGauge: Math.min(100, Math.max(50, Math.floor((likeCount / viewCount) * 100 * 5))),
    isFavorite: false,
    createdAt: video.date_posted ? new Date(video.date_posted) : new Date()
  };
}

/**
 * Charge les données depuis le fichier YouTube JSON
 */
export async function loadContentFromJSON(): Promise<ContentItem[]> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'sd_mkld8oi627yrcx2r8v.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data: YouTubeVideo[] = JSON.parse(fileContent);
    
    console.log(`[YouTube Loader] Total items in JSON: ${data.length}`);
    
    // Filtrer les erreurs et convertir les vidéos valides
    const validItems = data.filter((item) => !item.error && !item.error_code && item.url && item.title);
    console.log(`[YouTube Loader] Valid items (no errors): ${validItems.length}`);

    const items = validItems
      .map((video, index) => convertYouTubeToContentItem(video, index))
      .filter((item): item is ContentItem => item !== null);

    console.log(`[YouTube Loader] Converted items: ${items.length}`);
    
    if (items.length === 0) {
      console.warn('[YouTube Loader] No valid items found!');
      // Log first few items for debugging
      console.log('[YouTube Loader] First 3 items:', data.slice(0, 3));
    }

    return items;
  } catch (error) {
    console.error('Error loading YouTube data from JSON:', error);
    return [];
  }
}

/**
 * Filtre les contenus par catégorie
 */
export function filterByCategory(
  items: ContentItem[],
  category: string
): ContentItem[] {
  if (category === 'all' || category === '') return items;
  return items.filter((item) => item.category.toLowerCase() === category.toLowerCase());
}

/**
 * Obtient toutes les catégories disponibles
 */
export function getAvailableCategories(items: ContentItem[]): string[] {
  const categories = new Set(items.map((item) => item.category));
  return Array.from(categories).sort();
}
