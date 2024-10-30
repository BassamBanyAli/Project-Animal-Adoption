import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnimalCategoryComponent } from './add-animal-category.component';

describe('AddAnimalCategoryComponent', () => {
  let component: AddAnimalCategoryComponent;
  let fixture: ComponentFixture<AddAnimalCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAnimalCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAnimalCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
