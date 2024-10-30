import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrlBassamService } from '../BassamUrl/url-bassam.service';
import { LeenURLService } from '../../leen/leen-url.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-sucess-story',
  templateUrl: './create-sucess-story.component.html',
  styleUrls: ['./create-sucess-story.component.css']
})
export class CreateSucessStoryComponent implements OnInit {
  successStoryForm: FormGroup;
  animalSuggestions: string[] = [];
  selectedFile: File | null = null;
  userId: any;

  constructor(
    private fb: FormBuilder,
    private urlBassamService: UrlBassamService,
    private _leen: LeenURLService,
    private _router: Router
  ) {
    this.successStoryForm = this.fb.group({
      userId: ['', Validators.required], // Corrected to match form control name
      AnimalName: ['', Validators.required],
      Title: ['', Validators.required],
      StoryText: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this._leen.UserId.subscribe((data) => {
      console.log("User ID from service:", data);
      this.userId = data;
      this.successStoryForm.get('userId')?.setValue(this.userId);

      // Fetch the list of adopted animals after setting userId
      if (this.userId) {
        this.urlBassamService.getAnimalsName(this.userId).subscribe(
          (animalNames) => {
            this.animalSuggestions = animalNames;
            console.log("Animal suggestions:", this.animalSuggestions);
          },
          (error) => {
            console.error('Error fetching animal names', error);
          }
        );
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.successStoryForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('UserId', this.successStoryForm.get('userId')?.value); // Corrected to match form control name
      formData.append('AnimalName', this.successStoryForm.get('AnimalName')?.value);
      formData.append('Title', this.successStoryForm.get('Title')?.value);
      formData.append('StoryText', this.successStoryForm.get('StoryText')?.value);
      formData.append('PhotoUrlOrVideo', this.selectedFile);

      this.urlBassamService.createSuccessStory(formData).subscribe(
        (response) => {
          console.log('Story created successfully', response);

          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Your story has been submitted successfully.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this._router.navigate(["app-blog"])
              this.successStoryForm.reset();
              this.selectedFile = null; // Reset selected file
            }
          });
        },
        (error) => {
          console.error('Error creating story', error);

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'There was a problem submitting your story. Please try again.',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK'
          });
        }
      );

    } else {
      alert('Please fill in all required fields and select a file.');
    }
  }
}
