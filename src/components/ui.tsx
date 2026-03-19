import React from 'react';

// ─── Progress bar ─────────────────────────────────────────────────────────────
interface ProgressBarProps {
  step: number;
  total: number;
}
export const ProgressBar: React.FC<ProgressBarProps> = ({ step, total }) => (
  <div className="card-progress">
    <div
      className="card-progress-fill"
      style={{ width: `${((step - 1) / (total - 1)) * 100}%` }}
    />
  </div>
);

// ─── Step header ──────────────────────────────────────────────────────────────
interface StepHeaderProps {
  step: number;
  total: number;
  title: string;
  subtitle?: string;
}
export const StepHeader: React.FC<StepHeaderProps> = ({ step, total, title, subtitle }) => (
  <>
    <div className="step-label">Step {step} of {total}</div>
    <div className="step-title">{title}</div>
    {subtitle && <div className="step-subtitle">{subtitle}</div>}
  </>
);

// ─── Nav buttons ──────────────────────────────────────────────────────────────
interface NavButtonsProps {
  onBack?: () => void;
  onNext: () => void;
  disabled?: boolean;
  nextLabel?: string;
}
export const NavButtons: React.FC<NavButtonsProps> = ({
  onBack,
  onNext,
  disabled = false,
  nextLabel = 'Continue →',
}) => (
  <div className="btn-row">
    {onBack && (
      <button className="btn-back" onClick={onBack}>← Back</button>
    )}
    <button className="btn-next" disabled={disabled} onClick={onNext}>
      {nextLabel}
    </button>
  </div>
);

// ─── Option row (radio-style) ─────────────────────────────────────────────────
interface OptionRowProps {
  selected: boolean;
  onClick: () => void;
  icon: string;
  name: React.ReactNode;
  desc?: string;
  rightSlot?: React.ReactNode;
}
export const OptionRow: React.FC<OptionRowProps> = ({
  selected, onClick, icon, name, desc, rightSlot,
}) => (
  <div className={`option-row ${selected ? 'selected' : ''}`} onClick={onClick}>
    <div className="option-icon">{icon}</div>
    <div className="option-main">
      <div className="option-name">{name}</div>
      {desc && <div className="option-desc">{desc}</div>}
    </div>
    {rightSlot}
    <div className="option-radio">
      <div className="option-radio-dot" />
    </div>
  </div>
);

// ─── Chip ─────────────────────────────────────────────────────────────────────
interface ChipProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}
export const Chip: React.FC<ChipProps> = ({ selected, onClick, children }) => (
  <div className={`chip ${selected ? 'selected' : ''}`} onClick={onClick}>
    {children}
  </div>
);
