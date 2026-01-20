import { NextRequest, NextResponse } from 'next/server';
import { loadContentFromJSON, filterByCategory } from '@/lib/services/jsonDataLoader';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'all';
  const limit = parseInt(searchParams.get('limit') || '20', 10);

  try {
    // Charger les données depuis le fichier JSON
    let items = await loadContentFromJSON();

    // Filtrer par catégorie si nécessaire
    if (category !== 'all') {
      items = filterByCategory(items, category);
    }

    // Limiter le nombre de résultats
    const limitedItems = items.slice(0, limit);

    return NextResponse.json({
      success: true,
      count: limitedItems.length,
      total: items.length,
      category,
      source: 'json',
      items: limitedItems,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch content',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
