import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactURLService {

  constructor(private http: HttpClient) { }

  staticData = 'https://localhost:7269/api/ContactUs'

  postcontact(data: any) {
    return this.http.post<any>(`${this.staticData}/userForm`, data)
  }
}
