import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RawaahServicesService } from '../../URL-serices/rawaah-services.service';

@Component({
  selector: 'app-edit-shelter',
  templateUrl: './edit-shelter.component.html',
  styleUrls: ['./edit-shelter.component.css'],
})
export class EditShelterComponent implements OnInit {
  shelter: any = {}; // تخزين بيانات الملجأ المعدل
  imageFile: File | null = null; // ضبط نوع الصورة لتجنب الأخطاء
  isLoading: boolean = false; // حالة التحميل

  constructor(
    private _ser: RawaahServicesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadShelter();
  }

  loadShelter() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Shelter ID from URL:', id);
    if (id) {
      this._ser.getShelterByID(id).subscribe(
        (shelter) => {
          this.shelter = shelter; // تعيين بيانات الملجأ
          console.log('Loaded shelter:', this.shelter);
        },
        (error) => {
          alert('Error loading shelter: ' + error.message);
        }
      );
    } else {
      alert('Shelter ID not found in the URL.');
    }
  }

  UpdateSheltersAdmin(data: any) {
    const form = new FormData();
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        form.append(key, data[key]);
      }
    }

    if (this.imageFile) {
      form.append('AnimalsImage', this.imageFile);
    }

    console.log('Shelter ID before update:', this.shelter.shelterId);
    if (this.shelter.shelterId) {
      this._ser.UpdateSheltersAdmin(this.shelter.shelterId, form).subscribe(
        (response) => {
          alert('Shelter updated successfully!');
          this.router.navigate(['/shelters']);
        },
        (error) => {
          alert('Error updating shelter: ' + error.message);
        }
      );
    } else {
      alert('Shelter ID is missing.');
    }
  }

  onImageSelected(event: any) {
    this.imageFile = event.target.files[0];
  }
}
