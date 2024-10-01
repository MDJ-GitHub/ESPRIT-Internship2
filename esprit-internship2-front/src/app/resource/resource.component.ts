import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Personnel } from 'src/models/Personnel';
import { Resource, ResourceType } from 'src/models/Resource';
import { Station } from 'src/models/Station';
import { Services } from 'src/services/services';

declare var bootstrap: any;

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent {

  activeZoomIndex: number | undefined = undefined;

  clients: Personnel[] = [];

  resources: Resource[] = [];
  unfiltered: Resource[] = [];
  users: Personnel[] = [];

  newResource: Resource = {}


  filter = {
    length: null,
    width: null,
    height: null,
    weight: null,
    cost: null,
    state: '',
    comparison: 'inferior'
  };


  resource = {
    title: '',
    addedDate: '',
    photo: '',
    weight: null,
    length: null,
    width: null,
    height: null,
    resourceType: '',
    cost: null,
    count: null,
    client: '',
    stationStart: '',
    stationArrive: '',
    trainAxe: '',
  };

  trainAxes: { [key: string]: string[] } = {
    'Tunis_Sousse_Sfax_Gabes_Gafsa': ['Tunis', 'Sousse', 'Sfax', 'Gabes', 'Gafsa'],
    'Tunis_LaGoulette': ['Tunis', 'LaGoulette'],
    'Tunis_Gaafour_Djerissa_Kasserine': ['Tunis', 'Gaafour', 'Djerissa', 'Kasserine'],
    'Tunis_Beja-Ghardimaou': ['Tunis', 'Beja', 'Ghardimaou'],
    'Tunis_Bizerte': ['Tunis', 'Bizerte']
  };
  stationsStart: string[] = [];
  stationsArrive: string[] = [];

  addResourceVisible$: Observable<boolean>;

  constructor(private services: Services) {
    this.addResourceVisible$ = this.services.addResourceVisible$;
  }

  applyFilter() {
    this.resources = this.unfiltered
    this.resources = this.resources.filter(resource => {
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


  ngOnInit(): void {
    this.retrieveAllResources();
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

  }


  onTrainAxeChange(event: any) {
    const selectedAxe: string = event.target.value;
    this.stationsStart = this.trainAxes[selectedAxe] || [];
    this.stationsArrive = this.trainAxes[selectedAxe] || [];
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
    this.services.addResourcePopup();
  }

  addResource() {
    this.newResource.title = this.resource.title;
    this.newResource.addedDate = this.resource.addedDate;
    this.newResource.weight = this.resource.weight as unknown as number;
    this.newResource.length = this.resource.length as unknown as number;
    this.newResource.width = this.resource.width as unknown as number;
    this.newResource.height = this.resource.height as unknown as number;
    this.newResource.resourceType = this.resource.resourceType as ResourceType;
    this.newResource.cost = this.resource.cost as unknown as number;
    this.newResource.count = this.resource.count as unknown as number;
    this.newResource.photo = this.selectedImageUrl as string;
    this.newResource.owner = this.clients[0] as Personnel;
    this.newResource.stationArrive = this.resource.stationArrive as Station;
    this.newResource.stationStart = this.resource.stationStart as Station;

    if (this.modify == false) {

      this.services.addResource(this.newResource).subscribe(
        (response) => {
          console.log('Resource added successfully');
          this.retrieveAllResources()
        },
        (error) => {
          alert('Error adding Resource: ' + error);
        }
      )
      this.services.addResourcePopup();

    } else {

      this.newResource.id = this.modifyid;
      this.services.modifyResource(this.newResource).subscribe(
        (response) => {
          console.log('Resource modified successfully');
          this.retrieveAllResources()
        },
        (error) => {
          alert('Error modifying Resource: ' + error);
        }
      )
      this.services.addResourcePopup();
    }


  }

  retrieveAllResources() {
    this.services.retrieveAllResources().subscribe(
      (response) => {
        this.resources = response
        this.unfiltered = response
      },
      (error) => {
        alert('Error retrieving Resources: ' + error);
      }
    )
  }

  retrieveClients() {
    this.clients = [];
    this.services.retrieveClients(this.resource.client).subscribe(
      (response) => {
        this.users = response
      },
      (error) => {
        alert('Error retrieving Clients: ' + error);
      }
    )
  }

  toggleUserSelection(user: any) {
    this.clients = [];
    const index = this.clients.indexOf(user);
    if (index === -1) {
      // User not in list, add them
      this.clients.push(user);
    } else {
      // User is in the list, remove them
      this.clients.splice(index, 1);
    }
  }

  isUserSelected(user: any) {
    return this.clients.includes(user);
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

  modifyF(oldResource: Resource) {

    if (oldResource.state == 0) {
      this.modify = true;
      this.modifyid = oldResource.id as unknown as number;


      this.resource.weight = oldResource.weight as unknown as string as unknown as null
      this.resource.width = oldResource.width as unknown as string as unknown as null
      this.resource.length = oldResource.length as unknown as string as unknown as null
      this.resource.height = oldResource.height as unknown as string as unknown as null
      this.resource.cost = oldResource.cost as unknown as string as unknown as null
      this.resource.count = oldResource.count as unknown as string as unknown as null
      this.resource.resourceType = oldResource.resourceType as ResourceType
      this.resource.stationStart = oldResource.stationStart as Station
      this.resource.stationArrive = oldResource.stationArrive as Station
      this.resource.title = oldResource.title as unknown as string;
      this.users.push(oldResource.owner as unknown as Personnel);
      this.clients.push(this.users[0]);
      this.selectedImageUrl = oldResource.photo as unknown as string;

      this.cancelPopup();
      this.services.addResourcePopup();

    } else {
      alert("Impossible d'appliquer les modifications car il est en cours d'utilisation.")
    }
  }

  deleteF(oldResource: Resource) {
    if (oldResource.state == 0) {
      this.services.deleteResource(oldResource.id as number).subscribe(
        (response) => {
          this.retrieveAllResources()
          console.log('Resource deleted successfully');
        },
        (error) => {
          alert('Error deleting Resource' + error)
        }


      )

    } else {
      alert("Impossible d'appliquer les modifications car il est en cours d'utilisation.")

    }
  }


}
