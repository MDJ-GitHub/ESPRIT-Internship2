import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Container, ContainerType } from 'src/models/Container';
import { Station } from 'src/models/Station';
import { Services } from 'src/services/services';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent {

  activeZoomIndex: number | undefined = undefined; 

  filter = {
    length: null,
    width: null,
    height: null,
    weight: null,
    cost: null,
    state: '',
    comparison: 'inferior'
  };

  container = {
    width: '',
    height: '',
    length: '',
    weight: '',
    weightLimit: '',
    cost: '',
    containerType: '',
    station: '',
    photo: '',
    title: ''
  };

  newContainer: Container = {}

  containers: Container[] = [];
  unfiltered: Container[] = [];

  addContainerVisible$: Observable<boolean>;

  constructor(private services: Services) {
    this.addContainerVisible$ = this.services.addContainerVisible$;
  }

  ngOnInit(): void {
    this.retrieveAllContainers();
  }

  applyFilter() {
    this.containers = this.unfiltered
    this.containers = this.containers.filter(resource => {
      let matches = true;

      // Length filter
      if (this.filter.length !== null && this.filter.length !== '') {
        matches = matches && (this.filter.comparison === 'inferior' ? resource.length as number <= this.filter.length : resource.length as number >= this.filter.length);
      }

      // Width filter
      if (this.filter.width !== null && this.filter.width !== '') {
        matches = matches && (this.filter.comparison === 'inferior' ? resource.width as number <= this.filter.width : resource.width as number >= this.filter.width);
      }

      // Height filter
      if (this.filter.height !== null && this.filter.height !== '') {
        matches = matches && (this.filter.comparison === 'inferior' ? resource.height as number <= this.filter.height : resource.height as number >= this.filter.height);
      }

      // Weight filter
      if (this.filter.weight !== null && this.filter.weight !== '') {
        matches = matches && (this.filter.comparison === 'inferior' ? resource.weight as number <= this.filter.weight : resource.weight as number >= this.filter.weight);
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

  addContainer() {

    this.newContainer.title = this.container.title;
    this.newContainer.weight = this.container.weight as unknown as number;
    this.newContainer.weightLimit = this.container.weightLimit as unknown as number;
    this.newContainer.width = this.container.width as unknown as number;
    this.newContainer.height = this.container.height as unknown as number;
    this.newContainer.length = this.container.length as unknown as number;
    this.newContainer.cost = this.container.cost as unknown as number;
    this.newContainer.containerType = this.container.containerType as ContainerType;
    this.newContainer.station = this.container.station as Station;
    this.newContainer.photo = this.selectedImageUrl as string;


    if (this.modify == false) {
    this.services.addContainer(this.newContainer).subscribe(
      (response) => {
        console.log('Container added successfully');
        this.retrieveAllContainers()
      },
      (error) => {
        alert('Error adding Train: ' + error);
      }
    )


    this.services.addContainerPopup();


  } else {

    this.newContainer.id = this.modifyid;
    this.services.modifyContainer(this.newContainer).subscribe(
      (response) => {
        console.log('Container modified successfully');
        this.retrieveAllContainers()
      },
      (error) => {
          alert('Error modifying Container: ' + error);
      }
    )
    this.services.addContainerPopup();
  }

  }

  retrieveAllContainers() {
    this.services.retrieveAllContainers().subscribe(
      (response) => {
        this.containers = response
        this.unfiltered = this.containers
      },
      (error) => {
        alert('Error retrieving Containers: ' + error);
      }
    )

  }

  cancel() {
    this.services.addContainerPopup();
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

  modifyF(oldContainer: Container) {

    if(oldContainer.state == 0 ) {
    this.modify = true;
    this.modifyid = oldContainer.id as unknown as number;

 
      this.container.weight = oldContainer.weight as unknown as string
      this.container.weightLimit = oldContainer.weightLimit as unknown as string
      this.container.width = oldContainer.width as unknown as string
      this.container.length = oldContainer.length as unknown as string
      this.container.height = oldContainer.height as unknown as string
      this.container.station = oldContainer.station  as Station;   
    this.container.title = oldContainer.title as unknown as string;
    this.selectedImageUrl = oldContainer.photo as unknown as string;
    this.container.cost = oldContainer.cost as unknown as string
    this.container.containerType = oldContainer.containerType as ContainerType
    
    this.cancelPopup();
    this.services.addContainerPopup();

  } else {
    alert("Impossible d'appliquer les modifications container il est en cours d'utilisation.")
  }
  }

  deleteF(oldContainer: Container) {
    if(oldContainer.state == 0) {
      this.services.deleteContainer(oldContainer.id as number).subscribe(
        (response) => {
          this.retrieveAllContainers()
          console.log('Container deleted successfully');
        },
        (error) => {
          alert('Error deleting Container' + error)
        }
        
      )
      
  
  } else {
    alert("Impossible d'appliquer les modifications car il est en cours d'utilisation.")
  
  }
}

attach(oldContainer: Container) {
  if(oldContainer.state == 0) {
    this.services.deleteContainer(oldContainer.id as number).subscribe(
      (response) => {
      },
      (error) => {
      }
      
    )
    console.log('Container deleted successfully');
    this.containers = [];
    this.retrieveAllContainers()

} else {
  alert("Impossible d'appliquer les modifications car il est en cours d'utilisation.")

}
}
}
