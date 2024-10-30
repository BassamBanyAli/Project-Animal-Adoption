import { Component } from '@angular/core';
import { LeenURLService } from '../../leen/leen-url.service';

@Component({
  selector: 'app-show-all-user',
  templateUrl: './show-all-user.component.html',
  styleUrl: './show-all-user.component.css'
})

  export class ShowAllUserComponent {
  users: any;

  constructor(private _ser: LeenURLService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this._ser.getUsers1().subscribe((data) => {
      this.users = data.filter((user: any) => user.email !== 'admin@gmail.com');
    });
  }


  userAdoptionApplicationArray: any;
  showUserApplicationsModal: boolean = false; // للتحكم بعرض المودال
  getApplicationsByUser(userId: any) {
    this._ser.getApplicationsByUserId(userId).subscribe((data) => {
      this.userAdoptionApplicationArray = data;
      this.showUserApplicationsModal = true; // فتح المودال لعرض الطلبات الخاصة
    });
  }

  closeModal() {
    this.showUserApplicationsModal = false; // إغلاق المودال عند الانتهاء
  }

}
