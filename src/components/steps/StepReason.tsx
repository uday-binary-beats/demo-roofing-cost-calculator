import React from 'react';
import type { FormState, Reason } from '../../types';
import { StepHeader, NavButtons, Chip } from '../ui';

interface ReasonOption { id: Reason; label: string; icon: string }

const REASONS: ReasonOption[] = [
  { id: 'storm',   label: 'Storm / hail damage',  icon: '⛈️' },
  { id: 'age',     label: 'Old age / wear',        icon: '🕰️' },
  { id: 'leak',    label: 'Active leak',           icon: '💧' },
  { id: 'upgrade', label: 'Upgrade / renovation',  icon: '✨' },
  { id: 'sale',    label: 'Selling the property',  icon: '🏷️' },
  { id: 'other',   label: 'Other',                 icon: '📝' },
];

interface Props {
  state: FormState;
  setState: (updater: (prev: FormState) => FormState) => void;
  onNext: () => void;
  onBack: () => void;
  totalSteps: number;
}

const StepReason: React.FC<Props> = ({ state, setState, onNext, onBack, totalSteps }) => (
  <div className="step-enter">
    <StepHeader
      step={7}
      total={totalSteps}
      title="What's the reason?"
      subtitle="This helps us prioritize your estimate."
    />

    <div className="chips-row" style={{ marginBottom: 8 }}>
      {REASONS.map(r => (
        <Chip
          key={r.id}
          selected={state.reason === r.id}
          onClick={() => setState(p => ({ ...p, reason: r.id }))}
        >
          {r.icon} {r.label}
        </Chip>
      ))}
    </div>

    <NavButtons onBack={onBack} onNext={onNext} disabled={!state.reason} />
  </div>
);

export default StepReason;
