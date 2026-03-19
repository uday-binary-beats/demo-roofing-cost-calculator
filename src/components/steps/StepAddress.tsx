import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { FormState, GeoSuggestion } from '../../types';
import { geocodeAddress, shortAddress, randomRoofSqft, randomRoofBSqft } from '../../utils/geo';
import { addRoofPolygons, clearPolygons } from '../../utils/leaflet';
import { StepHeader } from '../ui';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

type MapPhase = 'idle' | 'finding' | 'confirmed';

interface Props {
  state: FormState;
  setState: (updater: (prev: FormState) => FormState) => void;
  onNext: () => void;
  totalSteps: number;
}

const StepAddress: React.FC<Props> = ({ state, setState, onNext, totalSteps }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const polygons = useRef<L.Polygon[]>([]);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [query, setQuery] = useState(state.addressDisplay ?? '');
  const [suggestions, setSuggestions] = useState<GeoSuggestion[]>([]);
  const [phase, setPhase] = useState<MapPhase>(state.lat ? 'confirmed' : 'idle');

  // Init map once
  useEffect(() => {
    if (leafletMap.current || !mapRef.current) return;
    const map = L.map('roof-map', { zoomControl: false });
    
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
    
    L.control.zoom({ position: 'bottomleft' }).addTo(map);
    map.setView([38.5, -96], 4);
    leafletMap.current = map;

    // If address already confirmed, re-render polygons
    if (state.lat && state.lon) {
      map.setView([state.lat, state.lon], 19);
      polygons.current = addRoofPolygons(map, state.lat, state.lon);
    }

    return () => {
      map.remove();
      leafletMap.current = null;
    };
  }, []);

  const handleQueryChange = useCallback((val: string) => {
    setQuery(val);
    setSuggestions([]);
    if (phase === 'confirmed') setPhase('idle');
    if (debounce.current) clearTimeout(debounce.current);
    if (val.length < 4) return;
    debounce.current = setTimeout(async () => {
      const results = await geocodeAddress(val);
      setSuggestions(results.slice(0, 5));
    }, 420);
  }, [phase]);

  const selectSuggestion = useCallback(async (sug: GeoSuggestion) => {
    setQuery(shortAddress(sug.display));
    setSuggestions([]);
    setPhase('finding');

    setState(prev => ({
      ...prev,
      addressDisplay: sug.display,
      lat: sug.lat,
      lon: sug.lon,
      roofSqft: randomRoofSqft(),
      roofBSqft: randomRoofBSqft(),
    }));

    setTimeout(() => {
      if (!leafletMap.current) return;
      clearPolygons(leafletMap.current, polygons.current);
      leafletMap.current.setView([sug.lat, sug.lon], 19);
      polygons.current = addRoofPolygons(leafletMap.current, sug.lat, sug.lon);
      setPhase('confirmed');
    }, 1400);
  }, [setState]);

  const clearAddress = useCallback(() => {
    setQuery('');
    setSuggestions([]);
    setPhase('idle');
    setState(prev => ({ ...prev, addressDisplay: '', lat: null, lon: null }));
    if (leafletMap.current) {
      clearPolygons(leafletMap.current, polygons.current);
      leafletMap.current.setView([38.5, -96], 4);
    }
  }, [setState]);

  return (
    <div className="step-enter">
      <StepHeader step={2} total={totalSteps} title="What's your address?" subtitle="We'll use satellite imagery to detect your roof sections." />

      <div className="map-wrap">
        {/* Search bar overlaid on map */}
        <div className="map-search-bar">
          <div className="map-input-wrap" style={{ position: 'relative' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              className="map-input"
              value={query}
              placeholder="Enter your street address"
              onChange={e => handleQueryChange(e.target.value)}
              onKeyDown={e => e.key === 'Escape' && setSuggestions([])}
            />
            {query && (
              <button className="map-clear-btn" onClick={clearAddress} aria-label="Clear address">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}
            {suggestions.length > 0 && (
              <div className="suggestions">
                {suggestions.map((s, i) => (
                  <div key={i} className="suggestion-item" onClick={() => selectSuggestion(s)}>
                    <svg className="sug-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {shortAddress(s.display)}
                  </div>
                ))}
              </div>
            )}
          </div>
          {phase === 'confirmed' && (
            <button className="map-continue-btn" onClick={onNext}>Continue</button>
          )}
        </div>

        <div id="roof-map" ref={mapRef} />

        {phase === 'finding' && (
          <div className="map-status-badge">
            <div className="spinner" /> Finding your address...
          </div>
        )}
        {phase === 'confirmed' && (
          <div className="map-status-badge" style={{ background: 'rgba(22,163,74,0.9)' }}>
            ✓ Roof sections detected
          </div>
        )}
      </div>

      {phase !== 'confirmed' && (
        <button
          className="btn-next"
          disabled={!state.lat}
          onClick={onNext}
          style={{ width: '100%', borderRadius: 50 }}
        >
          Continue →
        </button>
      )}
    </div>
  );
};

export default StepAddress;
