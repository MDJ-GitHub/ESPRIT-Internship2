import { Containment } from './Containment';
import { Station } from './Station';

export interface Container {
  id?: number;
  title?: string;
  creationDate?: string;
  photo?: string;
  weight?: number;
  weightLimit?: number;
  width?: number;
  length?: number;
  height?: number;
  cost?: number;

  containerType?: ContainerType;
  station?: Station; 

  containment?: Containment; 

  state?: number;
}

export enum ContainerType {
  Metallic = 'Metallic',
  Plastic = 'Plastic',
  Wooden = 'Wooden',
  Cardboard = 'Cardboard',
  Special = 'Special'
}