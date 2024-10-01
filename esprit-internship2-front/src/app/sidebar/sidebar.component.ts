import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
declare var bootstrap: any;
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
  userName = ''
  
  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.getUserNameFromSession()
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

  toPDF() {
    // Select the HTML element to convert to PDF
    const element = document.getElementById('pdf-content');

    // Use html2canvas to capture the element as a canvas
    html2canvas(element!).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' for portrait, 'mm' for millimeters, 'a4' for page size

      // Calculate the width and height of the PDF
      const imgWidth = 208; // Width in mm (A4 page width minus margins)
      const pageHeight = 295; // Height of A4 page in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add the first image to the PDF
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add new pages if content exceeds one page
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the generated PDF
      pdf.save('content.pdf');
    });
  }

  popupFreightId: number | undefined;
  popupPosition = { top: 0, left: 0 };
  togglePopup(event: MouseEvent, freightId: number | undefined) {
    event.stopPropagation();
    if (freightId !== 0) {
      this.popupFreightId = freightId;
      this.popupPosition = {
        top: event.clientY - 90,
        left: event.clientX + 10
      };
    } else {
      this.popupFreightId = 0;
    }
  }

  getUserNameFromSession() {
    // Retrieve the 'session' from localStorage
    const sessionString = localStorage.getItem('session');
    
    // Check if the session exists
    if (sessionString) {
      try {
        // Parse the session string into a JSON object
        const sessionObject = JSON.parse(sessionString);
  
        // Extract the user.name from the session object
        this.userName = sessionObject.name;
  
      } catch (error) {
        console.error('Error parsing session JSON:', error);
      }
    } else {
      console.warn('No session found in localStorage');
    }
  }

  cancelPopup() {
    this.popupFreightId = 0;
  }

  logout() {
    localStorage.removeItem('session'); // Remove session data
    this.router.navigate(['/home']); // Redirect to the login page
  }
}
