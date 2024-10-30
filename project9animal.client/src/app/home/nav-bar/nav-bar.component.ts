import { Component } from '@angular/core';
import { DuhaUrlService } from '../../Duha/duha-url.service';
import { Router } from '@angular/router';
import { LeenURLService } from '../../leen/leen-url.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  email: any;
  UserId: any;
  constructor(private _ser: LeenURLService, private _route: Router) { }

  ngOnInit() {
    this._ser.emailaddress.subscribe((email) => {
      this.email = email;
    });

    this._ser.UserIdObserve.subscribe((UserId) => {
      this.UserId = UserId;
    });
  }

  logout() {


    this._ser.logoutFunc();

    window.location.href = "/"
  }

}
