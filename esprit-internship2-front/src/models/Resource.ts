import { Containment } from './Containment';
import { Personnel } from './Personnel';

export interface Resource {
  id?: number;
  creationDate?: string;
  photo?: string;
  weight?: number;
  cost?: number;
  count?: number;
  ressourceType?: RessourceType;
  containment?: Containment;
  owner?: Personnel;
  state?: number;
}

export enum RessourceType {
  Nutrition = 'Nutrition',
  Construction = 'Construction',
  Mineral = 'Mineral',
  Liquid = 'Liquid',
  Special = 'Special'
}
