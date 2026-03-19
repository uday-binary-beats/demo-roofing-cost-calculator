import React, { useState } from 'react';
import { useFormState } from './hooks/useFormState';
import { ProgressBar } from './components/ui';
import './styles/global.css';

import StepWelcome      from './components/steps/StepWelcome';
import StepAddress      from './components/steps/StepAddress';
import StepSteepness    from './components/steps/StepSteepness';
import StepBuildingType from './components/steps/StepBuildingType';
import StepMaterial     from './components/steps/StepMaterial';
import StepCondition    from './components/steps/StepCondition';
import StepReason       from './components/steps/StepReason';
import StepTimeline     from './components/steps/StepTimeline';
import StepContact      from './components/steps/StepContact';
import StepResult       from './components/steps/StepResult';

const TOTAL_STEPS = 10;

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const { state, setState, reset } = useFormState();

  const next    = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const back    = () => setStep((s) => Math.max(s - 1, 1));
  const restart = () => { reset(); setStep(1); };

  const sharedProps = { state, setState, onNext: next, onBack: back, totalSteps: TOTAL_STEPS };

  const steps: Record<number, React.ReactNode> = {
    1:  <StepWelcome onNext={next} />,
    2:  <StepAddress    {...sharedProps} />,
    3:  <StepSteepness  {...sharedProps} />,
    4:  <StepBuildingType {...sharedProps} />,
    5:  <StepMaterial   {...sharedProps} />,
    6:  <StepCondition  {...sharedProps} />,
    7:  <StepReason     {...sharedProps} />,
    8:  <StepTimeline   {...sharedProps} />,
    9:  <StepContact    {...sharedProps} />,
    10: <StepResult state={state} onRestart={restart} totalSteps={TOTAL_STEPS} />,
  };

  return (
    <div className="app-shell">
      <div className="logo-bar">
        <div className="logo-mark">🏠</div>
        <div>
          <div className="logo-text">Family First Roofing</div>
          <div className="logo-sub">Free Instant Roof Estimate</div>
        </div>
      </div>

      <div className="card">
        <ProgressBar step={step} total={TOTAL_STEPS} />
        <div className="card-body">
          {steps[step]}
        </div>
      </div>
    </div>
  );
};

export default App;
