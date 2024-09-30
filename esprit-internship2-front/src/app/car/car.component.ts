import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/models/Car';
import { Station } from 'src/models/Station';
import { Train } from 'src/models/Train';
import { Services } from 'src/services/services';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {

  activeZoomIndex: number | undefined = undefined;

  attachVar: boolean = false
  cars: Car[] = [];
  trains: Train[] = [];
  trainsToAttach: Train[] = [];

  newCar: Car = {}

  unfiltered: Car[] = [];

  filter = {
    length: null,
    width: null,
    height: null,
    weight: null,
    cost: null,
    state: '',
    comparison: 'inferior'
  };

  car = {
    photo: '',
    weight: '',
    weightLimit: '',
    widthLimit: '',
    lengthLimit: '',
    heightLimit: '',
    cost: '',
    carType: '',
    station: '',
    title: ''
  };

  addCarVisible$: Observable<boolean>;

  constructor(private services: Services) {
    this.addCarVisible$ = this.services.addCarVisible$;
  }

  ngOnInit(): void {
    this.retrieveAllCars();
  }

  applyFilter() {
    this.cars = this.unfiltered
    this.cars = this.cars.filter(resource => {
      let matches = true;

      // Length filter
      if (this.filter.length !== null && this.filter.length !== '') {
        matches = matches && (this.filter.comparison === 'inferior' ? resource.lengthLimit as number <= this.filter.length : resource.lengthLimit as number >= this.filter.length);
      }

      // Width filter
      if (this.filter.width !== null && this.filter.width !== '') {
        matches = matches && (this.filter.comparison === 'inferior' ? resource.widthLimit as number <= this.filter.width : resource.widthLimit as number >= this.filter.width);
      }

      // Height filter
      if (this.filter.height !== null && this.filter.height !== '') {
        matches = matches && (this.filter.comparison === 'inferior' ? resource.heightLimit as number <= this.filter.height : resource.heightLimit as number >= this.filter.height);
      }

      // Weight filter
      if (this.filter.weight !== null && this.filter.weight !== '') {
        matches = matches && (this.filter.comparison === 'inferior' ? resource.weightLimit as number <= this.filter.weight : resource.weightLimit as number >= this.filter.weight);
      }

      // Cost filter
      if (this.filter.cost !== null && this.filter.cost !== '') {
        matches = matches && (this.filter.comparison === 'inferior' ? resource.cost as number <= this.filter.cost : resource.cost as number >= this.filter.cost);
      }

      // State filter
      if (this.filter.state !== null && this.filter.state !== '') {
        matches = matches && resource.state === parseInt(this.filter.state, 10);
      }

      return matches;
    });
  }

  checkComparison(value: number | undefined, filterValue: number): boolean {
    if (!this.filter.comparison || this.filter.comparison === 'inferior') {
      return value as number <= filterValue;
    } else if (this.filter.comparison === 'superior') {
      return value as number >= filterValue;
    }
    return true;
  }

  cancel() {
    this.services.addCarPopup();
  }

  selectedImageUrl: string | ArrayBuffer | null = null;
  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }


  addCar() {
    this.newCar.title = this.car.title;
    this.newCar.weight = this.car.weight as unknown as number;
    this.newCar.weightLimit = this.car.weightLimit as unknown as number;
    this.newCar.widthLimit = this.car.widthLimit as unknown as number;
    this.newCar.lengthLimit = this.car.lengthLimit as unknown as number;
    this.newCar.heightLimit = this.car.heightLimit as unknown as number;
    this.newCar.cost = this.car.cost as unknown as number;
    this.newCar.station = this.car.station as Station;
    this.newCar.photo = this.selectedImageUrl as string;

    if (this.modify == false) {

      this.services.addCar(this.newCar).subscribe(
        (response) => {
          console.log('Car added successfully');
          this.retrieveAllCars()
        },
        (error) => {
          alert('Error adding Car: ' + error);
        }
      )
      this.services.addCarPopup();
    } else {

      this.newCar.id = this.modifyid;
      this.services.modifyCar(this.newCar).subscribe(
        (response) => {
          console.log('Car modified successfully');
          this.retrieveAllCars()
        },
        (error) => {
          alert('Error modifying Car: ' + error);
        }
      )
      this.services.addCarPopup();
    }

  }



  retrieveAllCars() {
    this.services.retrieveAllCars().subscribe(
      (response) => {
        this.cars = response
        this.unfiltered = this.cars
      },
      (error) => {
        alert('Error retrieving Cars: ' + error);
      }
    )

  }

  popupFreightId: number | undefined;
  popupPosition = { top: 0, left: 0 };
  togglePopup(event: MouseEvent, freightId: number | undefined) {
    event.stopPropagation();
    if (freightId !== 0) {
      this.popupFreightId = freightId;
      this.popupPosition = {
        top: event.clientY,
        left: event.clientX - 40
      };
    } else {
      this.popupFreightId = 0;
    }
  }

  cancelPopup() {
    this.popupFreightId = 0;
  }

  modify: boolean = false;
  modifyid: number = 0;

  modifyF(oldCar: Car) {

    if (oldCar.state != 0) {
      this.modify = true;
      this.modifyid = oldCar.id as unknown as number;


      this.car.weight = oldCar.weight as unknown as string
      this.car.weightLimit = oldCar.weightLimit as unknown as string
      this.car.widthLimit = oldCar.widthLimit as unknown as string
      this.car.lengthLimit = oldCar.lengthLimit as unknown as string
      this.car.heightLimit = oldCar.heightLimit as unknown as string
      this.car.station = oldCar.station as Station;
      this.car.title = oldCar.title as unknown as string;
      this.selectedImageUrl = oldCar.photo as unknown as string;

      this.cancelPopup();
      this.services.addCarPopup();

    } else {
      alert("Impossible d'appliquer les modifications car il est en cours d'utilisation.")
    }
  }

  deleteF(oldCar: Car) {
    if (oldCar.state != 0) {
      this.services.deleteCar(oldCar.id as number).subscribe(
        (response) => {
          this.retrieveAllCars()
          console.log('Car deleted successfully');
        },
        (error) => {
          alert('Error deleting Car' + error)
        }
      )



    } else {
      alert("Impossible d'appliquer les modifications car il est en cours d'utilisation.")

    }
  }

  retrieveAllTrains() {
    this.services.retrieveAllTrains().subscribe(
      (response) => {
        this.trainsToAttach = []
        this.trains = response
      },
      (error) => {
        alert('Error retrieving Trains: ' + error);
      }
    )
  }

  toAttach: Car = {}
  attachF(oldCar: Car) {
    if (oldCar.state == 2) {
      this.toAttach = oldCar;
      this.retrieveAllTrains();
      this.attachVar = !this.attachVar;
    } else {
      
    }
  }

  attach() {
    this.services.attachCar(this.toAttach.id as number, this.trainsToAttach[0].id as number).subscribe(
      (response) => {
        console.log('Car attached successfully');
        window.location.reload();
      },
      (error) => {
        alert('Error attaching Cars: ' + error);
      }
    )

  }

  toggleUserSelection(user: any) {
    this.trainsToAttach = [];
    const index = this.trainsToAttach.indexOf(user);
    if (index === -1) {
      // User not in list, add them
      this.trainsToAttach.push(user);
    } else {
      // User is in the list, remove them
      this.trainsToAttach.splice(index, 1);
    }
  }

  isUserSelected(user: any) {
    return this.trainsToAttach.includes(user);
  }



}
