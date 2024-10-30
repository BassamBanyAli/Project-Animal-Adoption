import { Component } from '@angular/core';
import { UrlService } from '../../RamaURL/url.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent {

  param: any; // ID from URL
  imageFile: any; // For image upload
  categoryData: any = {}; // Object to hold form data

  constructor(
    private _ser: UrlService,
    private _active: ActivatedRoute,
    private _router: Router
  ) {
    this.param = this._active.snapshot.paramMap.get('id'); // Get ID from the route
  }

  ngOnInit() {
    if (this.param) {
      this.loadCategoryData(); // Load the category data if ID is present
    } else {
      alert('Category ID not found.');
    }
  }

  //// Load the current category data for the form
  loadCategoryData() {
    this._ser.getCategoryById(this.param!).subscribe(
      (data) => {
        this.categoryData = data; // Populate form with the existing data
      },
      (error) => {
        alert('Error loading category data: ' + error.message);
      }
    );
  }

  // When the user selects a new image
  changeImageEvent(event: any) {
    this.imageFile = event.target.files[0];
  }
  updateCategory(formData: any) {
    const updatedData = new FormData();

    // Ensure the updated data contains the original values if unchanged
    updatedData.append('Name', formData.Name || this.categoryData.name);
    updatedData.append('Description', formData.Description || this.categoryData.description);

    // Check if an image was uploaded
    if (this.imageFile) {
      updatedData.append('Image', this.imageFile);
    } else {
      updatedData.append('Image', this.categoryData.image);  // Keep the old image if no new one is uploaded
    }

    this._ser.UpdateCategory(this.param, updatedData).subscribe(
      (response) => {
        alert('Category updated successfully!');

        // Redirect to "All Categories" page
        // Redirect to "All Categories" page
        this._router.navigate(['/dashboard/getAllCategory']).then(() => {
          formData.reset();  // Only reset form after navigation succeeds
        });
      },
      (error) => {
        alert('Error updating category: ' + error.message);
      }
    );
  }
  // Update the category
  //  updateCategory(data: any) {
  //    debugger
  //    const formData = new FormData(); // Create a FormData object

  //    // Append form fields
  //    for (let key in data) {
  //      if (data.hasOwnProperty(key)) {
  //        formData.append(key, data[key]);
  //      }
  //    }
  //    debugger
  //    // Append image file if selected
  //    if (this.imageFile) {
  //      formData.append('Image', this.imageFile); // 'Image' matches the DTO field
  //    }



  //    // Call the service to update the category
  //    this._ser.UpdateCategory(this.param!, formData).subscribe(
  //      (response) => {
  //        alert('Category updated successfully!');
  //      },
  //      (error) => {
  //        alert('Error updating category: ' + error.message);
  //      }
  //    );
  //  }
}
