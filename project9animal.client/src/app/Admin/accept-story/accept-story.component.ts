import { Component } from '@angular/core';
import { UrlBassamService } from '../../Bassam/BassamUrl/url-bassam.service';

@Component({
  selector: 'app-accept-story',
  templateUrl: './accept-story.component.html',
  styleUrl: './accept-story.component.css'
})
export class AcceptStoryComponent {

  requestStories: any[] = [];
  constructor(private urlBassamService: UrlBassamService) { }



  ngOnInit(): void {
    this.urlBassamService.getRequestStories().subscribe(
      data => {
        this.requestStories = data;
        console.log(this.requestStories);
      },
      error => {
        console.error('Error fetching success stories:', error);
      }
    );
  }
  changeStoryStatus(id: number): void {
    console.log(id);
    this.urlBassamService.changeStoryStatus(id).subscribe(
      response => {
        console.log(`Status of story with ID ${id} changed successfully:`, response);

        const story = this.requestStories.find(story => story.id === id);
        if (story) {
          story.status = 'published';
        }
      },
      error => {
        console.error('Error changing story status:', error);
      }
    );
  }
  deleteStory(storyId: number): void {
    this.urlBassamService.deleteStory(storyId).subscribe({
      next: () => {
        console.log(`Deleted story with ID: ${storyId}`);


      },
      error: (err) => {
        console.error('Error deleting story:', err);
      }
    });
  }
}
