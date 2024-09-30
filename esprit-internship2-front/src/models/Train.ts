import { Station } from './Station';
import { Car } from './Car';
import { Freight } from './Freight';

export interface Train {
  id?: number;
  title?: string;
  creationDate?: string;
  photo?: string;
  weight?: number;
  weightLimit?: number;
  speed?: number;
  energyLimit?: number;
  cost?: number;

  station?: Station;
  trainType?: TrainType;
  trainAxe?: TrainAxe;

  cars?: Car[];
  freights?: Freight[];

  state?: number;
}

export enum TrainType {
  Electrical = 'Electrical',
  Gas = 'Gas'
}
export enum TrainAxe {
  Tunis_Sousse_Sfax_Gabes_Gafsa = "Tunis_Sousse_Sfax_Gabes_Gafsa",
  Tunis_LaGoulette = "Tunis_LaGoulette",
  Tunis_Gaafour_Djerissa_Kasserine = "Tunis_Gaafour_Djerissa_Kasserine",
  Tunis_Beja_Ghardimaou = "Tunis_Beja_Ghardimaou",
  Tunis_Bizerte = "Tunis_Bizerte"
}

