import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RawaahServicesService } from '../../URL-serices/rawaah-services.service';

@Component({
  selector: 'app-edit-animals',
  templateUrl: './edit-animals.component.html',
  styleUrls: ['./edit-animals.component.css']
})
export class EditAnimalsComponent implements OnInit {
  param: any;
  animalData: any = {};
  categories: any[] = [];
  shelters: any[] = [];
  imageFiles: File[] = []; 

  constructor(
    private _ser: RawaahServicesService,
    private _active: ActivatedRoute
  ) {
    this.param = this._active.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    if (this.param) {
      this.loadAnimalData();
      this.loadCategoriesAndShelters();
    } else {
      alert('Animal ID not found in the route parameters.');
      console.error('Animal ID not found.');
    }
  }

  loadAnimalData() {
    this._ser.getAnimalById(this.param!).subscribe(
      (data) => {
        this.animalData = data;
        this.animalData.CategoryId = data.CategoryId;
        this.animalData.ShelterId = data.ShelterId;
      },
      (error) => {
        alert('Error loading animal data: ' + error.message);
      }
    );
  }

  changeImageEvent(event: any, index: number) {
  
    if (index >= 1 && index <= 4) {
      this.imageFiles[index - 1] = event.target.files[0]; 
    }
  }

  loadCategoriesAndShelters() {
    this._ser.getCategories().subscribe(
      (categories) => (this.categories = categories),
      (error) => alert('Error loading categories: ' + error.message)
    );

    this._ser.getShelters().subscribe(
      (shelters) => (this.shelters = shelters),
      (error) => alert('Error loading shelters: ' + error.message)
    );
  }

  UpdateAnimalsAdmin(data: any) {
    const form = new FormData();


    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        form.append(key, data[key]);
      }
    }

    this.imageFiles.forEach((file, index) => {
      if (file) {
        form.append(`image${index + 1}`, file); 
      }
    });

 
    this._ser.UpdateAnimalsAdmin(this.param, form).subscribe(
      (response) => {
        alert('Animal updated successfully');
    
      },
      (error) => {
        alert('Error updating animal: ' + error.message);
        console.error('Update error', error);
      }
    );
  }
}
