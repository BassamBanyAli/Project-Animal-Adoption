import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AyahURLadminService {

  constructor(private http: HttpClient) { }

  staticData = 'https://localhost:7269/api/ContactUs'

  getAllContact(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/getAllContact`)
  }

  getByIdContact(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/getFormById/${id}`)
  }

  putContact(data: any, id: any): Observable<any> {
    return this.http.put<any>(`${this.staticData}/adminForm/${id}`, data)
  }

}
