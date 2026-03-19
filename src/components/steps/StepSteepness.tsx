import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import type { FormState, Slope } from '../../types';
import { createSatelliteMap, addRoofPolygons } from '../../utils/leaflet';
import { StepHeader, NavButtons } from '../ui';
import SlopeIcon from '../SlopeIcon';

interface SlopeOption {
  id: Slope;
  name: string;
  desc: string;
  disabled?: boolean;
}

const SLOPES: SlopeOption[] = [
  { id: 'flat',     name: 'Flat',     desc: 'Not offered',          disabled: true },
  { id: 'low',      name: 'Low',      desc: 'Easily walked on' },
  { id: 'moderate', name: 'Moderate', desc: 'Not easily walked on' },
  { id: 'steep',    name: 'Steep',    desc: "Can't be walked on" },
];

interface RoofSectionProps {
  label: 'A' | 'B';
  included: boolean;
  slope: Slope | null;
  onToggleInclude: (v: boolean) => void;
  onSelectSlope: (s: Slope) => void;
}

const RoofSection: React.FC<RoofSectionProps> = ({
  label, included, slope, onToggleInclude, onSelectSlope,
}) => (
  <div className="roof-section">
    <div className="roof-section-header">
      <div className="roof-label">
        <div className="roof-badge">{label}</div>
        Roof {label}
      </div>
      <label className="include-toggle">
        <input
          type="checkbox"
          className="toggle-checkbox"
          checked={included}
          onChange={e => onToggleInclude(e.target.checked)}
        />
        Include
      </label>
    </div>

    {included && (
      <div className="slope-grid">
        {SLOPES.map(sl => (
          <div
            key={sl.id}
            className={[
              'slope-card',
              sl.disabled ? 'disabled' : '',
              slope === sl.id ? 'selected' : '',
            ].join(' ')}
            onClick={() => !sl.disabled && onSelectSlope(sl.id)}
          >
            <div className="slope-icon">
              <SlopeIcon type={sl.id} />
            </div>
            <div>
              <div className="slope-name">{sl.name}</div>
              <div className="slope-desc">{sl.desc}</div>
            </div>
            <div className="slope-check">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

interface Props {
  state: FormState;
  setState: (updater: (prev: FormState) => FormState) => void;
  onNext: () => void;
  onBack: () => void;
  totalSteps: number;
}

const StepSteepness: React.FC<Props> = ({ state, setState, onNext, onBack, totalSteps }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);

  useEffect(() => {
    if (leafletMap.current || !mapRef.current || !state.lat || !state.lon) return;
    const map = createSatelliteMap('step3-map', [state.lat, state.lon], 19, false);
    addRoofPolygons(map, state.lat, state.lon);
    leafletMap.current = map;
    return () => { map.remove(); leafletMap.current = null; };
  }, []);

  const canContinue =
    (state.includeARoof ? !!state.slopeA && state.slopeA !== 'flat' : true) &&
    (state.includeBRoof ? !!state.slopeB && state.slopeB !== 'flat' : true) &&
    (state.includeARoof || state.includeBRoof);

  return (
    <div className="step-enter">
      <StepHeader step={3} total={totalSteps} title="How steep is your roof?" />
      <p className="note-text">Note: We do not currently offer flat roofing services</p>

      <div className="roof-layout">
        <div className="roof-options-col">
          <RoofSection
            label="A"
            included={state.includeARoof}
            slope={state.slopeA}
            onToggleInclude={v => setState(p => ({ ...p, includeARoof: v }))}
            onSelectSlope={s => setState(p => ({ ...p, slopeA: s }))}
          />
          <RoofSection
            label="B"
            included={state.includeBRoof}
            slope={state.slopeB}
            onToggleInclude={v => setState(p => ({ ...p, includeBRoof: v }))}
            onSelectSlope={s => setState(p => ({ ...p, slopeB: s }))}
          />
        </div>

        {state.lat && (
          <div className="roof-map-col">
            <div id="step3-map" ref={mapRef} style={{ height: 240, width: '100%' }} />
          </div>
        )}
      </div>

      <NavButtons onBack={onBack} onNext={onNext} disabled={!canContinue} />
    </div>
  );
};

export default StepSteepness;
