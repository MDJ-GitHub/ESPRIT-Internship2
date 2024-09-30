import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Input() freightPage: boolean = false; 
  @Input() personnelPage: boolean = false; 
  @Input() resourcePage: boolean = false; 
  @Input() containerPage: boolean = false; 
  @Input() trainPage: boolean = false; 
  @Input() carPage: boolean = false; 
  
  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
  }

  routeFreight() {
    this.router.navigate(['/freight']);
  }
  routePersonnel() {
    this.router.navigate(['/personnel']);
  }
  routeResource() {
    this.router.navigate(['/resource']);
  }
  routeContainer() {
    this.router.navigate(['/container']);
  }
  routeTrain() {
    this.router.navigate(['/train']);
  }
  routeCar() {
    this.router.navigate(['/car']);
  }

}
