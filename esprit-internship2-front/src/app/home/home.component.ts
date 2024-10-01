import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  user = {
    name: '',
    password:'',
  };

  constructor(private router: Router) {}

  login() {
    if (this.user.name == "admin") {
      if (this.user.password == "admin") {
        const objString = JSON.stringify(this.user);
        localStorage.setItem('session',objString);
        this.router.navigate(['/freight']); 
      } else {
        alert("Nom d'utilisateur/mot de passe incorrect.")
        this.router.navigate(['/home']); 
      }

    } else {
      alert("Nom d'utilisateur/mot de passe incorrect.")
      this.router.navigate(['/home']); 
    }
   
  }

}
