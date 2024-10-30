import { Component, OnInit } from '@angular/core';
import { RawaahServicesService } from '../../URL-serices/rawaah-services.service';

@Component({
  selector: 'app-add-shelter',
  templateUrl: './add-shelter.component.html',
  styleUrls: ['./add-shelter.component.css'], // تصحيح هنا (styleUrls بدلاً من styleUrl)
})
export class AddShelterComponent implements OnInit {
  shelters: any[] = [];
  image: File | null = null; // ضبط نوع الصورة لتجنب الأخطاء
  isLoading: boolean = false;

  constructor(private _ser: RawaahServicesService) { }

  ngOnInit() {
    this.loadShelters();
  }

  // تحميل الملاجئ من الخدمة
  loadShelters() {
    this._ser.getShelters().subscribe(
      (shelters) => {
        this.shelters = shelters;
      },
      (error) => {
        alert('Error loading shelters: ' + error.message);
      }
    );
  }

  // حدث تغيير الصورة
  changeImageEvent(event: any) {
    this.image = event.target.files[0] || null;
  }

  addShelters(data: any) {
    const form = new FormData();

    for (let key in data) {
      if (key === 'openingTime' && data[key]) {

        const formattedTime = `${data[key]}:00`; 
        form.append('openingTime', formattedTime);
      } else if (data[key]) {
        form.append(key, data[key]);
      }
    }

    if (this.image) {
      form.append('ShelterImage', this.image);
    }

    this.isLoading = true;

    this._ser.addShelters(form).subscribe(
      () => {
        alert('Shelter added successfully');
        this.resetForm();
      },
      (error) => {
        console.error('Error adding shelter:', error);
        alert(`Error: ${error.status} - ${error.message}`);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  // إعادة تعيين النموذج
  resetForm() {
    this.image = null;
  }
}
