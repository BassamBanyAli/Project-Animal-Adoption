import { Component } from '@angular/core';
import { UrlService } from '../../RamaURL/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  ngOnInit() {
    this.getAllCategoryAnimals();
    this.getAllTestmonials();
    this.getTopSuccessStories();
  }
  constructor(private _ser: UrlService, private router: Router) { }
  viewCategory(categoryId: number): void {
    // Navigate to the animals page and pass the categoryId as a route parameter
    this.router.navigate(['/animals', categoryId]);
  }
  categories: any
  getAllCategoryAnimals() {
    
    this._ser.getAllCategoryAnimals().subscribe((data) => {
      
      this.categories = data;
      console.log(this.categories)
    })
  }
  testmonials: any
  getAllTestmonials() {
    
    this._ser.getAllTestmonials().subscribe((data) => {
      
      this.testmonials = data;
      console.log(this.testmonials)

    })
  }

  stories: any
  getTopSuccessStories() {
    
    this._ser.getTopSuccessStories().subscribe((data) => {
      
      this.stories = data;
      console.log(this.stories)

    })
  }

}
