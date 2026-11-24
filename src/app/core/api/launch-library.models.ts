import { Launch, LaunchDatePrecision } from '@models/launches/launch';
import { Rocket } from '@models/rocket/rocket';

export interface Ll2ListResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Ll2Launch {
  id: string;
  name: string;
  status?: { name?: string; abbrev?: string };
  net?: string | null;
  net_precision?: { name?: string };
  image?: { image_url?: string | null; thumbnail_url?: string | null } | null;
  launch_service_provider?: { name?: string } | null;
  rocket?: { configuration?: { id?: number; name?: string } | null } | null;
  mission?: {
    description?: string | null;
    info_urls?: Array<{ url?: string }>;
    vid_urls?: Array<{ url?: string }>;
  } | null;
  pad?: { id?: number; name?: string; location?: { name?: string } } | null;
  agency_launch_attempt_count?: number | null;
  orbital_launch_attempt_count?: number | null;
  failreason?: string | null;
  window_start?: string | null;
  window_end?: string | null;
}

export interface Ll2LauncherConfiguration {
  id: number;
  name: string;
  active?: boolean;
  maiden_flight?: string | null;
  manufacturer?: { name?: string } | null;
  image?: { image_url?: string | null; thumbnail_url?: string | null } | null;
  total_launch_count?: number;
  successful_launches?: number;
  failed_launches?: number;
  pending_launches?: number;
  launch_cost?: number | null;
  launch_mass?: number | null;
  leo_capacity?: number | null;
  gto_capacity?: number | null;
  wiki_url?: string | null;
  description?: string | null;
  families?: Array<{ name?: string }>;
}

const precisionFromLl2 = (name?: string): LaunchDatePrecision => {
  if (!name) return 'day';
  const value = name.toLowerCase();
  if (value.includes('minute') || value.includes('second')) return 'hour';
  if (value.includes('month')) return 'month';
  if (value.includes('year')) return 'year';
  return 'day';
};

export function mapLl2Launch(source: Ll2Launch, upcoming: boolean): Launch {
  const date = source.net || source.window_start || '';
  const status = source.status?.name || source.status?.abbrev || 'Unknown';
  const normalizedStatus = status.toLowerCase();
  const success = normalizedStatus.includes('success')
    ? true
    : normalizedStatus.includes('failure') || normalizedStatus.includes('partial failure')
      ? false
      : null;
  const image = source.image?.image_url || source.image?.thumbnail_url || null;
  const video = source.mission?.vid_urls?.[0]?.url || null;
  const article = source.mission?.info_urls?.[0]?.url || null;

  return {
    id: source.id,
    name: source.name,
    flight_number: source.agency_launch_attempt_count || source.orbital_launch_attempt_count || 0,
    date_utc: date,
    date_unix: date ? Math.floor(new Date(date).getTime() / 1000) : 0,
    date_local: date,
    date_precision: precisionFromLl2(source.net_precision?.name),
    upcoming,
    success,
    status,
    details: source.mission?.description || source.failreason || null,
    rocket: source.rocket?.configuration?.id?.toString() || '',
    launchpad: source.pad?.id?.toString() || '',
    image,
    payloads: [],
    capsules: [],
    ships: [],
    crew: [],
    failures: source.failreason ? [{ time: 0, altitude: null, reason: source.failreason }] : [],
    cores: [],
    links: {
      patch: { small: image, large: image },
      reddit: { campaign: null, launch: null, media: null, recovery: null },
      flickr: { small: [], original: [] },
      presskit: null,
      webcast: video,
      youtube_id: null,
      article,
      wikipedia: null,
    },
    auto_update: true,
    tbd: status.toLowerCase().includes('tbd'),
    static_fire_date_utc: null,
    static_fire_date_unix: null,
    net: true,
    window: source.window_start && source.window_end
      ? Math.max(0, Math.floor((new Date(source.window_end).getTime() - new Date(source.window_start).getTime()) / 1000))
      : null,
    launch_library_id: source.id,
  };
}

export function mapLl2Rocket(source: Ll2LauncherConfiguration): Rocket {
  return {
    id: source.id.toString(),
    name: source.name,
    active: source.active ?? true,
    first_flight: source.maiden_flight || null,
    country: '',
    company: source.manufacturer?.name || 'Unknown manufacturer',
    wikipedia: source.wiki_url || null,
    description: source.description || source.families?.map((family) => family.name).filter(Boolean).join(' / ') || '',
    image: source.image?.image_url || source.image?.thumbnail_url || null,
    total_launch_count: source.total_launch_count || 0,
    successful_launches: source.successful_launches || 0,
    failed_launches: source.failed_launches || 0,
    pending_launches: source.pending_launches || 0,
    launch_cost: source.launch_cost ?? null,
    launch_mass: source.launch_mass ?? null,
    leo_capacity: source.leo_capacity ?? null,
    gto_capacity: source.gto_capacity ?? null,
  };
}
