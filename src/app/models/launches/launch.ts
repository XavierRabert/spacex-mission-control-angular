export interface Launch {
  id: string;

  name: string;
  flight_number: number;

  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: LaunchDatePrecision;

  upcoming: boolean;
  success: boolean | null;

  details: string | null;

  rocket: string;
  launchpad: string;

  payloads: string[];
  capsules: string[];
  ships: string[];
  crew: string[];

  failures: LaunchFailure[];

  cores: LaunchCore[];

  links: LaunchLinks;

  auto_update: boolean;
  tbd: boolean;

  static_fire_date_utc: string | null;
  static_fire_date_unix: number | null;

  net: boolean;
  window: number | null;

  launch_library_id: string | null;
}

export type LaunchDatePrecision = 'hour' | 'day' | 'month' | 'quarter' | 'half' | 'year';

export interface LaunchFailure {
  time: number;
  altitude: number | null;
  reason: string;
}

export interface LaunchCore {
  core: string | null;

  flight: number | null;

  gridfins: boolean | null;
  legs: boolean | null;
  reused: boolean | null;

  landing_attempt: boolean | null;
  landing_success: boolean | null;

  landing_type: string | null;
  landpad: string | null;
}

export interface LaunchLinks {
  patch: LaunchPatch;

  reddit: LaunchReddit;
  flickr: LaunchFlickr;

  presskit: string | null;
  webcast: string | null;

  youtube_id: string | null;

  article: string | null;
  wikipedia: string | null;
}

export interface LaunchPatch {
  small: string | null;
  large: string | null;
}

export interface LaunchReddit {
  campaign: string | null;
  launch: string | null;
  media: string | null;
  recovery: string | null;
}

export interface LaunchFlickr {
  small: string[];
  original: string[];
}
