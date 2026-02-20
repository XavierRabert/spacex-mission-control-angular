export interface Rocket {
  id: string;
  name: string;
  type: string;

  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;

  first_flight: string; // si vols pots convertir-ho a Date després
  country: string;
  company: string;
  wikipedia: string;
  description: string;

  height: Dimension;
  diameter: Dimension;
  mass: Mass;

  first_stage: RocketStage;
  second_stage: SecondStage;

  engines: RocketEngines;
  landing_legs: LandingLegs;

  payload_weights: PayloadWeight[];

  flickr_images: string[];
}

export interface Dimension {
  meters: number;
  feet: number;
}

export interface Mass {
  kg: number;
  lb: number;
}

export interface RocketStage {
  thrust_sea_level: Thrust;
  thrust_vacuum: Thrust;
  reusable: boolean;
  engines: number;
  fuel_amount_tons: number;
  burn_time_sec: number;
}

export interface SecondStage {
  thrust: Thrust;
  payloads: {
    composite_fairing: {
      height: Dimension;
      diameter: Dimension;
    };
    option_1: string;
  };
  reusable: boolean;
  engines: number;
  fuel_amount_tons: number;
  burn_time_sec: number;
}

export interface RocketEngines {
  isp: {
    sea_level: number;
    vacuum: number;
  };
  thrust_sea_level: Thrust;
  thrust_vacuum: Thrust;
  number: number;
  type: string;
  version: string;
  layout: string;
  engine_loss_max: number;
  propellant_1: string;
  propellant_2: string;
  thrust_to_weight: number;
}

export interface LandingLegs {
  number: number;
  material: string;
}

export interface PayloadWeight {
  id: string;
  name: string;
  kg: number;
  lb: number;
}

export interface Thrust {
  kN: number;
  lbf: number;
}
