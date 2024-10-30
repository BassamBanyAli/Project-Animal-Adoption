import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private baseUrl = 'https://localhost:7269/api';


  constructor(private http: HttpClient) { }

  getAllCategoryAnimals(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/AnimalCategory/GetAllCategories`);
  }

  addNewNimalCategory(data: any): Observable<any> {
   
    return this.http.post<any>(`${this.baseUrl}/AnimalCategory/AddCategory`, data)

  }
  getAllTestmonials(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Home/GetTestimonials`);
  }

  getTopSuccessStories(): Observable<any> {

    return this.http.get(`${this.baseUrl}/Home/top`);
  }
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/AnimalCategory/DeleteCategory${id}`);
  }
  UpdateCategory(id: number, data: any): Observable<any> {
   
    return this.http.put(`${this.baseUrl}/AnimalCategory/UpdateCategory/${id}`, data);
  }
  getCategoryById(id: number): Observable<any> {
   
    
    return this.http.get<any>(`${this.baseUrl}/AnimalCategory/GetCategoryById/${id}`);
  }
  // Fetch all testimonials for the admin
  getTestimonialsAdmin(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Home/getAllTestimonials`);
  }
  // Accept a testimonial
  acceptTestimonial(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/Home/acceptTestimonial/${id}`, null);
  }

  // Reject a testimonial
  rejectTestimonial(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Home/rejectTestimonial/${id}`);
  }
  getAnimalsByCategory(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/AnimalCategory/GetAnimalsByCategory/${categoryId}`);
  }

}
