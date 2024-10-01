import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Services } from 'src/services/services';
import { Train, TrainAxe, TrainType } from 'src/models/Train';
import { Station } from 'src/models/Station';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css']
})
export class TrainComponent {

  activeZoomIndex: number | undefined = undefined; 

  modify: boolean = false;
  modifyid: number = 0;

  trains: Train[] = [];
  unfiltered: Train[] = [];

  newTrain: Train = {}

  filter = {
    speed: null,
    cars: null,
    cost: null,
    state: '',
    comparison: 'inferior',
    axe: ''
  };

  train = {
    title: '',
    creationDate: '',
    photo: '',
    weight: null,
    weightLimit: null,
    speed: null,
    energyLimit: null,
    cost: null,
    trainType: '',
    trainAxe: '',
    station: ''
  };

  stations: string[] = [];

  trainAxes: { [key: string]: string[] } = {
    'Tunis_Sousse_Sfax_Gabes_Gafsa': ['Tunis', 'Sousse', 'Sfax', 'Gabes', 'Gafsa'],
    'Tunis_LaGoulette': ['Tunis', 'LaGoulette'],
    'Tunis_Gaafour_Djerissa_Kasserine': ['Tunis', 'Gaafour', 'Djerissa', 'Kasserine'],
    'Tunis_Beja-Ghardimaou': ['Tunis', 'Beja', 'Ghardimaou'],
    'Tunis_Bizerte': ['Tunis', 'Bizerte']
  };

  onTrainAxeChange(event: any) {
    const selectedAxe: string = event.target.value;
    this.stations = this.trainAxes[selectedAxe] || [];
  }

  addTrainVisible$: Observable<boolean>;

  constructor(private services: Services) {
    this.addTrainVisible$ = this.services.addTrainVisible$;
  }

  ngOnInit(): void {
    this.retrieveAllTrains();
  }

  applyFilter() {
    this.trains = this.unfiltered
    this.trains = this.trains.filter(resource => {
      let matches = true;

      // Length filter
      if (this.filter.speed !== null && this.filter.speed !== '') {
        matches = matches && (this.filter.comparison === 'inferior' ? resource.speed as number <= this.filter.speed : resource.speed as number >= this.filter.speed);
      }
      // Width filter
      if (this.filter.cost !== null && this.filter.cost !== '') {
        matches = matches && (this.filter.comparison === 'inferior' ? resource.cost as number <= this.filter.cost : resource.cost as number >= this.filter.cost);
      }
      // Height filter
      if (this.filter.cars !== null && this.filter.cars !== '') {
        matches = matches && (this.filter.comparison === 'inferior' ? resource.cars?.length as number <= this.filter.cars : resource.cars?.length as number >= this.filter.cars);
      }
      if (this.filter.axe !== null && this.filter.axe !== '') {
        matches = matches && resource.trainAxe === this.filter.axe;
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


  selectedImageUrl: string | ArrayBuffer | null = null;

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
  
        img.onload = () => {
          // Create a canvas element
          const canvas = document.createElement('canvas');
          const maxWidth = 800; // Specify max width (or adjust as needed)
          const maxHeight = 800; // Specify max height (or adjust as needed)
  
          let width = img.width;
          let height = img.height;
  
          // Maintain aspect ratio while resizing
          if (width > height) {
            if (width > maxWidth) {
              height = height * (maxWidth / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = width * (maxHeight / height);
              height = maxHeight;
            }
          }
  
          // Set canvas dimensions
          canvas.width = width;
          canvas.height = height;
  
          // Draw the image onto the canvas
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
  
          // Compress the image (0.7 is the quality from 0 to 1)
          this.selectedImageUrl = canvas.toDataURL('image/jpeg', 0.7); // Compress to 70% quality
  
          // Alternatively, you can use 'image/png' instead of 'image/jpeg' if needed
        };
      };
      reader.readAsDataURL(file);
    }
  }
  

  cancel() {
    this.services.addTrainPopup();
  }

  addTrain() {
    this.newTrain.title = this.train.title ;
    this.newTrain.creationDate = this.train.creationDate ;
    this.newTrain.weight = this.train.weight as unknown as number;
    this.newTrain.weightLimit = this.train.weightLimit as unknown as number;
    this.newTrain.speed = this.train.speed as unknown as number;
    this.newTrain.energyLimit = this.train.energyLimit as unknown as number;
    this.newTrain.cost = this.train.cost as unknown as number;
    this.newTrain.trainType = this.train.trainType  as TrainType;    
    this.newTrain.trainAxe = this.train.trainAxe  as TrainAxe;    
    this.newTrain.station = this.train.station  as Station;    
    this.newTrain.photo = this.selectedImageUrl as string; 

    if (this.modify == false) {

    this.services.addTrain(this.newTrain).subscribe(
      (response) => {
        console.log('Train added successfully');
        this.retrieveAllTrains()
      },
      (error) => {
          alert('Error adding Train: ' + error);
      }
    )
    this.services.addTrainPopup();
  } else {

    this.newTrain.id = this.modifyid;
    this.services.modifyTrain(this.newTrain).subscribe(
      (response) => {
        console.log('Train modified successfully');
        this.retrieveAllTrains()
      },
      (error) => {
          alert('Error modifying Train: ' + error);
      }
    )
    this.services.addTrainPopup();
  }

  }
  
  retrieveAllTrains() {
    this.services.retrieveAllTrains().subscribe(
      (response) => {
        this.trains = response
        this.unfiltered = this.trains
      },
      (error) => {
          alert('Error retrieving Trains: ' + error);
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

  modifyF(oldTrain: Train) {

    if(oldTrain.state == 0 || oldTrain.state == 5) {
    this.modify = true;
    this.modifyid = oldTrain.id as unknown as number;

    if (oldTrain.weight !== null && oldTrain.weight !== undefined) {
      this.train.weight = oldTrain.weight as unknown as string as unknown as null;
    } else {
      this.train.weight = null; // or handle it as needed
    }
    
    if (oldTrain.weightLimit !== null && oldTrain.weightLimit !== undefined) {
      this.train.weightLimit = oldTrain.weightLimit as unknown as string as unknown as null;
    } else {
      this.train.weightLimit = null;
    }
    
    if (oldTrain.speed !== null && oldTrain.speed !== undefined) {
      this.train.speed = oldTrain.speed as unknown as string as unknown as null;
    } else {
      this.train.speed = null;
    }
    
    if (oldTrain.energyLimit !== null && oldTrain.energyLimit !== undefined) {
      this.train.energyLimit = oldTrain.energyLimit as unknown as string as unknown as null;
    } else {
      this.train.energyLimit = null;
    }

    this.train.station = oldTrain.station as unknown as Station;

    this.train.trainAxe = oldTrain.trainAxe as unknown as TrainAxe;

    this.train.title = oldTrain.title as unknown as string;

    this.selectedImageUrl = oldTrain.photo as unknown as string;

    
    if (oldTrain.cost !== null && oldTrain.cost !== undefined) {
      this.train.cost = oldTrain.cost as unknown as string as unknown as null;
    } else {
      this.train.cost = null;
    }
    
    this.cancelPopup();
    this.services.addTrainPopup();

  } else {
    alert("Impossible d'appliquer les modifications car il est en cours d'utilisation.")
  }
  }

  deleteF(oldTrain: Train) {
    if(oldTrain.state == 0 || oldTrain.state == 5) {
      this.services.deleteTrain(oldTrain.id as number).subscribe(
        (response) => {
          this.retrieveAllTrains()
          console.log('Train deleted successfully');
        },
        (error) => {
          alert('Error deleting Train' + error)
        }
        
      )

 
  
  } else {
    alert("Impossible d'appliquer les modifications car il est en cours d'utilisation.")
  
  }
}

}
