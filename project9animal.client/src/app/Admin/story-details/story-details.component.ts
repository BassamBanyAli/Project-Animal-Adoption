import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlBassamService } from '../../Bassam/BassamUrl/url-bassam.service';

@Component({
  selector: 'app-story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.css']
})
export class StoryDetailsComponent implements OnInit {
  storyId: number | undefined;
  story: any;

  constructor(private route: ActivatedRoute, private urlBassamService: UrlBassamService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.storyId = +params['id'];

      this.fetchStoryDetails(); 
    });
  }
  fetchStoryDetails(): void {
    if (this.storyId) {
      this.urlBassamService.getSuccessStoryById(this.storyId).subscribe(
        (data) => {
          this.story = data; 
        },
        (error) => {
          console.error('Error fetching story', error);
        }
      );
    }
  }
}
