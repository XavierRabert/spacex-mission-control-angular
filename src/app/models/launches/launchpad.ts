export type RocketId = string;
export type LaunchId = string;

export type LaunchpadStatus = 'active' | 'inactive' | 'retired';

export interface Launchpad {
  id: string;
  name: string;
  full_name: string;
  locality: string;
  region: string;
  latitude: number;
  longitude: number;
  timezone: string;
  status: LaunchpadStatus;

  images: {
    large: string[];
  };

  launch_attempts: number;
  launch_successes: number;

  rockets: RocketId[];
  launches: LaunchId[];

  details: string;
}
