import React from 'react';
import type { FormState, BuildingType } from '../../types';
import { StepHeader, NavButtons } from '../ui';

interface BuildingOption {
  id: BuildingType;
  label: string;
  emoji: string;
  desc: string;
  bgClass: string;
}

const OPTIONS: BuildingOption[] = [
  { id: 'residential', label: 'Residential', emoji: '🏠', desc: 'House, condo, townhome',   bgClass: 'residential-bg' },
  { id: 'commercial',  label: 'Commercial',  emoji: '🏢', desc: 'Business, warehouse, office', bgClass: 'commercial-bg'  },
];

interface Props {
  state: FormState;
  setState: (updater: (prev: FormState) => FormState) => void;
  onNext: () => void;
  onBack: () => void;
  totalSteps: number;
}

const StepBuildingType: React.FC<Props> = ({ state, setState, onNext, onBack, totalSteps }) => {
  const select = (id: BuildingType) => {
    setState(p => ({ ...p, buildingType: id }));
    setTimeout(onNext, 260);
  };

  return (
    <div className="step-enter">
      <StepHeader
        step={4}
        total={totalSteps}
        title="What type of building is it?"
        subtitle="This helps us apply the right pricing and permits."
      />

      <div className="building-grid">
        {OPTIONS.map(b => (
          <div
            key={b.id}
            className={`building-card ${state.buildingType === b.id ? 'selected' : ''}`}
            onClick={() => select(b.id)}
          >
            <div className={`building-img-placeholder ${b.bgClass}`}>
              <span style={{ fontSize: 42 }}>{b.emoji}</span>
              <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>{b.desc}</span>
            </div>
            <div className="building-label">
              {b.label} ↗
              {state.buildingType === b.id && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#2563eb" />
                  <path d="M7 12l4 4 6-7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>

      <NavButtons onBack={onBack} onNext={onNext} disabled={!state.buildingType} />
    </div>
  );
};

export default StepBuildingType;
