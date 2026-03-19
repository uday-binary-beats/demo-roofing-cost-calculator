export type Slope = 'flat' | 'low' | 'moderate' | 'steep';
export type Material =
  | 'asphalt3tab'
  | 'architecturalShingle'
  | 'metal'
  | 'tile'
  | 'slate'
  | 'woodshake';
export type Condition = 'overlay' | 'tearoff' | 'unsure';
export type BuildingType = 'residential' | 'commercial';
export type Reason = 'storm' | 'age' | 'leak' | 'upgrade' | 'sale' | 'other';
export type Timeline = 'asap' | '1to3' | '3to6' | 'quotes';

export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface FormState {
  addressDisplay: string;
  lat: number | null;
  lon: number | null;
  roofSqft: number;
  roofBSqft: number;
  includeARoof: boolean;
  includeBRoof: boolean;
  slopeA: Slope | null;
  slopeB: Slope | null;
  buildingType: BuildingType | null;
  material: Material | null;
  condition: Condition | null;
  reason: Reason | null;
  timeline: Timeline | null;
  contact: ContactInfo;
}

export interface GeoSuggestion {
  display: string;
  lat: number;
  lon: number;
}

export interface EstimateResult {
  low: number;
  high: number;
  sqft: number;
}
