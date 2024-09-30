import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Services } from "src/services/services"

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Input() aideButton: boolean = false; 
  @Input() addCarButton: boolean = false; 
  @Input() addContainerButton: boolean = false; 
  @Input() addFreightButton: boolean = false; 
  @Input() addPersonnelButton: boolean = false; 
  @Input() addTrainButton: boolean = false; 
  @Input() addResourceButton: boolean = false; 


  currentDate: string = '';
  currentTime: string = '';
  private subscription: Subscription | undefined;

  ngOnInit(): void {
    // Create an interval observable that emits every second
    this.subscription = interval(1000).subscribe(() => {
      const now = new Date();
      this.currentDate = `${now.getFullYear()}/${this.padZero(now.getMonth() + 1)}/${this.padZero(now.getDate())}`;
      this.currentTime = `${this.padZero(now.getHours())}:${this.padZero(now.getMinutes())}:${this.padZero(now.getSeconds())}`;
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the interval observable when the component is destroyed
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private padZero(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }

  constructor(private services: Services) {}

  addCarPopup() {
    this.services.addCarPopup();
  }
  addContainerPopup() {
    this.services.addContainerPopup();
  }
  addPersonnelPopup() {
    this.services.addPersonnelPopup();
  }
  addTrainPopup() {
    this.services.addTrainPopup();
  }
  addResourcePopup() {
    this.services.addResourcePopup();
  }
  addFreightPopup() {
    this.services.addFreightPopup();
  }
}
