import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAnimalsComponent } from './show-animals.component';

describe('ShowAnimalsComponent', () => {
  let component: ShowAnimalsComponent;
  let fixture: ComponentFixture<ShowAnimalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowAnimalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAnimalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
