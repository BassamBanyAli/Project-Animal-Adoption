import { Component } from '@angular/core';
import { LeenURLService } from '../../leen/leen-url.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'

})
export class RegisterComponent {

  ngOnInit() {

  }

  constructor(private _ser: LeenURLService, private _router: Router) { }


  addNewUser(data: any) {
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])
    }
    
    //this._ser.addUser(form).subscribe(() =>

    //  alert("add User Sucssfully")


    //)
  
    this._ser.addUser(form).subscribe(
      () => {
        alert("User added successfully"); 
        this._router.navigate(['/login']);  
      },
      (error) => {
        console.error("Error adding user", error);  
      }
    );
  }
  }


