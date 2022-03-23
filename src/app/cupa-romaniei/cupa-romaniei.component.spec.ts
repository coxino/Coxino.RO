import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CupaRomanieiComponent } from './cupa-romaniei.component';

describe('CupaRomanieiComponent', () => {
  let component: CupaRomanieiComponent;
  let fixture: ComponentFixture<CupaRomanieiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CupaRomanieiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CupaRomanieiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
