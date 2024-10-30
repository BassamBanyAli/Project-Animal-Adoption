import { Component } from '@angular/core';
import { UrlService } from '../../RamaURL/url.service';

@Component({
  selector: 'app-get-testmonials',
  templateUrl: './get-testmonials.component.html',
  styleUrl: './get-testmonials.component.css'
})
export class GetTestmonialsComponent {
  testimonials: any[] = [];  // Holds the testimonials data

  constructor(private _ser: UrlService) { }

  ngOnInit(): void {
    this.loadTestimonials();
  }

  // Fetch testimonials from API
  loadTestimonials() {
    this._ser.getTestimonialsAdmin().subscribe(
      (data) => {
        this.testimonials = data;  // Load the testimonials
      },
      (error) => {
        alert('Error loading testimonials: ' + error.message);
      }
    );
  }

  // Accept a testimonial
  acceptTestimonial(id: number) {
    this._ser.acceptTestimonial(id).subscribe(
      (response) => {
        alert('Testimonial accepted successfully');
        this.loadTestimonials();  // Reload testimonials after updating
      },
      (error) => {
        alert('Error accepting testimonial: ' + error.message);
      }
    );
  }

  // Reject a testimonial
  rejectTestimonial(id: number) {

    this._ser.rejectTestimonial(id).subscribe(
      (response) => {
        alert('Testimonial rejected successfully');
        this.loadTestimonials();  // Reload testimonials after updating
      },
      (error) => {
        alert('Error rejecting testimonial: ' + error.message);
      }
    );
  }
}
