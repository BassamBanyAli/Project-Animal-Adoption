import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private isAdmin = new BehaviorSubject<boolean>(false); 
  isAdminLoggedIn = this.isAdmin.asObservable(); 
 
  constructor(private router: Router) { }


  setAdminStatus(isAdmin: boolean) {
    this.isAdmin.next(isAdmin); 
  }

  logout() {
    this.isAdmin.next(false); 
    this.router.navigate(['/login']); 
  }
}
