import type { GeoSuggestion } from '../types';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export async function geocodeAddress(address: string): Promise<GeoSuggestion[]> {
  if (!MAPBOX_TOKEN) {
    console.warn('Mapbox token not configured');
    return [];
  }

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?` +
    `access_token=${MAPBOX_TOKEN}&country=US&limit=5&types=address,place,locality,neighborhood`;

  try {
    const res = await fetch(url, {
      headers: { 'Accept-Language': 'en' },
    });
    const data = await res.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.features.map((f: any) => ({
      display: f.place_name as string,
      lat: f.center[1] as number,
      lon: f.center[0] as number,
    }));
  } catch {
    return [];
  }
}

export function shortAddress(display: string): string {
  return display.split(',').slice(0, 3).join(',');
}

export function randomRoofSqft(): number {
  return Math.round(1400 + Math.random() * 800);
}

export function randomRoofBSqft(): number {
  return Math.round(300 + Math.random() * 400);
}
