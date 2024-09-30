import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Personnel, PersonnelRole } from 'src/models/Personnel';
import { Services } from 'src/services/services';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent {

  activeZoomIndex: number | undefined = undefined; 

  newPersonnel: Personnel = {}

  personnels: Personnel[] = [];

  modify: boolean = false;
  modifyid: number = 0;

  personnel = {
    firstName: '',
    lastName: '',
    password: '',
    phone: null,
    email: '',
    birthday: '',
    role: '',
    salary: null,
    image: null
  };

  filter = {
    name: '',
    tel: null,
    role: '',
  };

  unfiltered: Personnel[] = [];
  
  addPersonnelVisible$: Observable<boolean>;

  ngOnInit(): void {
    this.retrieveAllPersonnels();
  }

  constructor(private services: Services) {
    this.addPersonnelVisible$ = this.services.addPersonnelVisible$;
  }

  applyFilter() {
    this.personnels = this.unfiltered
    this.personnels = this.personnels.filter(resource => {
      let matches = true;

      if (this.filter.name && this.filter.name.trim() !== '') {
        const fullNameWords = this.filter.name.toLowerCase().split(/\s+/);
        const personnelName = (resource.firstName + ' ' + resource.lastName).toLowerCase();
        matches = fullNameWords.some(word => personnelName.includes(word));
      }        

      if (this.filter.role !== null && this.filter.role !== '') {
        matches = matches && resource.personnelRole as PersonnelRole == this.filter.role ;
      }

      return matches;
    });
  }


  addPersonnel() {
    this.newPersonnel.lastName = this.personnel.lastName ;
    this.newPersonnel.firstName = this.personnel.firstName ;
    this.newPersonnel.password = this.personnel.password ;
    this.newPersonnel.phone = this.personnel.phone as unknown as number ;
    this.newPersonnel.email = this.personnel.email ;
    this.newPersonnel.birthDate = this.personnel.birthday ;
    this.newPersonnel.personnelRole = this.personnel.role as PersonnelRole;
    this.newPersonnel.salary = this.personnel.salary as unknown as number ;
    this.newPersonnel.photo = this.selectedImageUrl as string; 

    if (this.modify == false) {
    this.services.addPersonnel(this.newPersonnel).subscribe(
      (response) => {
        console.log('Personnel added successfully');
        this.retrieveAllPersonnels()
      },
      (error) => {
          alert('Error adding Personnel: ' + error);
      }
    )
    this.services.addPersonnelPopup();
  }  else {

    this.newPersonnel.id = this.modifyid;
    this.services.modifyContainer(this.newPersonnel).subscribe(
      (response) => {
        console.log('Personnel modified successfully');
        this.retrieveAllPersonnels()
      },
      (error) => {
          alert('Error modifying Personnel: ' + error);
      }
    )
    this.services.addPersonnelPopup();
  }
  }
  
  retrieveAllPersonnels() {
    this.services.retrieveAllPersonnels().subscribe(
      (response) => {
        this.personnels = response
        this.unfiltered = this.personnels
      },
      (error) => {
          alert('Error retrieving Personnel: ' + error);
      }
    )
  }


  cancel() {
    this.services.addPersonnelPopup();
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

  modifyF(oldPersonnel: Personnel) {

    if(oldPersonnel.state == 0 ) {
    this.modify = true;
    this.modifyid = oldPersonnel.id as unknown as number;

    if (oldPersonnel.lastName !== null && oldPersonnel.lastName !== undefined) {
      this.personnel.lastName = oldPersonnel.lastName as unknown as string;
    } else {
      this.personnel.lastName = ''; // or handle it as needed
    }
    
    if (oldPersonnel.firstName !== null && oldPersonnel.firstName !== undefined) {
      this.personnel.firstName = oldPersonnel.firstName as unknown as string
    } else {
      this.personnel.firstName = '';
    }
    
    if (oldPersonnel.phone !== null && oldPersonnel.phone !== undefined) {
      this.personnel.phone = oldPersonnel.phone as unknown as string as unknown as null;
    } else {
      this.personnel.phone = null;
    }

    if (oldPersonnel.email !== null && oldPersonnel.email !== undefined) {
      this.personnel.email = oldPersonnel.email as unknown as string;
    } else {
      this.personnel.email = '';
    }

    if (oldPersonnel.birthDate !== null && oldPersonnel.birthDate !== undefined) {
      this.personnel.birthday = oldPersonnel.birthDate as unknown as string;
    } else {
      this.personnel.birthday = '';
    }
    
    if (oldPersonnel.salary !== null && oldPersonnel.salary !== undefined) {
      this.personnel.salary = oldPersonnel.salary as unknown as number as unknown as null;
    } else {
      this.personnel.salary = null;
    }
    

    this.personnel.role = oldPersonnel.personnelRole as unknown as PersonnelRole;


    this.selectedImageUrl = oldPersonnel.photo as unknown as string;


    this.services.addPersonnelPopup();
    this.cancelPopup();

  } else {
    alert("Impossible d'appliquer les modifications car il est en cours d'utilisation.")
  }
  }

  deleteF(oldPersonnel: Personnel) {
    if(oldPersonnel.state == 0 || oldPersonnel.state == 5) {
      this.services.deletePersonnel(oldPersonnel.id as number).subscribe(
        (response) => {
          this.retrieveAllPersonnels()
          console.log('Personnel deleted successfully');
        },
        (error) => {
          alert('Error deleting Personnel' + error)
        }
        
      )

 
  
  } else {
    alert("Impossible d'appliquer les modifications car il est en cours d'utilisation.")
  
  }
}

  

}
