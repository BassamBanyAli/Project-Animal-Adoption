import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeenURLService {
    currentUserId: any;

  email: BehaviorSubject<string> = new BehaviorSubject<string>("");
  emailaddress = this.email.asObservable();
  constructor(private http: HttpClient, private router: Router) { }

  UserId: BehaviorSubject<string> = new BehaviorSubject<string>("");
  UserIdObserve = this.UserId.asObservable();

    addUser(data : any) : Observable < any > {
      return this.http.post<any>(`https://localhost:7269/api/Users/AddUser`, data);
  }

    login(data: any): Observable<any> {
    return this.http.post<any>(`https://localhost:7269/api/Users/login`, data);
  }

  getUserById(id: any): Observable<any> {
    return this.http.get<any>(`https://localhost:7269/api/Users/GetUserById${id}` );
  }
  getUsers1(): Observable<any> {
    return this.http.get(`https://localhost:7269/api/Users/GetAllUser`);
  }
  
  editUser(data: FormData): Observable<any> {
    return this.http.put<any>(`https://localhost:7269/api/Users/UpdeteUser`, data);
  }


  private isAdmin = new BehaviorSubject<boolean>(false); // حالة الـ Admin
  isAdminLoggedIn = this.isAdmin.asObservable(); // Observable لمراقبة الحالة



  // دالة لتحديث حالة الـ Admin
  setAdminStatus(isAdmin: boolean) {
    this.isAdmin.next(isAdmin);
  }

  //logout() {
  //  this.isAdmin.next(false); // إعادة تعيين الحالة عند تسجيل الخروج
  //  this.router.navigate(['/login']);
  //}


  addTestimonial(formData: FormData): Observable<any> {
    return this.http.post<any>(`https://localhost:7269/api/Testimonials
`, formData)
  }


  getApplicationsByUserId(userId: any): Observable<any> {
    return this.http.get(`https://localhost:7269/api/AdoptionForm/GetApplicationsByUserId/${userId}`);
  }

  

  // Logout function
  logoutFunc() {
    this.setAdminStatus(false); // Reset admin status on logout
    this.email.next("");
    this.UserId.next("");
  }
}
