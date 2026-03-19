import React from 'react';

interface Props {
  onNext: () => void;
}

const FEATURES = [
  'Powered by satellite roof detection',
  'Instant pricing — no waiting for callbacks',
  'Based on real Florida labor & material costs',
  'Free, no commitment required',
];

const StepWelcome: React.FC<Props> = ({ onNext }) => (
  <div className="step-enter">
    <div className="welcome-graphic">🏠</div>
    <div className="step-label">Free · No obligation</div>
    <div className="step-title">Get your instant roof estimate</div>
    <div className="step-subtitle">
      Answer a few quick questions and get a personalized cost range in under 2 minutes.
    </div>
    <div className="feature-list">
      {FEATURES.map((f) => (
        <div key={f} className="feature-item">
          <div className="feature-dot">✓</div>
          {f}
        </div>
      ))}
    </div>
    <button className="btn-next-full" onClick={onNext}>
      Start my free estimate →
    </button>
  </div>
);

export default StepWelcome;
