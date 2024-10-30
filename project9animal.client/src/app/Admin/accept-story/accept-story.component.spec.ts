import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptStoryComponent } from './accept-story.component';

describe('AcceptStoryComponent', () => {
  let component: AcceptStoryComponent;
  let fixture: ComponentFixture<AcceptStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcceptStoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
