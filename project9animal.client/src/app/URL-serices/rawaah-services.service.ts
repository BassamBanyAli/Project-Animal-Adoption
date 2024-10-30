import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RawaahServicesService {
  private baseUrl = 'https://localhost:7269/api';

  constructor(private http: HttpClient) { }

  getAllAnimals(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Animals1/GetAnimals`);
  }


  getAnimalById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/Animals1/Animals1/${id}`);
  }


  getFilteredAnimals(
    name: string = '',
    categoryName: string = '',
    shelterName: string = ''
  ): Observable<any[]> {
    let params = new HttpParams();

    console.log('Filtering with:', { name, categoryName, shelterName });

    if (name) params = params.set('animalName', name);
    if (categoryName) params = params.set('categoryName', categoryName);
    if (shelterName) params = params.set('shelterName', shelterName);

    return this.http.get<any[]>(`${this.baseUrl}/Animals1/Filter`, { params });
  }


  
 


  getAllShelters(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Shelters`);
  }



  getAllAnimalsAdmin(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Animals1`);
  }
  UpdateAnimalsAdmin(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/Animals1/UpdateAnimal/${id}`, formData);
  }



  addAnimalsAdmin(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Animals1/AddAnimal`, data);
  }
  deleteAnimals(animalId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/Animals1/${animalId}`);
  }
 
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/AnimalCategory/GetAllCategories`);
  }
  addShelters(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Shelters`, data);
  }
  getShelters(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Shelters`);
  }
  UpdateSheltersAdmin(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/Shelters/${id}`, data);
  }
  getShelterByID(id: string) {
    return this.http.get(`${this.baseUrl}/Shelters/${id}`);
  }
  deleteShelters(animalId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/Shelters/DeleteShelter${animalId}`);
  }

}

