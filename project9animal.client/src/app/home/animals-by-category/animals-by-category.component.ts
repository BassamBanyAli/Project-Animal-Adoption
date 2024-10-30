import { Component } from '@angular/core';
import { UrlService } from '../../RamaURL/url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-animals-by-category',
  templateUrl: './animals-by-category.component.html',
  styleUrl: './animals-by-category.component.css'
})
export class AnimalsByCategoryComponent {
  animals: any[] = [];  // Array to store animals
  loading: boolean = true;  // Loading state
  errorMessage: string = ''; // Error message
  categoryId: number = 0; // Category ID from route parameter

  constructor(private rawaahService: UrlService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Fetch categoryId from the route
    this.route.params.subscribe(params => {
      this.categoryId = +params['categoryId'];  // Convert to a number
      if (this.categoryId) {
        this.getAnimalsByCategory(this.categoryId);
      }// Fetch animals by category
      // else {
      //  this.getAllAnimals();  // If no categoryId, fetch all animals
      //}
    });
  }

  //getAllAnimals(): void {
  //  this.loading = true;
  //  this.rawaahService.getAllAnimals().subscribe({
  //    next: (data) => {
  //      this.animals = data;
  //      this.loading = false;
  //    },
  //    error: (error) => {
  //      this.errorMessage = 'Error loading animals. Try again.';
  //      this.loading = false;
  //    }
  //  });
  //}

  getAnimalsByCategory(categoryId: number): void {
    this.loading = true;
    this.rawaahService.getAnimalsByCategory(categoryId).subscribe({
      next: (data) => {
        this.animals = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error loading animals for this category.';
        this.loading = false;
      }
    });
  }
}
