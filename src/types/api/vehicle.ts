export interface Vehicle {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string; // "unknown" or number as string
  length: string; // may contain trailing spaces
  max_atmosphering_speed: string; // "unknown" or number as string
  crew: string; // number as string
  passengers: string; // number as string
  cargo_capacity: string; // "none", "unknown", or number as string
  consumables: string; // "none", "unknown", "2 days", etc.
  vehicle_class: string;
  pilots: string[]; // URLs (people)
  films: string[]; // URLs (films)
  created: string; // ISO date string
  edited: string; // ISO date string
  url: string;
}
