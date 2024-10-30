import { Component, OnInit } from '@angular/core';
import { RawaahServicesService } from '../../URL-serices/rawaah-services.service';

@Component({
  selector: 'app-add-animals',
  templateUrl: './add-animals.component.html',
  styleUrls: ['./add-animals.component.css']
})
export class AddAnimalsComponent implements OnInit {
  categories: any[] = [];
  shelters: any[] = [];    
  image: any;

  selectedCategoryId: string | undefined; 
  selectedShelterId: string | undefined;  

  isLoading: boolean = false;  
  imageFiles: File[] = []; 
  constructor(private _ser: RawaahServicesService) { }

  ngOnInit() {
    this.loadCategories();
    this.loadShelters();
  }

  loadCategories() {
    this._ser.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        alert('Error loading categories: ' + error.message);
      }
    );
  }

  loadShelters() {
    this._ser.getShelters().subscribe(
      (shelters) => {
        this.shelters = shelters;
      },
      (error) => {
        alert('Error loading shelters: ' + error.message);
      }
    );
  }

  changeImageEvent(event: any, index: number) {

    if (index >= 1 && index <= 4) {
      this.imageFiles[index - 1] = event.target.files[0];
    }
  }
  

  addAnimalsAdmin(data: any) {
  
    const form = new FormData();
    
    if (this.selectedCategoryId) {
      form.append('CategoryId', this.selectedCategoryId);
    }
    
    if (this.selectedShelterId) {
      form.append('ShelterId', this.selectedShelterId);
    }

    for (let key in data) {
      if (data[key]) { 
        form.append(key, data[key]);
      }
    }
    this.imageFiles.forEach((file, index) => {
      if (file) {
        form.append(`image${index + 1}`, file);
      }
    });
   
    this.isLoading = true; 

    this._ser.addAnimalsAdmin(form).subscribe(
      () => {
        alert('Animal added successfully');
        this.resetForm();  
      },
      (error) => {
        alert('Error adding animal: ' + error.message);
      },
      () => {
        this.isLoading = false; 
      }
    );
  }

  resetForm() {
    this.selectedCategoryId = undefined;
    this.selectedShelterId = undefined;
    this.image = null;
  }
}
