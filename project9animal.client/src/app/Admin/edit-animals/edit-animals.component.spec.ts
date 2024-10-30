import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnimalsComponent } from './edit-animals.component';

describe('EditAnimalsComponent', () => {
  let component: EditAnimalsComponent;
  let fixture: ComponentFixture<EditAnimalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditAnimalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAnimalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
