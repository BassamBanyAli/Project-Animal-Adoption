import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './services/auth-service.service';
import { LeenURLService } from './leen/leen-url.service';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];
  isAdmin = false;
  constructor(private http: HttpClient, private authService: AuthServiceService, private leenService: LeenURLService) {}

  ngOnInit() {
    
    //this.authService.isAdminLoggedIn.subscribe((status) => {
    //  this.isAdmin = status;
    //});
    // Subscribe to admin status to update view on change
    this.leenService.isAdminLoggedIn.subscribe((status) => {
      this.isAdmin = status;
    });

    this.getForecasts();
  }

  getForecasts() {
    this.http.get<WeatherForecast[]>('/weatherforecast').subscribe(
      (result) => {
        this.forecasts = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  title = 'project9animal.client';


  


}
