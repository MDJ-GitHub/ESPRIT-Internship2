import { Station } from './Station';
import { Train } from './Train';
import { Containment } from './Containment';
import { Personnel } from './Personnel';

export interface Freight {
  id?: number;
  launchDate?: string; 
  arrivalDate?: string; 
  actarrivalDate?: string;
  description?: string;
  priority?: number;
  cost?: number;

  stationStart?: Station; 
  stationArrive?: Station; 

  train?: Train; 
  containments?: Containment[]; 
  personnels?: Personnel[]; 
  
  state?: number;
}