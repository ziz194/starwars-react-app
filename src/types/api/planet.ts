export interface Planet {
  name: string;
  rotation_period: string; // number as string or "unknown"
  orbital_period: string; // number as string or "unknown"
  diameter: string; // number as string or "unknown"
  climate: string;
  gravity: string; // e.g. "1 standard", "1.5 (surface)", "N/A"
  terrain: string;
  surface_water: string; // number as string or "unknown"
  population: string; // number as string or "unknown"
  residents: string[]; // people URLs
  films: string[]; // film URLs
  created: string; // ISO date string
  edited: string; // ISO date string
  url: string;
}
