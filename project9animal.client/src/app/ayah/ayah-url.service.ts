import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AyahURLService {

  constructor(private http: HttpClient) { }

  staticData = 'https://localhost:7269/api/OurCommunityDetails'

  getSeccessStoryByID(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/getSeccessStoryByID/${id}`)
  }

  getLikes(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/likes/${id}`)
  }

  getComments(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/comments/${id}`)
  }

  getCommentCount(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/commentsCount/${id}`)
  }

  LikeIsIt(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/isItLiked`, data)
  }

  postLike(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/addLike`, data)
  }

  CommentPost(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/commentPOST`, data)
  }

  ReplyPost(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/replyPost`, data)
  }

  getanimalCategory(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/getAnimalByCategoryID/${id}`)
  }

  resentStory(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/resentStory`)
  }

}
