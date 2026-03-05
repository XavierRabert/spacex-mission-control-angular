import { PaginatedRequestDTO } from '@models/requests';
import { Rocket } from './rocket';

export type RocketListFilteredRequestDTO = PaginatedRequestDTO<Rocket['id'][]>;
