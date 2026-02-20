import { Rocket, RocketStage, SecondStage } from '@models/rocket/rocket';

export interface RocketSpec {
  label: string;
  value: string | number;
}

export interface RocketStages {
  title: string;
  data: RocketStage | SecondStage;
}

export function getRocketSpecs(rocket: Rocket): RocketSpec[] {
  if (!rocket) return [];

  return [
    { label: 'HEIGHT', value: `${rocket.height.meters} m` },
    { label: 'DIAMETER', value: `${rocket.diameter.meters} m` },
    { label: 'MASS', value: `${rocket.mass.kg.toLocaleString()} kg` },
    { label: 'ENGINES', value: rocket.engines.number },
  ];
}

export function getRocketStages(rocket: Rocket): RocketStages[] {
  if (!rocket) return [];

  return [
    {
      title: 'FIRST STAGE',
      data: rocket.first_stage,
    },
    {
      title: 'SECOND STAGE',
      data: rocket.second_stage,
    },
  ];
}
