import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Giveaway150Component } from './giveaway150.component';

describe('Giveaway150Component', () => {
  let component: Giveaway150Component;
  let fixture: ComponentFixture<Giveaway150Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Giveaway150Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Giveaway150Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
