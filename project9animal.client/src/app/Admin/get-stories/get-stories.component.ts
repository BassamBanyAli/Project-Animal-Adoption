import { Component, OnInit } from '@angular/core';
import { UrlBassamService } from '../../Bassam/BassamUrl/url-bassam.service';

@Component({
  selector: 'app-get-stories',
  templateUrl: './get-stories.component.html',
  styleUrls: ['./get-stories.component.css'] 
})
export class GetStoriesComponent implements OnInit {
  successStories: any[] = [];

  constructor(private urlBassamService: UrlBassamService) { }

  ngOnInit(): void {
    this.loadSuccessStories();
  }

  loadSuccessStories(): void {
    this.urlBassamService.getSuccessStories().subscribe(
      data => {
        this.successStories = data;
        console.log(this.successStories);
      },
      error => {
        console.error('Error fetching success stories:', error);
      }
    );
  }

  deleteStory(storyId: number): void {
    this.urlBassamService.deleteStory(storyId).subscribe({
      next: () => {
        console.log(`Deleted story with ID: ${storyId}`);
        // Remove the story from the successStories array
        this.successStories = this.successStories.filter(story => story.storyId !== storyId);
      },
      error: (err) => {
        console.error('Error deleting story:', err);
      }
    });
  }
}
