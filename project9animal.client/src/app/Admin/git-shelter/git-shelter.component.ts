import { Component, OnInit } from '@angular/core';
import { RawaahServicesService } from '../../URL-serices/rawaah-services.service'; 

@Component({
  selector: 'app-git-shelter',
  templateUrl: './git-shelter.component.html',
  styleUrls: ['./git-shelter.component.css']
})
export class GitShelterComponent implements OnInit {
  shelters: any[] = [];
  selectedShelter: any = null;

  constructor(private shelterService: RawaahServicesService) { }

  ngOnInit() {
    this.getShelters(); 
  }

  getShelters() {
    this.shelterService.getShelters().subscribe(
      (data) => {
        this.shelters = data; 
      },
      (error) => {
        console.error('Error fetching shelters:', error); 
      }
    );
  }

  editShelter(id: number) {
    this.selectedShelter = this.shelters.find(s => s.shelterId === id); 
  }

  deleteShelters(id: number) {
    if (confirm("Are you sure you want to delete this shelter?")) {
      this.shelterService.deleteShelters(id).subscribe(
        (response) => {
          alert(response.message); 
          this.getShelters();
        },
        (error) => {
          alert(error.error.message);
          console.error('Error deleting shelter:', error);
        }
      );
    }
  }

  closeModal() {
    this.selectedShelter = null; 
  }
}
