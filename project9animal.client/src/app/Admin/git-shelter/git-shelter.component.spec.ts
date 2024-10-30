import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitShelterComponent } from './git-shelter.component';

describe('GitShelterComponent', () => {
  let component: GitShelterComponent;
  let fixture: ComponentFixture<GitShelterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GitShelterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GitShelterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
