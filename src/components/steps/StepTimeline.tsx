import React from 'react';
import type { FormState, Timeline } from '../../types';
import { StepHeader, NavButtons, OptionRow } from '../ui';

interface TimelineOption { id: Timeline; name: string; desc: string; icon: string }

const TIMELINES: TimelineOption[] = [
  { id: 'asap',   name: 'As soon as possible',   desc: 'Emergency or urgent repair',  icon: '🚨' },
  { id: '1to3',   name: 'Within 1–3 months',     desc: 'Planning ahead',              icon: '📅' },
  { id: '3to6',   name: '3–6 months out',         desc: 'No immediate rush',           icon: '🗓️' },
  { id: 'quotes', name: 'Just getting quotes',    desc: 'Researching my options',      icon: '💬' },
];

interface Props {
  state: FormState;
  setState: (updater: (prev: FormState) => FormState) => void;
  onNext: () => void;
  onBack: () => void;
  totalSteps: number;
}

const StepTimeline: React.FC<Props> = ({ state, setState, onNext, onBack, totalSteps }) => (
  <div className="step-enter">
    <StepHeader
      step={8}
      total={totalSteps}
      title="What's your timeline?"
      subtitle="When are you looking to get this done?"
    />

    <div className="option-list">
      {TIMELINES.map(t => (
        <OptionRow
          key={t.id}
          selected={state.timeline === t.id}
          onClick={() => setState(p => ({ ...p, timeline: t.id }))}
          icon={t.icon}
          name={t.name}
          desc={t.desc}
        />
      ))}
    </div>

    <NavButtons onBack={onBack} onNext={onNext} disabled={!state.timeline} />
  </div>
);

export default StepTimeline;
