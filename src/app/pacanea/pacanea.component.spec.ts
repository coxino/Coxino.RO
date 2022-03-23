import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacaneaComponent } from './pacanea.component';

describe('PacaneaComponent', () => {
  let component: PacaneaComponent;
  let fixture: ComponentFixture<PacaneaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacaneaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacaneaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
