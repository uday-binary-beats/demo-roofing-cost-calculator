import React from 'react';
import type { FormState, ContactInfo } from '../../types';
import { StepHeader, NavButtons } from '../ui';

interface Props {
  state: FormState;
  setState: (updater: (prev: FormState) => FormState) => void;
  onNext: () => void;
  onBack: () => void;
  totalSteps: number;
}

const StepContact: React.FC<Props> = ({ state, setState, onNext, onBack, totalSteps }) => {
  const update = (key: keyof ContactInfo, val: string) =>
    setState(p => ({ ...p, contact: { ...p.contact, [key]: val } }));

  const c = state.contact;
  const isValid =
    c.firstName.trim().length > 0 &&
    c.lastName.trim().length > 0 &&
    c.email.includes('@') &&
    c.phone.replace(/\D/g, '').length >= 10;

  return (
    <div className="step-enter">
      <StepHeader
        step={9}
        total={totalSteps}
        title="Where should we send your estimate?"
        subtitle="We'll email your full estimate. No spam, ever."
      />

      <div className="form-grid">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              className="form-input"
              placeholder="John"
              value={c.firstName}
              onChange={e => update('firstName', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              className="form-input"
              placeholder="Smith"
              value={c.lastName}
              onChange={e => update('lastName', e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            className="form-input"
            type="email"
            placeholder="john@example.com"
            value={c.email}
            onChange={e => update('email', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input
            className="form-input"
            type="tel"
            placeholder="(904) 555-0123"
            value={c.phone}
            onChange={e => update('phone', e.target.value)}
          />
        </div>

        <p style={{ fontSize: 12, color: '#9ca3af' }}>
          By submitting, you agree to be contacted about your estimate. We never sell your data.
        </p>
      </div>

      <NavButtons
        onBack={onBack}
        onNext={onNext}
        disabled={!isValid}
        nextLabel="Get my estimate →"
      />
    </div>
  );
};

export default StepContact;
