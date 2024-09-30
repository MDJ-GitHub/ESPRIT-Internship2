import { Train } from './Train';
import { Station } from './Station';

export interface Car {
    id?: number;
    title?: string;
    creationDate?: string;
    photo?: string;
    weight?: number;
    weightLimit?: number;
    widthLimit?: number;
    lengthLimit?: number;
    heightLimit?: number;
    cost?: number;

    station?: Station;

    train?: Train; 
    
    state?: number;
  }
