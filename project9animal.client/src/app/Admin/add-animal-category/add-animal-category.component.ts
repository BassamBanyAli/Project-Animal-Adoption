import { Component } from '@angular/core';
import { UrlService } from '../../RamaURL/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-animal-category',
  templateUrl: './add-animal-category.component.html',
  styleUrl: './add-animal-category.component.css'
})
export class AddAnimalCategoryComponent {

  ngOnInit(){

  }
  constructor(private _ser: UrlService, private _router: Router) { }
  image: any
  changeImage(event: any) {

    this.image = event.target.files[0]

  }


  addNewNimalCategory(data: any) {

    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])
    }
    form.append("Image", this.image);
   

    this._ser.addNewNimalCategory(form).subscribe(() => {

      alert("animal category added succesfully")
      // Redirect to "All Categories" page
      this._router.navigate(['/dashboard/getAllCategory']).then(() => {
      
      });
     

    },
      (error) => {
        alert(error.error)
      })
  }

}
