import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatsticsComponent } from './admin-statstics.component';

describe('AdminStatsticsComponent', () => {
  let component: AdminStatsticsComponent;
  let fixture: ComponentFixture<AdminStatsticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminStatsticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminStatsticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
