import { Component } from '@angular/core';
import { LeenURLService } from '../../leen/leen-url.service';

@Component({
  selector: 'app-my-adoption-application',
  templateUrl: './my-adoption-application.component.html',
  styleUrl: './my-adoption-application.component.css'
})
export class MyAdoptionApplicationComponent {
  userAdoptionApplicationArray: any
  currentUserId: any;

  constructor(private _ser: LeenURLService) {
    this._ser.UserIdObserve.subscribe((id) => {
      this.currentUserId = id;
      if (this.currentUserId) {
        this.getApplicationsByUser(this.currentUserId); 
      }
    });
  }

  getApplicationsByUser(userId: any) {
    this._ser.getApplicationsByUserId(userId).subscribe((data) => {
      this.userAdoptionApplicationArray = data;
    });
  }
}
