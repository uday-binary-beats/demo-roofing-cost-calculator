import React from 'react';
import type { FormState, Condition } from '../../types';
import { StepHeader, NavButtons, OptionRow } from '../ui';

interface ConditionOption {
  id: Condition;
  name: string;
  desc: string;
  icon: string;
}

const CONDITIONS: ConditionOption[] = [
  { id: 'overlay',  name: 'Overlay (lay over existing)', desc: 'Existing shingles remain; new layer on top. Saves ~10%', icon: '📋' },
  { id: 'tearoff',  name: 'Full tear-off & replacement', desc: 'Remove old material completely for a fresh install',      icon: '🔨' },
  { id: 'unsure',   name: "I'm not sure",                desc: 'Our team will assess during the on-site inspection',      icon: '🤔' },
];

interface Props {
  state: FormState;
  setState: (updater: (prev: FormState) => FormState) => void;
  onNext: () => void;
  onBack: () => void;
  totalSteps: number;
}

const StepCondition: React.FC<Props> = ({ state, setState, onNext, onBack, totalSteps }) => (
  <div className="step-enter">
    <StepHeader
      step={6}
      total={totalSteps}
      title="Overlay or full tear-off?"
      subtitle="Does your roof need the old material removed first?"
    />

    <div className="option-list">
      {CONDITIONS.map(c => (
        <OptionRow
          key={c.id}
          selected={state.condition === c.id}
          onClick={() => setState(p => ({ ...p, condition: c.id }))}
          icon={c.icon}
          name={c.name}
          desc={c.desc}
        />
      ))}
    </div>

    <NavButtons onBack={onBack} onNext={onNext} disabled={!state.condition} />
  </div>
);

export default StepCondition;
