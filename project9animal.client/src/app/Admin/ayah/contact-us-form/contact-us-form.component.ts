import { Component } from '@angular/core';
import { AyahURLadminService } from '../ayah-urladmin.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-us-form',
  templateUrl: './contact-us-form.component.html',
  styleUrl: './contact-us-form.component.css'
})
export class ContactUsFormComponent {
  param: any;
  contactObj: any;
  ngOnInit() {
    this.contactById(this.param)
  }

  constructor(private _ser: AyahURLadminService, private _active: ActivatedRoute, private _route: Router) {
    this.param = this._active.snapshot.paramMap.get('id');
  }
  contactById(id: any) {
    this._ser.getByIdContact(id).subscribe((data) => {
      this.contactObj = data
      console.log(this.contactObj)
    })
  }

  UpdateContactAdmin(data: any, id: any) {
    const form = new FormData();
    for (let key in data) {
      if (key == "replyMessage") {
        form.append(key, data[key]);
      }
    }
    this._ser.putContact(form, id).subscribe((data) => {
      Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'Your message has been sent successfully.',
        confirmButtonText: 'OK',
        timer: 3000
      });
      this._route.navigate(["/dashboard/contactUs"]);
    });
  }

}
