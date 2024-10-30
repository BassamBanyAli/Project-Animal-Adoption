import { Component, OnInit } from '@angular/core';
import { LeenURLService } from '../../leen/leen-url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  users: any[] = [];

  //constructor(private userService: LeenURLService) { }

  //ngOnInit(): void {
  //  this.userService.getUsers1().subscribe((data) => {
  //    this.users = data;
  //  });
  //}


  userId: any;
  userDetails: any;

  constructor(private _ser: LeenURLService, private router: Router) { }

  ngOnInit() {
  
    // الاشتراك في BehaviorSubject للحصول على userId الخاص بالمستخدم
    this._ser.UserId.subscribe((data) => {
      console.log("User ID from service after subscription:", data);
      this.userId = data;

      // استدعاء الدالة لجلب تفاصيل المستخدم بعد الحصول على userId
      if (this.userId) {
        this.getUserDetails();
      } else {
        console.error("User ID is not available, unable to fetch user details");
      }
    });


  }

  goToEditProfile() {
    if (this.userId) {
      this.router.navigate(['/editprofile', this.userId]);
    } else {
      console.error('User ID not available');
    }
  }






  // جلب تفاصيل المستخدم بناءً على userId
  getUserDetails() {
   
    this._ser.getUserById(this.userId).subscribe(
      (data) => {
        this.userDetails = data;
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );


  }

  submitTestimonial(data: any) {
    var formdata = new FormData();


    for (let item in data) {
      formdata.append(item, data[item]);
    }

   
    formdata.append('TestimonialMessege', data.Content);
    formdata.append('UserId', this.userId);

    formdata.forEach((value, key) => {
      console.log(key + ', ' + value);
    });

    
    this._ser.addTestimonial(formdata).subscribe(
      () => {
        alert("Thank you for your testimonial!");
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }





}
