import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionApplicationRequestComponent } from './adoption-application-request.component';

describe('AdoptionApplicationRequestComponent', () => {
  let component: AdoptionApplicationRequestComponent;
  let fixture: ComponentFixture<AdoptionApplicationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdoptionApplicationRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptionApplicationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
