import { Rocket } from '@models/rocket/rocket';

export interface RocketSpec {
  label: string;
  value: string | number;
}

export function getRocketSpecs(rocket: Rocket): RocketSpec[] {
  if (!rocket) return [];
  return [
    { label: 'TOTAL LAUNCHES', value: rocket.total_launch_count },
    { label: 'SUCCESSFUL', value: rocket.successful_launches },
    { label: 'FAILED', value: rocket.failed_launches },
    { label: 'PENDING', value: rocket.pending_launches },
    { label: 'LAUNCH MASS', value: rocket.launch_mass ? `${rocket.launch_mass.toLocaleString()} t` : 'N/A' },
    { label: 'LEO CAPACITY', value: rocket.leo_capacity ? `${rocket.leo_capacity.toLocaleString()} kg` : 'N/A' },
    { label: 'GTO CAPACITY', value: rocket.gto_capacity ? `${rocket.gto_capacity.toLocaleString()} kg` : 'N/A' },
    { label: 'LAUNCH COST', value: rocket.launch_cost ? `$${rocket.launch_cost.toLocaleString()}` : 'N/A' },
  ];
}
