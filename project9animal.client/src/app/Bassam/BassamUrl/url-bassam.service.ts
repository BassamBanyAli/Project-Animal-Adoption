import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlBassamService {

  private apiUrl = 'https://localhost:7269/api/Bassam'; // Replace with your actual API base URL

  constructor(private http: HttpClient) { }

  // Method to fetch blog success stories
  getSuccessStories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }
  getImage(imageName: string): Observable<Blob> {
    const url = `${this.apiUrl}/getImage/${imageName}`;
    return this.http.get(url, { responseType: 'blob' });
  }
  createSuccessStory(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createPost`, formData);
  }
  deleteStory(storyId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteStory${storyId}`);
  }



  getRequestStories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getRequestStories`);
  }
  changeStoryStatus(id: number): Observable<any> {
    const url = `${this.apiUrl}?id=${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(url, {}, { headers });
  }
  getSuccessStoryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getSeccessStoryById/${id}`);
  }
  getAnimalsName(userId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/getTheAnimalsName/${userId}`);
  }
}
