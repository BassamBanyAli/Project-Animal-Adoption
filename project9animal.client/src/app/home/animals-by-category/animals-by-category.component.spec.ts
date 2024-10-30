import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalsByCategoryComponent } from './animals-by-category.component';

describe('AnimalsByCategoryComponent', () => {
  let component: AnimalsByCategoryComponent;
  let fixture: ComponentFixture<AnimalsByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimalsByCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalsByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
