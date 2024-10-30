import { Component, OnInit } from '@angular/core';
import { RawaahServicesService } from '../URL-serices/rawaah-services.service';

@Component({
  selector: 'app-show-animals',
  templateUrl: './show-animals.component.html',
  styleUrls: ['./show-animals.component.css']
})
export class ShowAnimalsComponent implements OnInit {
  animals: any[] = [];  // مصفوفة لتخزين الحيوانات
  loading: boolean = true;  // حالة تحميل البيانات
  errorMessage: string = ''; // رسالة الخطأ في حالة حدوث مشكلة
  categories: any[] = []; // لتخزين الفئات
  shelters: any[] = []; // لتخزين ملاجئ الحيوانات

  // فلترات البحث
  filters = {
    categoryName: '',
    name: '',
    shelterName: ''
  };

  constructor(private rawaahService: RawaahServicesService) { }

  ngOnInit(): void {
    this.getAllAnimals();
    this.loadCategoriesAndShelters();
  }

  getAllAnimals(): void {
    this.loading = true;
    this.rawaahService.getAllAnimals().subscribe({
      next: (data) => {
        this.animals = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'خطأ في تحميل الحيوانات. حاول مرة أخرى.';
        console.error('Error loading animals:', error);
        this.loading = false;
      }
    });
  }

  loadCategoriesAndShelters() {
    this.rawaahService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        alert('Error loading categories: ' + error.message);
      }
    );

    this.rawaahService.getShelters().subscribe(
      (shelters) => {
        this.shelters = shelters;
      },
      (error) => {
        alert('Error loading shelters: ' + error.message);
      }
    );
  }

  applyFilters(): void {
    const { categoryName, name, shelterName } = this.filters;

    this.loading = true;

  
    if (!categoryName && !name && !shelterName) {
      this.getAllAnimals();
      return;
    }

    this.rawaahService.getFilteredAnimals(name, categoryName, shelterName).subscribe({
      next: (data) => {
        this.animals = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'خطأ في تطبيق الفلاتر. حاول مرة أخرى.';
        console.error('Error fetching animals:', error);
        this.loading = false;
      }
    });
  }
}
