import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DuhaUrlService {
  UserId: BehaviorSubject<string> = new BehaviorSubject<string>("");
  UserIdObserve = this.UserId.asObservable();

  staticData = "https://localhost:7269/api"
  constructor(private http: HttpClient) { }


  login(data: any): Observable<any> {
    return this.http.post<any>(`https://localhost:7269/api/Users/login`, data);
  }
  getAnimalDetailsByAnimalId(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/AnimalsDetails/${id}`);
  }

  postAdoptionApplication(data: any): Observable<any> {
    
    return this.http.post<any>(`https://localhost:7269/api/AdoptionForm/SubmitAdoptionApplication`, data)
  }

  getAllApplication(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/AdoptionForm/GetAllApplications`)
  }
  getApplicationsByUserId(userId: any): Observable<any> {
    return this.http.get(`${this.staticData}/AdoptionForm/GetApplicationsByUserId/${userId}`);
  }

  getUserById(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Users/GetUserById${id}`);
  }

  getAnimalById(animalId: any): Observable<any> {
    return this.http.get(`${this.staticData}/AdoptionForm/GetAnimalById/${animalId}`);
  }


  updateAdoptionApplicationStatus(applicationId: any, status: any): Observable<any> {
    return this.http.put(`${this.staticData}/AdoptionForm/UpdateApplicationStatus?applicationId=${applicationId}&status=${status}`, {});

  }


  getTotalShelters(): Observable<number> {
    return this.http.get<number>(`${this.staticData}/Statistics/TotalShelters`);
  }

  getTotalAnimals(): Observable<number> {
    return this.http.get<number>(`${this.staticData}/Statistics/TotalAnimal`);
  }

  getTotalUsers(): Observable<number> {
    return this.http.get<number>(`${this.staticData}/Statistics/TotalUser`);
  }

  getAnimalsCountByShelter(): Observable<any[]> {
    return this.http.get<any[]>(`${this.staticData}/Statistics/AnimalsCountByShelter`);
  }

  getAllAnimal(): Observable<any> {
    return this.http.get(`https://localhost:7269/api/Animals1`);
  }



}
