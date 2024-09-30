import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Container } from 'src/models/Container';
import { Freight } from 'src/models/Freight';
import { Personnel } from 'src/models/Personnel';
import { Resource } from 'src/models/Resource';
import { Train } from 'src/models/Train';
import { Containment } from 'src/models/Containment';
import { Services } from 'src/services/services';
import { Station } from 'src/models/Station';
import { contain } from 'three/src/extras/TextureUtils';

@Component({
  selector: 'app-add-freight',
  templateUrl: './add-freight.component.html',
  styleUrls: ['./add-freight.component.css']
})
export class AddFreightComponent {


  activeZoomIndex: number | undefined = undefined;

  quality: string | null = null;
  time: string | null = null;
  description: string | null = null;

  selectedResources: Resource[] = [];
  resources: Resource[] = [];
  containingResources: Resource[] = [];

  containers: Container[] = [];
  selectedContainers: Container[] = [];

  trains: Train[] = [];
  selectedTrains: Train[] = [];

  users: Personnel[] = [];

  newContainment: Containment = {}
  containments: Containment[] = []

  newResource: Resource = {}

  newFreight: Freight = {}

  freight = {
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
    stationStart: '',
    stationArrive: '',
    trainDate: '',
    trainTime: '',
    description: '',
    priority: null,
    launchDate: '',

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

  constructor(private router: Router, private services: Services) {
  }

  ngOnInit(): void {
    this.retrieveAllContainers();
  }


  onTrainAxeChange(event: any) {
    const selectedAxe: string = event.target.value;
    this.stationsStart = this.trainAxes[selectedAxe] || [];
    this.stationsArrive = this.trainAxes[selectedAxe] || [];
    this.retrieveTrainsByAxe()
  }

  selectResource(user: any) {
    this.selectedResources = []
    const index = this.selectedResources.indexOf(user);
    if (index === -1) {
      // User not in list, add them
      this.selectedResources.push(user);
    } else {
      // User is in the list, remove them
      this.selectedResources.splice(index, 1);
    }
  }

  selectContainer(user: any) {
    const index = this.selectedContainers.indexOf(user);
    if (index === -1) {
      // User not in list, add them
      this.selectedContainers.push(user);
    } else {
      // User is in the list, remove them
      this.selectedContainers.splice(index, 1);
    }
  }
  selectTrain(user: any) {
    this.selectedTrains = [];
    const index = this.selectedTrains.indexOf(user);
    if (index === -1) {
      // User not in list, add them
      this.selectedTrains.push(user);
    } else {
      // User is in the list, remove them
      this.selectedTrains.splice(index, 1);
    }
  }


  isResourceSelected(user: any) {
    return this.selectedResources.includes(user);
  }

  iscResourceSelected(user: any) {
    return this.containingResources.includes(user);
  }

  isContainerSelected(user: any) {
    return this.selectedContainers.includes(user);
  }

  isTrainSelected(user: any) {
    return this.selectedTrains.includes(user);
  }

  addContainment() {
    this.newContainment.containers = this.selectedContainers;
    this.newContainment.resource = this.selectedResources[0];

    this.containments.push(this.newContainment);

    this.containers = this.containers.filter(container =>
      !this.selectedContainers.includes(container)
    );

    this.resources = this.resources.filter(resource =>
      !this.selectedResources.includes(resource)
    );

    this.selectedContainers = [];
    this.selectedResources = [];

    console.log(this.containments)
  }


  retrieveResourcesByStation() {

    this.selectedResources = [];
    if (this.freight.stationStart && this.freight.stationArrive) {
      this.predict()
      this.services.retrieveResourcesByStation(this.freight.stationStart, this.freight.stationArrive).subscribe(
        (response) => {
          this.resources = response.filter(res => res.state === 0);
        },
        (error) => {
          alert('Error retrieving Resources: ' + error);
        }

      )
    }
  }

  retrieveAllContainers() {
    this.services.retrieveAllContainers().subscribe(
      (response) => {
        this.containers = response.filter(container => container.state === 0);
      },
      (error) => {
        alert('Error retrieving Containers: ' + error);
      }
    )
  }

  retrieveTrainsByAxe() {
    this.predict()
    this.services.retrieveTrainsByAxe(this.freight.trainAxe).subscribe(
      (response) => {
        this.trains = response.filter(tra => tra.state === 0);
      },
      (error) => {
        alert('Error retrieving Trains: ' + error);
      }
    )
  }

  addFreight() {
    var dateTime = `${this.freight.trainDate}T${this.freight.trainTime}:00`;
    this.newFreight.launchDate = dateTime;

    var dateTimeStr = `${this.freight.trainDate}T${this.freight.trainTime}:00`;
    var dateTimee = new Date(dateTimeStr);
    var hoursToAdd = parseInt(this.time as string, 10); 
    dateTimee.setHours(dateTimee.getHours() + hoursToAdd + 1);
    var updatedDateTime = dateTimee.toISOString().slice(0, 19);
    this.newFreight.arrivalDate = updatedDateTime

    this.newFreight.stationStart = this.freight.stationStart as Station;
    this.newFreight.stationArrive = this.freight.stationArrive as Station;
    this.newFreight.train = this.selectedTrains[0];
    this.newFreight.description = this.freight.description;

    this.services.addFreight(this.newFreight,).subscribe(
      (response) => {
        console.log('Freight added successfully', response);

        // Ensure that the response contains the freight ID or object
        this.containments.forEach((containment) => {
          this.services.addContainment(containment, response.id, containment.resource?.id).subscribe(
            (containmentResponse) => {

              console.log('Containment added successfully', containmentResponse);
            },
            (error) => {
              alert('Error adding Freight for containment: ' + containment + ' - ' + error);
            }
          );
        });
        this.router.navigate(['/freight']);
      },
      (error) => {
        alert('Error adding Freight: ' + error);
      }
    );
  }


  cancel() {
    this.services.addFreightPopup();

  }

  predict() {

    this.services.askQuestion('Soyez précis. En Tunisie, dites-moi la qualité du rail du train de marchandises entre ' + this.freight.stationStart as string + ' et ' + this.freight.stationArrive as string + ' et combien de temps il faut pour arriver et une description du voyage, écrivez-la comme ceci: Qualité = Valeur et Temp = Valeur et Description = Valeur.').subscribe((response: any) => {
      const responseText = response?.candidates?.[0]?.content?.parts?.[0]?.text;
      console.log(responseText)

      const qualityMatch = responseText.match(/Qualité\s*=\s*(\S+)/);
      this.quality = qualityMatch ? qualityMatch[1] : null; 

      const timeMatch = responseText.match(/Temp\s*=\s*(\d+)/);
      this.time = timeMatch ? timeMatch[1] : null;

      const descriptionMatch = responseText.match(/Description\s*=\s*(.+)/);
      this.description = descriptionMatch ? descriptionMatch[1].trim() : null;
    }, error => {
      console.log("lol");
    });

  }

}
