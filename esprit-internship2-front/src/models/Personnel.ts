export interface Personnel {
  id?: number;
  firstName?: string;
  lastName?: string;
  birthDate?: string; 
  photo?: string;
  salary?: number;
  personnelRole?: PersonnelRole;
  state?: number;
}

export enum PersonnelRole {
  Client = 'Client',
  Driver = 'Driver',
  Worker = 'Worker',
  Mechanic = 'Mechanic',
  Technician = 'Technician',
  Monitor = 'Monitor'
}
