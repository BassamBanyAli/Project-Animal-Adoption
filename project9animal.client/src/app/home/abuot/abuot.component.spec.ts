import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbuotComponent } from './abuot.component';

describe('AbuotComponent', () => {
  let component: AbuotComponent;
  let fixture: ComponentFixture<AbuotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AbuotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbuotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
