import { Component } from '@angular/core';
import { Freight } from 'src/models/Freight';
import { Station } from 'src/models/Station';
import { Services } from 'src/services/services';


@Component({
  selector: 'app-freight',
  templateUrl: './freight.component.html',
  styleUrls: ['./freight.component.css']
})
export class FreightComponent {

  activeZoomIndex: number | undefined = undefined;

  freights: Freight[] = [];
  
  unfiltered: Freight[] = [];

  details = false;
  detailed: Freight = {}

  filter = {
    stationStart: '',
    stationArrive: '',
    launchDate : null,
    arriveDate: null,
    actarriveDate: null,
    state: '',
    comparison: 'inferior'
  };

  constructor(private services: Services) {
  }


  ngOnInit(): void {
    this.retrieveAllFreights();

  }

  showDetails(freight: Freight){
    this.detailed = freight;
    this.details = true
  }

  applyFilter() {
    this.freights = this.unfiltered
    this.freights = this.freights.filter(resource => {
      let matches = true;

      // Length filter
      if (this.filter.stationStart !== null && this.filter.stationStart !== '') {
        matches = matches && resource.stationStart as Station == this.filter.stationStart ;
      }

      // Width filter
      if (this.filter.stationArrive !== null && this.filter.stationArrive !== '') {
        matches = matches && resource.stationArrive as Station == this.filter.stationArrive ;
      }


      if (this.filter.launchDate !== null && this.filter.launchDate !== '') {
        const resourceStartDate = new Date(resource.launchDate as string).getTime();
        const filterStartDate = new Date(this.filter.launchDate).getTime();
  
        matches = matches && (this.filter.comparison === 'inferior' ? resourceStartDate <= filterStartDate : resourceStartDate >= filterStartDate);
      }
      if (this.filter.arriveDate !== null && this.filter.arriveDate !== '') {
        const resourceStartDate = new Date(resource.arrivalDate as string).getTime();
        const filterStartDate = new Date(this.filter.arriveDate as string).getTime();
  
        matches = matches && (this.filter.comparison === 'inferior' ? resourceStartDate <= filterStartDate : resourceStartDate >= filterStartDate);
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

  retrieveAllFreights() {
    this.services.retrieveAllFreights().subscribe(
      (response) => {
        this.freights = response
        this.freights = this.freights.sort((a, b) => {
          if (a.state === 5 && b.state !== 5) {
            return 1; // Move `state == 5` items to the end
          }
          if (a.state !== 5 && b.state === 5) {
            return -1; // Move `state != 5` items before `state == 5`
          }
          return 0; // Keep the order for other items
        });
        this.unfiltered = this.freights
      },
      (error) => {
        alert('Error retrieving Freights: ' + error);
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

  modifyFreight(freightId: number | undefined) {
    // Logic for modifying the freight
    this.popupFreightId = 0;
    console.log(`Modify freight with id: ${freightId}`);
  }

  deleteFreight(freightId: number | undefined) {
    this.services.deleteFreight(freightId as number).subscribe(
    (response) => {
      this.retrieveAllFreights()
      console.log('Freight deleted successfully');
    },
    (error) => {
      alert('Error deleting Freight' + error)
    }

  )}

  launchFreight(freightId: number | undefined) {
    this.services.launchFreight(freightId as number).subscribe(
      (response) => {
        this.retrieveAllFreights();
        this.cancelPopup();
        console.log("Freight launched successfully")
      },
      (error) => {
        alert('Error launching Freight: ' + error);
      }
    )
  }

  arriveFreight(freightId: number | undefined) {
    this.services.arriveFreight(freightId as number).subscribe(
      (response) => {
        this.retrieveAllFreights();
        this.cancelPopup();
        console.log("Freight arrived successfully")
      },
      (error) => {
        alert('Error arriving Freight: ' + error);
      }
    )
  }



}
