import { Component } from '@angular/core';
import { UrlService } from '../../RamaURL/url.service';

@Component({
  selector: 'app-get-all-category',
  templateUrl: './get-all-category.component.html',
  styleUrl: './get-all-category.component.css'
})
export class GetAllCategoryComponent {
  ngOnInit() {
    this.getAllCategoryAnimals();
  }
  constructor(private _ser: UrlService) { }

  categories: any
  getAllCategoryAnimals() {
    this._ser.getAllCategoryAnimals().subscribe((data) => {
      this.categories = data;
      console.log(this.categories)
    })
  }

  deleteCategory(id: number) {
    if (confirm('Are you sure you want to delete this category? This will also delete all related animals.')) {
      this._ser.deleteCategory(id).subscribe({
        next: () => {
          alert('Category deleted successfully');
          this.getAllCategoryAnimals(); // Refresh the list after deletion
        },
        error: (err) => {
          console.error(err);
          alert('Failed to delete category');
        }
      });
    }
  }
}
