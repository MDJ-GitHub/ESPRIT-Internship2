import { Component, Input } from '@angular/core';
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
  
  constructor() { }

  ngAfterViewInit(): void {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
  }

}
