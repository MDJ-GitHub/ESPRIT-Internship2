import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/Car';
import { environment } from 'src/environments/environment';
import { Container } from 'src/models/Container';
import { Containment } from 'src/models/Containment';
import { Freight } from 'src/models/Freight';
import { Personnel } from 'src/models/Personnel';
import { Resource } from 'src/models/Resource';
import { Station } from 'src/models/Station';
import { Train } from 'src/models/Train';

@Injectable({
  providedIn: 'root'
})

export class Services {

  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  addCar(car: Car): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addCar`, car);
  }
  modifyCar(car: Car): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modifyCar`, car);
  }
  deleteCar(idCar: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteCar?idCar=${idCar}`);
  }
  retrieveCar(idCar: number): Observable<Car> {
    return this.http.get<Car>(`${this.baseUrl}/retrieveCar?idCar=${idCar}`);
  }
  retrieveAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.baseUrl}/retrieveAllCars`);
  }

  addContainer(container: Container): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addContainer`, container);
  }
  modifyContainer(container: Container): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modifyContainer`, container);
  }
  deleteContainer(idContainer: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteContainer?idContainer=${idContainer}`);
  }
  retrieveContainer(idContainer: number): Observable<Container> {
    return this.http.get<Container>(`${this.baseUrl}/retrieveContainer?idContainer=${idContainer}`);
  }
  retrieveAllContainers(): Observable<Container[]> {
    return this.http.get<Container[]>(`${this.baseUrl}/retrieveAllContainers`);
  }

  addContainment(containment: Containment): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addContainment`, containment);
  }
  modifyContainment(containment: Containment): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modifyContainment`, containment);
  }
  deleteContainment(idContainment: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteContainment?idContainment=${idContainment}`);
  }
  retrieveContainment(idContainment: number): Observable<Containment> {
    return this.http.get<Containment>(`${this.baseUrl}/retrieveContainment?idContainment=${idContainment}`);
  }
  retrieveAllContainments(): Observable<Containment[]> {
    return this.http.get<Containment[]>(`${this.baseUrl}/retrieveAllContainments`);
  }

  addFreight(freight: Freight): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addFreight`, freight);
  }
  modifyFreight(freight: Freight): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modifyFreight`, freight);
  }
  deleteFreight(idFreight: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteFreight?idFreight=${idFreight}`);
  }
  retrieveFreight(idFreight: number): Observable<Freight> {
    return this.http.get<Freight>(`${this.baseUrl}/retrieveFreight?idFreight=${idFreight}`);
  }
  retrieveAllFreights(): Observable<Freight[]> {
    return this.http.get<Freight[]>(`${this.baseUrl}/retrieveAllFreights`);
  }

  addPersonnel(personnel: Personnel): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addPersonnel`, personnel);
  }
  modifyPersonnel(personnel: Personnel): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modifyPersonnel`, personnel);
  }
  deletePersonnel(idPersonnel: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deletePersonnel?idPersonnel=${idPersonnel}`);
  }
  retrievePersonnel(idPersonnel: number): Observable<Personnel> {
    return this.http.get<Personnel>(`${this.baseUrl}/retrievePersonnel?idPersonnel=${idPersonnel}`);
  }
  retrieveAllPersonnel(): Observable<Personnel[]> {
    return this.http.get<Personnel[]>(`${this.baseUrl}/retrieveAllPersonnel`);
  }

  addResource(resource: Resource): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addResource`, resource);
  }
  modifyResource(resource: Resource): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modifyResource`, resource);
  }
  deleteResource(idResource: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteResource?idResource=${idResource}`);
  }
  retrieveResource(idResource: number): Observable<Resource> {
    return this.http.get<Resource>(`${this.baseUrl}/retrieveResource?idResource=${idResource}`);
  }
  retrieveAllResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.baseUrl}/retrieveAllResources`);
  }

  addStation(station: Station): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addStation`, station);
  }
  modifyStation(station: Station): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modifyStation`, station);
  }
  deleteStation(idStation: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteStation?idStation=${idStation}`);
  }
  retrieveStation(idStation: number): Observable<Station> {
    return this.http.get<Station>(`${this.baseUrl}/retrieveStation?idStation=${idStation}`);
  }
  retrieveAllStations(): Observable<Station[]> {
    return this.http.get<Station[]>(`${this.baseUrl}/retrieveAllStations`);
  }

  addTrain(train: Train): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addTrain`, train);
  }
  modifyTrain(train: Train): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modifyTrain`, train);
  }
  deleteTrain(idTrain: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteTrain?idTrain=${idTrain}`);
  }
  retrieveTrain(idTrain: number): Observable<Train> {
    return this.http.get<Train>(`${this.baseUrl}/retrieveTrain?idTrain=${idTrain}`);
  }
  retrieveAllTrains(): Observable<Train[]> {
    return this.http.get<Train[]>(`${this.baseUrl}/retrieveAllTrains`);
  }

}