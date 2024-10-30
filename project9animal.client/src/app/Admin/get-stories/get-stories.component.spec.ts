import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetStoriesComponent } from './get-stories.component';

describe('GetStoriesComponent', () => {
  let component: GetStoriesComponent;
  let fixture: ComponentFixture<GetStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetStoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
