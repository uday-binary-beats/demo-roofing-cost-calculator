import L from 'leaflet';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export function createSatelliteMap(elementId: string, center: [number, number], zoom: number, interactive = true): L.Map {
  const map = L.map(elementId, {
    zoomControl: false,
    dragging: interactive,
    scrollWheelZoom: interactive,
    doubleClickZoom: interactive,
    touchZoom: interactive,
  });

  if (MAPBOX_TOKEN) {
    L.tileLayer(
      `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`,
      { attribution: '© Mapbox © Maxar', maxZoom: 22, tileSize: 512, zoomOffset: -1 }
    ).addTo(map);
  } else {
    // Fallback to ArcGIS if no Mapbox token
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      { attribution: 'Imagery ©2026 Airbus', maxZoom: 21 }
    ).addTo(map);
  }

  map.setView(center, zoom);
  return map;
}

export function addRoofPolygons(map: L.Map, lat: number, lon: number): L.Polygon[] {
  const off = 0.00012;

  const coordsA: [number, number][] = [
    [lat + off * 2.2, lon - off],
    [lat + off * 2.2, lon + off * 2],
    [lat + off * 3.8, lon + off * 2],
    [lat + off * 3.8, lon - off],
  ];
  const coordsB: [number, number][] = [
    [lat - off * 0.5, lon - off],
    [lat - off * 0.5, lon + off * 2],
    [lat + off * 2.0, lon + off * 2],
    [lat + off * 2.0, lon - off],
  ];

  const style: L.PathOptions = {
    color: '#2563eb',
    fillColor: '#3b82f6',
    weight: 2.5,
    fillOpacity: 0.35,
  };

  const polyA = L.polygon(coordsA, style).addTo(map);
  const polyB = L.polygon(coordsB, style).addTo(map);

  polyA.bindTooltip('A', { permanent: true, direction: 'center', className: 'roof-tooltip' });
  polyB.bindTooltip('B', { permanent: true, direction: 'center', className: 'roof-tooltip' });

  return [polyA, polyB];
}

export function clearPolygons(map: L.Map, polygons: L.Polygon[]): void {
  polygons.forEach(p => map.removeLayer(p));
}
