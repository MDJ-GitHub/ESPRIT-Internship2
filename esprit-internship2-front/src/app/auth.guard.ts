import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}
  
  canActivate(): boolean {
    // Check if the session exists (adjust based on how you store session data)
    const session = localStorage.getItem('session');

    if (session) {
      return true; 
    } else {
      this.router.navigate(['/home']); // Redirect to login page if no session
      return false; // Prevent access
    }
  }
  
}
