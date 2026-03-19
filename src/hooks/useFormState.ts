import { useState, useCallback } from 'react';
import type { FormState } from '../types';

const DEFAULT_STATE: FormState = {
  addressDisplay: '',
  lat: null,
  lon: null,
  roofSqft: 0,
  roofBSqft: 0,
  includeARoof: true,
  includeBRoof: true,
  slopeA: null,
  slopeB: null,
  buildingType: null,
  material: null,
  condition: null,
  reason: null,
  timeline: null,
  contact: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
};

export function useFormState() {
  const [state, setStateRaw] = useState<FormState>(DEFAULT_STATE);

  const setState = useCallback((updater: (prev: FormState) => FormState) => {
    setStateRaw(updater);
  }, []);

  const reset = useCallback(() => setStateRaw(DEFAULT_STATE), []);

  return { state, setState, reset };
}
