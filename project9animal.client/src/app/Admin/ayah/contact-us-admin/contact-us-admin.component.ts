import { Component } from '@angular/core';
import { AyahURLadminService } from '../ayah-urladmin.service';

@Component({
  selector: 'app-contact-us-admin',
  templateUrl: './contact-us-admin.component.html',
  styleUrl: './contact-us-admin.component.css'
})
export class ContactUsAdminComponent {
  ngOnInit() {
    this.allcontact()
  }
  constructor(private _ser: AyahURLadminService) { }
  contactObj: any
  allcontact() {
    this._ser.getAllContact().subscribe((data) => {
      this.contactObj = data
    })
  }

}
