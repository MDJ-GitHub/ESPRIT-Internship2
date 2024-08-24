import { Containment } from './Containment';
import { Station } from './Station';

export interface Container {
  id?: number;
  creationDate?: string;
  photo?: string;
  weight?: number;
  weightLimit?: number;
  width?: number;
  length?: number;
  height?: number;
  cost?: number;
  containerType?: ContainerType;
  containment?: Containment; 
  station?: Station; 
  state?: number;
}

export enum ContainerType {
  Metallic = 'Metallic',
  Plastic = 'Plastic',
  Wooden = 'Wooden',
  Cardboard = 'Cardboard',
  Special = 'Special'
}