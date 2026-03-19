import React from 'react';
import type { FormState } from '../../types';
import { calcEstimate, MATERIAL_LABELS, SLOPE_LABELS, CONDITION_LABELS } from '../../utils/pricing';

interface Props {
  state: FormState;
  onRestart: () => void;
  totalSteps: number;
}

interface DetailCard {
  label: string;
  value: string;
}

const StepResult: React.FC<Props> = ({ state, onRestart, totalSteps }) => {
  const { low, high, sqft } = calcEstimate(state);

  const details: DetailCard[] = [
    { label: 'Estimated roof area', value: `~${sqft.toLocaleString()} sq ft` },
    { label: 'Roof pitch',          value: SLOPE_LABELS[state.slopeA ?? 'moderate'] },
    { label: 'Material',            value: MATERIAL_LABELS[state.material ?? 'architecturalShingle'] },
    { label: 'Building type',       value: state.buildingType === 'commercial' ? 'Commercial' : 'Residential' },
    { label: 'Installation',        value: CONDITION_LABELS[state.condition ?? 'unsure'] },
    { label: 'Address',             value: (state.addressDisplay ?? '').split(',').slice(0, 2).join(',') || '—' },
  ];

  return (
    <div className="step-enter">
      <div className="step-label">Step {totalSteps} of {totalSteps} · Your Estimate</div>

      <div className="estimate-card">
        <div className="estimate-range-label">Estimated project range</div>
        <div className="estimate-range">
          ${low.toLocaleString()} – ${high.toLocaleString()}
        </div>
        <div className="estimate-sub">
          Based on ~{sqft.toLocaleString()} sq ft · Florida labor &amp; materials
        </div>
      </div>

      <div className="estimate-detail-grid">
        {details.map((d) => (
          <div key={d.label} className="estimate-detail-card">
            <div className="detail-label">{d.label}</div>
            <div className="detail-value" style={{ fontSize: d.value.length > 16 ? 13 : 15 }}>
              {d.value}
            </div>
          </div>
        ))}
      </div>

      <div className="confirm-banner success-banner">
        <span className="banner-icon">📬</span>
        <div>
          <div className="banner-title">Estimate sent to {state.contact.email}</div>
          <div className="banner-body">
            A team member will follow up within 1 business day to schedule your free on-site inspection.
          </div>
        </div>
      </div>

      <div className="confirm-banner info-banner">
        <strong>Disclaimer:</strong>&nbsp;This is a preliminary estimate based on satellite data
        and your responses. Final pricing is confirmed after an on-site inspection and may vary
        based on actual conditions.
      </div>

      <button className="btn-back restart-btn" onClick={onRestart}>
        ↺ Start a new estimate
      </button>
    </div>
  );
};

export default StepResult;
