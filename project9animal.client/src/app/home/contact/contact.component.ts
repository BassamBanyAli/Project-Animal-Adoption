import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactURLService } from './contact-url.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  @ViewChild('contactForm') contactForm!: NgForm; // Reference the form using ViewChild

  constructor(private _ser: ContactURLService) { }

  ngOnInit() { }

  contactpost(data: any) {
    const form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }

    this._ser.postcontact(form).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Your message has been sent successfully.',
          showConfirmButton: false,
          timer: 2000
        });

        // Reset the form without reloading the page
        this.contactForm.resetForm();
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Something went wrong. Please try again.',
          showConfirmButton: true
        });
      }
    });
  }
}
