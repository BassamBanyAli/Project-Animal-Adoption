import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { UrlBassamService } from '../BassamUrl/url-bassam.service';
import { LeenURLService } from '../../leen/leen-url.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'] // Correct typo here
})
export class BlogComponent implements OnInit {
  successStories: any[] = [];
  userId: any;

  constructor(
    private urlBassamService: UrlBassamService,
    private _leen: LeenURLService,
    private router: Router // Add Router dependency here
  ) { }

  ngOnInit(): void {
    // Subscribe to get the UserId and then fetch success stories
    this._leen.UserId.subscribe((data) => {
      console.log("User ID from service:", data);
      this.userId = data;

      this.urlBassamService.getSuccessStories().subscribe(
        (data) => {
          this.successStories = data;
          console.log(this.successStories);
        },
        (error) => {
          console.error('Error fetching success stories:', error);
        }
      );
    });
  }

  navigateBasedOnUserId(): void {
    if (this.userId) {
      this.router.navigate(['/app-create-sucess-story']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
