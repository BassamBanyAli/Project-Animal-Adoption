import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSucessStoryComponent } from './create-sucess-story.component';

describe('CreateSucessStoryComponent', () => {
  let component: CreateSucessStoryComponent;
  let fixture: ComponentFixture<CreateSucessStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSucessStoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSucessStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
