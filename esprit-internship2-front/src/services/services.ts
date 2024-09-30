import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Car } from '../models/Car';
import { environment } from 'src/environments/environment';
import { Container } from 'src/models/Container';
import { Containment } from 'src/models/Containment';
import { Freight } from 'src/models/Freight';
import { Personnel } from 'src/models/Personnel';
import { Resource } from 'src/models/Resource';
import { Station } from 'src/models/Station';
import { Train } from 'src/models/Train';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class Services {

  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient,
    private router: Router) {}

  addCar(car: Car): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addCar`, car);
  }
  modifyCar(car: Car): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modifyCar`, car);
  }
  deleteCar(idCar: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/deleteCar?idCar=${idCar}`,'');
  }
  retrieveCar(idCar: number): Observable<Car> {
    return this.http.get<Car>(`${this.baseUrl}/retrieveCar?idCar=${idCar}`);
  }
  retrieveAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.baseUrl}/retrieveAllCars`);
  }
  attachCar(idCar: number, idTrain: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/attachCar?idCar=${idCar}&idTrain=${idTrain}`,'');
  }

  addContainer(container: Container): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addContainer`, container);
  }
  modifyContainer(container: Container): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modifyContainer`, container);
  }
  deleteContainer(idContainer: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/deleteContainer?idContainer=${idContainer}`,'');
  }
  retrieveContainer(idContainer: number): Observable<Container> {
    return this.http.get<Container>(`${this.baseUrl}/retrieveContainer?idContainer=${idContainer}`);
  }
  retrieveAllContainers(): Observable<Container[]> {
    return this.http.get<Container[]>(`${this.baseUrl}/retrieveAllContainers`);
  }

  addContainment(containment: Containment, idFreight: number, idResource: number | undefined): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addContainment?idFreight=${idFreight}&idResource=${idResource}`, containment);
  }
  modifyContainment(containment: Containment): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modifyContainment`, containment);
  }
  deleteContainment(idContainment: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/deleteContainment?idContainment=${idContainment}`,'');
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
    return this.http.put<any>(`${this.baseUrl}/deleteFreight?idFreight=${idFreight}`,'');
  }
  retrieveFreight(idFreight: number): Observable<Freight> {
    return this.http.get<Freight>(`${this.baseUrl}/retrieveFreight?idFreight=${idFreight}`);
  }
  retrieveAllFreights(): Observable<Freight[]> {
    return this.http.get<Freight[]>(`${this.baseUrl}/retrieveAllFreights`);
  }
  launchFreight(idFreight: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/launchFreight?idFreight=${idFreight}`,'');
  }
  arriveFreight(idFreight: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/arriveFreight?idFreight=${idFreight}`,'');
  }

  addPersonnel(personnel: Personnel): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addPersonnel`, personnel);
  }
  modifyPersonnel(personnel: Personnel): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modifyPersonnel`, personnel);
  }
  deletePersonnel(idPersonnel: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/deletePersonnel?idPersonnel=${idPersonnel}`,'');
  }
  retrievePersonnel(idPersonnel: number): Observable<Personnel> {
    return this.http.get<Personnel>(`${this.baseUrl}/retrievePersonnel?idPersonnel=${idPersonnel}`);
  }
  retrieveAllPersonnels(): Observable<Personnel[]> {
    return this.http.get<Personnel[]>(`${this.baseUrl}/retrieveAllPersonnels`);
  }
  retrieveClients(searchString: string): Observable<Personnel[]> {
    return this.http.get<Personnel[]>(`${this.baseUrl}/retrieveClients?searchString=${searchString}`);
  }


  addResource(resource: Resource): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addResource`, resource);
  }
  modifyResource(resource: Resource): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modifyResource`, resource);
  }
  deleteResource(idResource: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/deleteResource?idResource=${idResource}`,'');
  }
  retrieveResource(idResource: number): Observable<Resource> {
    return this.http.get<Resource>(`${this.baseUrl}/retrieveResource?idResource=${idResource}`);
  }
  retrieveAllResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.baseUrl}/retrieveAllResources`);
  }
  retrieveResourcesByStation(stationStart: string, stationArrive: string): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.baseUrl}/retrieveResourcesByStation?stationStart=${stationStart}&stationArrive=${stationArrive}`);
  }

  addTrain(train: Train): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addTrain`, train);
  }
  modifyTrain(train: Train): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modifyTrain`, train);
  }
  deleteTrain(idTrain: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/deleteTrain?idTrain=${idTrain}`,'');
  }
  retrieveTrain(idTrain: number): Observable<Train> {
    return this.http.get<Train>(`${this.baseUrl}/retrieveTrain?idTrain=${idTrain}`);
  }
  retrieveAllTrains(): Observable<Train[]> {
    return this.http.get<Train[]>(`${this.baseUrl}/retrieveAllTrains`);
  }
  retrieveTrainsByAxe(trainAxe: string): Observable<Train[]> {
    return this.http.get<Train[]>(`${this.baseUrl}/retrieveTrainsByAxe?trainAxe=${trainAxe}`);
  }

  askQuestion(ask: string) {
    return this.http.post(`${this.baseUrl}/askQuestion`, ask, { responseType: 'json' })
  }


  private addCarPopupSubject = new BehaviorSubject<boolean>(false);
  addCarVisible$ = this.addCarPopupSubject.asObservable();
  addCarPopup() {
    const currentState = this.addCarPopupSubject.value;
    this.addCarPopupSubject.next(!currentState);
  }

  private addContainerPopupSubject = new BehaviorSubject<boolean>(false);
  addContainerVisible$ = this.addContainerPopupSubject.asObservable();
  addContainerPopup() {
    const currentState = this.addContainerPopupSubject.value;
    this.addContainerPopupSubject.next(!currentState);
  }

  private addPersonnelPopupSubject = new BehaviorSubject<boolean>(false);
  addPersonnelVisible$ = this.addPersonnelPopupSubject.asObservable();
  addPersonnelPopup() {
    const currentState = this.addPersonnelPopupSubject.value;
    this.addPersonnelPopupSubject.next(!currentState);
  }

  private addTrainPopupSubject = new BehaviorSubject<boolean>(false);
  addTrainVisible$ = this.addTrainPopupSubject.asObservable();
  addTrainPopup() {
    const currentState = this.addTrainPopupSubject.value;
    this.addTrainPopupSubject.next(!currentState);
  }

  private addResourcePopupSubject = new BehaviorSubject<boolean>(false);
  addResourceVisible$ = this.addResourcePopupSubject.asObservable();
  addResourcePopup() {
    const currentState = this.addResourcePopupSubject.value;
    this.addResourcePopupSubject.next(!currentState);
  }

  addFreightPopup() {
    this.router.navigate(['/freight/add']);
  }




}