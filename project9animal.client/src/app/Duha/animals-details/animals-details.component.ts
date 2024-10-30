import { Component } from '@angular/core';
import { DuhaUrlService } from '../duha-url.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LeenURLService } from '../../leen/leen-url.service';

@Component({
  selector: 'app-animals-details',
  templateUrl: './animals-details.component.html',
  styleUrl: './animals-details.component.css'
})
export class AnimalsDetailsComponent {
  userId: any 
  animalId: any
  
  constructor(private _ser: DuhaUrlService, private _activate: ActivatedRoute, private _router: Router, private _leen: LeenURLService) { }
  ngOnInit() {
  
    this._leen.UserId.subscribe((data) => {
      console.log("User ID from service after aaaaaaaaaaaaaaaaaaaaaa:", data);  
      this.userId = data;

      if (this.userId && this.userId !== '') {
        console.log("User ID is available after subscription:", this.userId);
      } else {
        console.log("User ID is NOT available after subscription");
      }
    });

   
    this.animalId = this._activate.snapshot.paramMap.get('id') || this._activate.snapshot.queryParamMap.get('animalId');
    console.log("this.animalId", this.animalId);

    this.getAnimalsDetailsById();

  }


 


  checkUserLogin(animalId: any) {
    console.log('Animal ID passed to checkUserLogin:', animalId);
    console.log('User ID in checkUserLogin before check:', this.userId);  // Add this to check if userId is being retrieved
    if (this.userId != '') {
      // User is logged in, navigate to the adoption form
      console.log('User is logged in, navigating to AdoptionForm');
      this._router.navigate(['/AdoptionForm', animalId], { queryParams: { userId: this.userId } });
    } else {
      // User is not logged in, redirect to login with redirectTo and animalId in query params
      console.log('Redirecting to login, animalId:', animalId);
      this._router.navigate(['/login'], { queryParams: { redirectTo: '/AnimalsDetails', animalId: animalId } });
    }
  }








  animalDetails: any
  getAnimalsDetailsById() {
    this._ser.getAnimalDetailsByAnimalId(this.animalId).subscribe((data) => {
      this.animalDetails = data;
      console.log('Animal details:', this.animalDetails);
    }, error => {
      console.error('Error fetching Animal details:', error);
    });
    
  }

}
