import { Containment } from './Containment';
import { Personnel } from './Personnel';
import { Station } from './Station';

export interface Resource {
  id?: number;
  title?: string;
  addedDate?: string;
  photo?: string;
  weight?: number;
  width?: number;
  length?: number;
  height?: number;
  cost?: number;
  count?: number;
  
  resourceType?: ResourceType;
  stationStart?: Station;
  stationArrive?: Station;


  containment?: Containment;
  owner?: Personnel;

  state?: number;
}

export enum ResourceType {
  Nutrition = 'Nutrition',
  Construction = 'Construction',
  Mineral = 'Mineral',
  Liquid = 'Liquid',
  Special = 'Special'
}
