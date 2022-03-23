import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveawaysComponent } from './giveaways.component';

describe('GiveawaysComponent', () => {
  let component: GiveawaysComponent;
  let fixture: ComponentFixture<GiveawaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiveawaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiveawaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
