import { PaginatedRequestDTO } from '@models/requests';
import { Rocket } from '@models/rocket/rocket';

export type BaseListLaunchesFilter = {
  rocketId?: Rocket['id'];
  rocketName?: Rocket['name'];
  launchYear?: number;
};

export type LaunchesListFilteredRequestDTO = PaginatedRequestDTO<BaseListLaunchesFilter>;
