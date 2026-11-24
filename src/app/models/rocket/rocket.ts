export interface Rocket {
  id: string;
  name: string;
  active: boolean;
  first_flight: string | null;
  country: string;
  company: string;
  wikipedia: string | null;
  description: string;
  image: string | null;
  total_launch_count: number;
  successful_launches: number;
  failed_launches: number;
  pending_launches: number;
  launch_cost: number | null;
  launch_mass: number | null;
  leo_capacity: number | null;
  gto_capacity: number | null;
}
