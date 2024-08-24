import { Station } from './Station';
import { Car } from './Car';

export interface Train {
  id?: number;
  title?: string;
  dateCreation?: string;
  photo?: string;
  weight?: number;
  weightLimit?: number;
  speed?: number;
  energyLimit?: number;
  cost?: number;
  ressourceType?: TrainType;
  cars?: Car[];
  station?: Station;
  state?: number;
}

export enum TrainType {
  Electrical = 'Electrical',
  Gas = 'Gas'
}
