import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTestmonialsComponent } from './get-testmonials.component';

describe('GetTestmonialsComponent', () => {
  let component: GetTestmonialsComponent;
  let fixture: ComponentFixture<GetTestmonialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetTestmonialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetTestmonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
