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
  timef: string | null = null;
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
    // Calculate total volume of selected containers with safety checks for undefined values
    let totalContainerVolume = this.selectedContainers.reduce((total, container) => {
      const containerWidth = container.width || 0;
      const containerHeight = container.height || 0;
      const containerLength = container.length || 0;
      return total + (containerWidth * containerHeight * containerLength);
    }, 0);

    // Calculate total weight of selected containers and ensure weightLimit is defined
    let totalContainerWeightLimit = this.selectedContainers.reduce((total, container) => {
      const containerWeightLimit = container.weightLimit || 0;  // Assume weightLimit exists in each container
      return total + containerWeightLimit;
    }, 0);

    // Ensure resource properties are also defined
    const resource = this.selectedResources[0];
    const resourceWidth  = resource.width! * resource.count! || 0;
    const resourceHeight = resource.height! * resource.count! || 0;
    const resourceLength = resource.length! * resource.count!  || 0;
    const resourceWeight = resource.weight! * resource.count! || 0;
    // Calculate volume of the selected resource
    const resourceVolume = resourceWidth * resourceHeight * resourceLength;

    // Check if the total container volume is sufficient for the resource
    if (totalContainerVolume >= resourceVolume) {
      // Check if the total container weight limit is sufficient for the resource
      if (totalContainerWeightLimit >= resourceWeight) {
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

        console.log(this.containments);

        this.predict()
      } else {
        // Alert in French if the total weight limit is insufficient
        alert("Poids insuffisant pour stocker la ressource.");
      }
    } else {
      // Alert in French if the total volume is insufficient
      alert("Espace insuffisant pour stocker la ressource.");
    }
  }

  autoAddResource() {
    if (this.selectedResources.length == 0) {
        alert("Selectionner une ressource.");
        return;
    }

    const resource = this.selectedResources[0];
    const resourceWidth  = resource.width! * resource.count! || 0;
    const resourceHeight = resource.height! * resource.count! || 0;
    const resourceLength = resource.length! * resource.count!  || 0;
    const resourceWeight = resource.weight! * resource.count! || 0;

    const totalVolume = resourceHeight * resourceLength * resourceWidth;
    const totalWeight = resourceWeight;

    // Sort containers by width, height, length, and weight (smallest to largest)
    this.containers.sort((a, b) => {
        const volumeA = (a.width || 0) * (a.height || 0) * (a.length || 0);
        const volumeB = (b.width || 0) * (b.height || 0) * (b.length || 0);
        if (volumeA === volumeB) {
            return (a.weightLimit || 0) - (b.weightLimit || 0); // If volume is the same, sort by weight
        }
        return volumeA - volumeB; // Sort by volume
    });

    // Check each container's dimensions and weight for single container solution
    for (let i = 0; i < this.containers.length; i++) {
        let container = this.containers[i];
        let containerWidth = container.width || 0;
        let containerHeight = container.height || 0;
        let containerLength = container.length || 0;
        let containerVolume = containerWidth * containerHeight * containerLength;
        let containerWeight = container.weightLimit || 0;

        // Case 1: Single container can contain the resource
        if (containerVolume >= totalVolume && containerWeight >= totalWeight) {
            this.newContainment.containers = [container];
            this.newContainment.resource = resource;
            this.containments.push(this.newContainment);

            this.containers = this.containers.filter(c => c.id !== container.id);
            this.resources = this.resources.filter(r => !this.selectedResources.includes(r));
            this.predict()
            return;
        }
    }

    // Case 2: Check combinations of containers
    for (let combinationSize = 2; combinationSize <= this.containers.length; combinationSize++) {
        let combinations = this.getCombinations(this.containers, combinationSize);

        for (let combination of combinations) {
            let accumulatedVolume = 0;
            let accumulatedWeight = 0;

            for (let container of combination) {
                let containerWidth = container.width || 0;
                let containerHeight = container.height || 0;
                let containerLength = container.length || 0;
                let containerWeight = container.weightLimit || 0;

                accumulatedVolume += containerHeight * containerLength * containerWidth;
                accumulatedWeight += containerWeight;
            }

            if (accumulatedVolume >= totalVolume && accumulatedWeight >= totalWeight) {
                this.newContainment.containers = combination;
                this.newContainment.resource = resource;
                this.containments.push(this.newContainment);

                this.containers = this.containers.filter(container => !combination.includes(container));
                this.resources = this.resources.filter(r => !this.selectedResources.includes(r));
                this.predict()
                return;
            }
        }
    }

    // If no combination of containers can fit the resource
    alert('Ne peut pas contenir la ressource.');
}

// Helper function to get all combinations of size 'combinationSize'
getCombinations(containers: string | any[], combinationSize: number) {
    let result: any[][] = [];
    let recurse = function (start: number, currentCombo: any[]) {
        if (currentCombo.length === combinationSize) {
            result.push([...currentCombo]);
            return;
        }

        for (let i = start; i < containers.length; i++) {
            currentCombo.push(containers[i]);
            recurse(i + 1, currentCombo);
            currentCombo.pop();
        }
    };
    recurse(0, []);
    return result;
}



autoAddAllResources() {
  if (this.resources.length == 0) {
      alert("Aucune ressource disponible.");
      return;
  }

  // Sort containers by width, height, length, and weight (smallest to largest)
  this.containers.sort((a, b) => {
      const volumeA = (a.width || 0) * (a.height || 0) * (a.length || 0);
      const volumeB = (b.width || 0) * (b.height || 0) * (b.length || 0);
      if (volumeA === volumeB) {
          return (a.weightLimit || 0) - (b.weightLimit || 0); // Sort by weight if volumes are equal
      }
      return volumeA - volumeB; // Sort by volume
  });

  // Loop through all available resources
  for (let resource of this.resources) {
      let resourceWidth = (resource.width || 0) * (resource.count || 1);
      let resourceHeight = (resource.height || 0) * (resource.count || 1);
      let resourceLength = (resource.length || 0) * (resource.count || 1);
      let resourceWeight = (resource.weight || 0) * (resource.count || 1);

      let totalVolume = resourceHeight * resourceLength * resourceWidth;
      let totalWeight = resourceWeight;

      // Track if the resource has been contained
      let resourceContained = false;

      // Case 1: Check single container
      for (let i = 0; i < this.containers.length; i++) {
          let container = this.containers[i];
          let containerWidth = container.width || 0;
          let containerHeight = container.height || 0;
          let containerLength = container.length || 0;
          let containerVolume = containerWidth * containerHeight * containerLength;
          let containerWeight = container.weightLimit || 0;

          if (containerVolume >= totalVolume && containerWeight >= totalWeight) {
              this.newContainment.containers = [container];
              this.newContainment.resource = resource;
              this.containments.push(this.newContainment);

              // Remove the used container and resource
              this.containers = this.containers.filter(c => c.id !== container.id);
              this.resources = this.resources.filter(r => r !== resource);
              resourceContained = true;
              this.predict()
              break;
          }
      }

      // Case 2: Check combinations of multiple containers
      if (!resourceContained) {
          for (let combinationSize = 2; combinationSize <= this.containers.length; combinationSize++) {
              let combinations = this.getCombinations(this.containers, combinationSize);

              for (let combination of combinations) {
                  let accumulatedVolume = 0;
                  let accumulatedWeight = 0;

                  for (let container of combination) {
                      let containerWidth = container.width || 0;
                      let containerHeight = container.height || 0;
                      let containerLength = container.length || 0;
                      let containerWeight = container.weightLimit || 0;

                      accumulatedVolume += containerHeight * containerLength * containerWidth;
                      accumulatedWeight += containerWeight;
                  }

                  if (accumulatedVolume >= totalVolume && accumulatedWeight >= totalWeight) {
                      this.newContainment.containers = [...combination];
                      this.newContainment.resource = resource;
                      this.containments.push(this.newContainment);

                      // Remove the used containers and resource
                      this.containers = this.containers.filter(c => !combination.includes(c));
                      this.resources = this.resources.filter(r => r !== resource);

                      resourceContained = true;
                      this.predict()
                      break;
                  }
              }

              if (resourceContained) {
                  break;
              }
          }
      }

      // If no container or combination of containers is found for the current resource
      if (!resourceContained) {
          alert(`Ne peut pas contenir la ressource: ${resource.title || 'inconnue'}`);
      }
  }

  console.log(this.containments);
}



  retrieveResourcesByStation() {

    this.selectedResources = [];
    if (this.freight.stationStart && this.freight.stationArrive) {
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

    if (this.time != null) {
    var hoursToAdd = parseInt(this.time as string, 10);
  } else {
    var hoursToAdd = 2;
  }
    
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
    let result = `et prédire combien de temps cela prend-il pour charger ces conteneurs : `;

    this.containments.forEach((x: any) => {

      x.containers.forEach((container: any) => {
      result += `- Conteneur (Largeur: ${container.width}, Hauteur: ${container.height}, Longueur: ${container.length}, Poids: ${container.weight}) , `;
    });
    });
  
    // Loop through resources and extract their details
    result += " avec ces ressources : ";
    this.containments.forEach((x: any) => {
      result += `- Ressource (Largeur: ${x.resource.width}, Hauteur: ${x.resource.height}, Longueur: ${x.resource.length}, Poids: ${x.resource.weight}) , `;
    });
  
    // Add the final part about the freight train
    result += " dans le train de fret";

    this.services.askQuestion('En Tunisie, dites-moi la qualité du rail du train de marchandises entre ' + this.freight.stationStart as string + ' et ' + this.freight.stationArrive as string + ' et combien de temps il faut pour arriver et  '+ result + ' et un description de voyage avec un fait ammusant for fun, Just answer anyway and put the results in just like this: Qualité = One mot et Temp = Valeur et TempFret = Valeur par minutes et Description = valeur.').subscribe((response: any) => {
      const responseText = response?.candidates?.[0]?.content?.parts?.[0]?.text;
      console.log(responseText)

      const qualityMatch = responseText.match(/Qualité\s*=\s*(\S+)/);
      this.quality = qualityMatch ? qualityMatch[1] : null;

      const timeMatch = responseText.match(/Temp\s*=\s*(\d+)/);
      this.time = timeMatch ? timeMatch[1] : null;

      const timeMatchx = responseText.match(/TempFret\s*=\s*(\d+)/);
      this.timef = timeMatchx ? timeMatchx[1] : null;

      const descriptionMatch = responseText.match(/Description\s*=\s*(.+)/);
      this.description = descriptionMatch ? descriptionMatch[1].trim() : null;
    }, error => {
      console.log("lol");
    });

  }

}
