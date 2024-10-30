import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAdoptionApplicationComponent } from './my-adoption-application.component';

describe('MyAdoptionApplicationComponent', () => {
  let component: MyAdoptionApplicationComponent;
  let fixture: ComponentFixture<MyAdoptionApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyAdoptionApplicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAdoptionApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
