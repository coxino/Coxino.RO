import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotiiSpecialeComponent } from './promotii-speciale.component';

describe('PromotiiSpecialeComponent', () => {
  let component: PromotiiSpecialeComponent;
  let fixture: ComponentFixture<PromotiiSpecialeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotiiSpecialeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotiiSpecialeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
