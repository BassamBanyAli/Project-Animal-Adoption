import { Component } from '@angular/core';
import { RawaahServicesService } from '../../URL-serices/rawaah-services.service';

@Component({
  selector: 'app-get-animals-admin',
  templateUrl: './get-animals-admin.component.html',
  styleUrl: './get-animals-admin.component.css'
})
export class GetAnimalsAdminComponent {

  ngOnInit() {
    this.getAllAnimalsAdmin()
  }

  animals: any;
  constructor(private _ser: RawaahServicesService) { }

  getAllAnimalsAdmin() {
    this._ser.getAllAnimalsAdmin().subscribe((data) => {
      this.animals = data;
    })
  }

  deleteAnimals(id: number) {
    if (confirm("Are you sure you want to delete this Animals?")) {
      this._ser.deleteAnimals(id).subscribe(
        (response) => {
          this.getAllAnimalsAdmin(); 
        },
        (error) => {
          console.error('Error deleting instructor:', error);
        }
      );
    }
  }
}
