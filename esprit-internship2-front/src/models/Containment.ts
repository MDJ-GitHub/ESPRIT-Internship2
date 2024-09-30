import { Container } from './Container';
import { Resource } from './Resource';
import { Freight } from './Freight';

export interface Containment {
  id?: number;

  resource?: Resource;
  containers?: Container[];
  freight?: Freight;
  
  state?: number;
}