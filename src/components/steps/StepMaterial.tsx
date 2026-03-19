import React from 'react';
import type { FormState, Material } from '../../types';
import { StepHeader, NavButtons, OptionRow } from '../ui';

interface MaterialOption {
  id: Material;
  name: string;
  desc: string;
  icon: string;
  mult: string;
  popular?: boolean;
}

const MATERIALS: MaterialOption[] = [
  { id: 'asphalt3tab',          name: '3-Tab Asphalt Shingles',   desc: 'Budget-friendly, 20–25yr lifespan', icon: '🔷', mult: '1×' },
  { id: 'architecturalShingle', name: 'Architectural Shingles',   desc: 'Most popular, 30yr lifespan',        icon: '⬛', mult: '1.25×', popular: true },
  { id: 'metal',                name: 'Metal Roofing',             desc: 'Durable, 40–70yr lifespan',          icon: '🔩', mult: '2.6×' },
  { id: 'tile',                 name: 'Tile (Clay / Concrete)',    desc: 'Long-lasting, 50yr lifespan',        icon: '🟫', mult: '2.2×' },
  { id: 'slate',                name: 'Natural Slate',             desc: 'Premium, 100yr+ lifespan',           icon: '🪨', mult: '3.5×' },
  { id: 'woodshake',            name: 'Wood Shake',                desc: 'Natural look, 30yr lifespan',        icon: '🪵', mult: '1.8×' },
];

interface Props {
  state: FormState;
  setState: (updater: (prev: FormState) => FormState) => void;
  onNext: () => void;
  onBack: () => void;
  totalSteps: number;
}

const StepMaterial: React.FC<Props> = ({ state, setState, onNext, onBack, totalSteps }) => (
  <div className="step-enter">
    <StepHeader
      step={5}
      total={totalSteps}
      title="What roofing material?"
      subtitle="Choose the material you'd like installed."
    />

    <div className="option-list">
      {MATERIALS.map(m => (
        <OptionRow
          key={m.id}
          selected={state.material === m.id}
          onClick={() => setState(p => ({ ...p, material: m.id }))}
          icon={m.icon}
          name={
            <>
              {m.name}
              {m.popular && (
                <span style={{
                  fontSize: 11, background: '#dcfce7', color: '#166534',
                  borderRadius: 4, padding: '2px 7px', marginLeft: 6, fontWeight: 600,
                }}>
                  Popular
                </span>
              )}
            </>
          }
          desc={m.desc}
          rightSlot={
            <span style={{ fontSize: 12, color: '#6b7280', fontWeight: 600, marginRight: 8 }}>
              {m.mult}
            </span>
          }
        />
      ))}
    </div>

    <NavButtons onBack={onBack} onNext={onNext} disabled={!state.material} />
  </div>
);

export default StepMaterial;
