import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CupaRomanieiCalificariComponent } from './cupa-romaniei-calificari.component';

describe('CupaRomanieiCalificariComponent', () => {
  let component: CupaRomanieiCalificariComponent;
  let fixture: ComponentFixture<CupaRomanieiCalificariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CupaRomanieiCalificariComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CupaRomanieiCalificariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
