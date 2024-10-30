import { Component } from '@angular/core';
import { DuhaUrlService } from '../../Duha/duha-url.service';

@Component({
  selector: 'app-adoption-application-request',
  templateUrl: './adoption-application-request.component.html',
  styleUrl: './adoption-application-request.component.css'
})
export class AdoptionApplicationRequestComponent {

  ngOnInit() {
    this.getAllApplication();
  }

  constructor(private _ser: DuhaUrlService) {

  }
  dataApplicationArray: any
  getAllApplication() {

    this._ser.getAllApplication().subscribe((data) => {
      this.dataApplicationArray = data
      console.log(data)
    })
  }



  userInfo: any; 
  showUserInfoModal: boolean = false; 
  getUserInfo(userId: any) {
    this._ser.getUserById(userId).subscribe((data) => {
      this.userInfo = data;
      this.showUserInfoModal = true; 
    });
  }

  closeModal() {
    this.showUserInfoModal = false;
    this.showAnimalInfoModal = false; // إغلاق المودال عند الانتهاء
  }


  animalInfo: any; // لتخزين بيانات الحيوان
  showAnimalInfoModal: boolean = false; // للتحكم بعرض المودال

  getAnimalInfo(animalId: any) {
    this._ser.getAnimalById(animalId).subscribe((data) => {
      this.animalInfo = data;
      this.showAnimalInfoModal = true; // عرض المودال بعد جلب بيانات الحيوان
    });
  }
  updateStatus(applicationId: number, status: string) {
    console.log(`Updating status for applicationId: ${applicationId} to status: ${status}`);
    this._ser.updateAdoptionApplicationStatus(applicationId, status).subscribe(
      (response) => {
        this.getAllApplication(); // Refresh applications after update
        alert(`Application has been ${status}`);
      },
      (error) => {
        console.error('Error updating status:', error);
      }
    );
  }
}
