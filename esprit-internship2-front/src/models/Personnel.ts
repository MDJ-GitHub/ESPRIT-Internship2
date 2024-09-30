export interface Personnel {
  id?: number;
  firstName?: string;
  lastName?: string;
  password?: string;
  phone?: number;
  email?: string;
  birthDate?: string; 
  photo?: string;
  salary?: number;

  personnelRole?: PersonnelRole;
  
  state?: number;
}

export enum PersonnelRole {
  Client = 'Client',
  Admin = 'Admin',
  Driver = 'Driver',
  Worker = 'Worker',
  Mechanic = 'Mechanic',
  Technician = 'Technician',
  Monitor = 'Monitor'
}
