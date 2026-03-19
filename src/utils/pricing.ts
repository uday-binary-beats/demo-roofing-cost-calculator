import type { FormState, EstimateResult, Slope, Material } from '../types';

const SLOPE_MULT: Record<Slope, number> = {
  flat: 0,
  low: 1.0,
  moderate: 1.15,
  steep: 1.3,
};

const MAT_MULT: Record<Material, number> = {
  asphalt3tab: 1.0,
  architecturalShingle: 1.25,
  metal: 2.6,
  tile: 2.2,
  slate: 3.5,
  woodshake: 1.8,
};

const BASE_PRICE_PER_SQFT = 5.8;

export function calcEstimate(state: FormState): EstimateResult {
  const sqftA = state.includeARoof ? state.roofSqft ?? 1800 : 0;
  const sqftB = state.includeBRoof ? state.roofBSqft ?? 0 : 0;
  const totalSqft = sqftA + sqftB;

  const slopeMult = SLOPE_MULT[state.slopeA ?? 'moderate'];
  const matMult = MAT_MULT[state.material ?? 'architecturalShingle'];
  const buildingMult = state.buildingType === 'commercial' ? 1.25 : 1.0;
  const condMult = state.condition === 'tearoff' ? 1.12 : 1.0;

  const base = totalSqft * BASE_PRICE_PER_SQFT * slopeMult * matMult * buildingMult * condMult;
  const low = Math.round((base * 0.88) / 100) * 100;
  const high = Math.round((base * 1.18) / 100) * 100;

  return { low, high, sqft: totalSqft };
}

export const MATERIAL_LABELS: Record<Material, string> = {
  asphalt3tab: '3-Tab Asphalt',
  architecturalShingle: 'Architectural Shingles',
  metal: 'Metal',
  tile: 'Tile (Clay/Concrete)',
  slate: 'Natural Slate',
  woodshake: 'Wood Shake',
};

export const SLOPE_LABELS: Record<Slope, string> = {
  flat: 'Flat',
  low: 'Low',
  moderate: 'Moderate',
  steep: 'Steep',
};

export const CONDITION_LABELS: Record<string, string> = {
  overlay: 'Overlay',
  tearoff: 'Full tear-off',
  unsure: 'TBD on site',
};
