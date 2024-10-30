import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurCommunityDetailsComponent } from './our-community-details.component';

describe('OurCommunityDetailsComponent', () => {
  let component: OurCommunityDetailsComponent;
  let fixture: ComponentFixture<OurCommunityDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OurCommunityDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurCommunityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
