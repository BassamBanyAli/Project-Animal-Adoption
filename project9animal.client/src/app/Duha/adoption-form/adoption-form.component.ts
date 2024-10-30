import { Component } from '@angular/core';
import { DuhaUrlService } from '../duha-url.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LeenURLService } from '../../leen/leen-url.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adoption-form',
  templateUrl: './adoption-form.component.html',
  styleUrl: './adoption-form.component.css'
})
export class AdoptionFormComponent {

 
  userId: any ; 
  animalId: any
  ngOnInit() {
    this.animalId = this._activate.snapshot.paramMap.get('id')
    console.log(" this.animalId", this.animalId)
    this.getAnimalsDetailsById()

    // Subscribe to the UserId from the service to get the logged-in user's ID
    this._leen.UserId.subscribe((data) => {
      console.log("User ID from service after subscription:", data);
      this.userId = data;

      
    });
    this.getUserDetails();

  }
  constructor(private _ser: DuhaUrlService, private _activate: ActivatedRoute, private _leen: LeenURLService, private _router: Router) { }


  animalDetails: any
  getAnimalsDetailsById() {
    this._ser.getAnimalDetailsByAnimalId(this.animalId).subscribe((data) => {
      this.animalDetails = data;
      console.log('Animal details:', this.animalDetails);
    }, error => {
      console.error('Error fetching Animal details:', error);
    });

  }

  // Fetch User Details based on the userId
  userDetails = {
    "userId": 0,
    "fullName": "",
    "address": "dkdsv,mnds,v",
    "medicalStatus": "lndv,nkds",
    "flatType": "flat",
    "finaincalStatus": "high_income",
    "haveKids": false,
    "moreDetails": " a,lnwflkw",
  }
 
  getUserDetails() {
    if (this.userId) {
      this._ser.getUserById(this.userId).subscribe(
        (data) => {
          this.userDetails = data;
          console.log("User details:", this.userDetails);
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    } else {
      console.error("User ID is not available, unable to fetch user details");
    }
  }
  myform = {
    "userId": 0,
    "animalId": 0,
    "address": "string",
    "medicalStatus": "string",
    "flatType": "string",
    "financialStatus": "string",
    "haveKids": true,
    "moreDetails": "string"
  }

  addNewAdoptionform(data: any, animalId: any, userId: any) {
    this.myform.userId = userId
    this.myform.animalId = animalId
    this.myform.address = data.address
    this.myform.medicalStatus = data.medicalStatus
    this.myform.flatType = data.flatType
    this.myform.financialStatus = data.finaincalStatus
    this.myform.moreDetails = data.moreDetails
    if (data.haveKids == "true") {
      this.myform.haveKids = true

    } else {
      this.myform.haveKids = false

    }
  
    this._ser.postAdoptionApplication(this.myform).subscribe(
      (datas) => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Adoption form submitted successfully!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this._router.navigate(["/ShowAnimals"]);
          }
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error submitting adoption form. Please try again later.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        });
        console.error('Error submitting adoption form:', error);
      }
    );

  }

}
