import { Train } from './Train';
import { Station } from './Station';

export interface Car {
    id?: number;
    creationDate?: string;
    photo?: string;
    weight?: number;
    weightLimit?: number;
    widthLimit?: number;
    lengthLimit?: number;
    heightLimit?: number;
    cost?: number;
    train?: Train; 
    station?: Station;
    state?: number;
  }
