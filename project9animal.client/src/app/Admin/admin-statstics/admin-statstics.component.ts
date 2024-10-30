import { Component } from '@angular/core';
import { DuhaUrlService } from '../../Duha/duha-url.service';
import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'app-admin-statstics',
  templateUrl: './admin-statstics.component.html',
  styleUrl: './admin-statstics.component.css'
})
export class AdminStatsticsComponent {

  totalShelters: number = 0;
  totalAnimals: number = 0;
  totalUsers: number = 0;
  animalsCountByShelter: any[] = [];
  shelterChart: any;

  constructor(private _ser: DuhaUrlService ) { }

  ngOnInit(): void {
    // تسجيل جميع العناصر اللازمة من Chart.js
    Chart.register(...registerables);
    this._ser.getTotalShelters().subscribe(data => this.totalShelters = data);
    this._ser.getTotalAnimals().subscribe(data => this.totalAnimals = data);
    this._ser.getTotalUsers().subscribe(data => this.totalUsers = data);
    this._ser.getAnimalsCountByShelter().subscribe(data => {
      this.animalsCountByShelter = data;
      console.log("Animals count by shelter data:", this.animalsCountByShelter);
      this.createChart();
    });
  }
  createChart() {
    // تأكد من أن أسماء الملاجئ والقيم يتم استخراجها بشكل صحيح
    const shelterNames = this.animalsCountByShelter.map(shelter => shelter.shelterName);
    const animalCounts = this.animalsCountByShelter.map(shelter => shelter.animalCount);

    console.log("Shelter Names:", shelterNames);
    console.log("Animal Counts:", animalCounts);

    this.shelterChart = new Chart("shelterChart", {
      type: 'bar',
      data: {
        labels: shelterNames,
        datasets: [{
          label: 'Number of Animals',
          data: animalCounts,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: Math.max(...animalCounts) > 0 ? Math.max(...animalCounts) + 2 : 10,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }




}
