import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageShowdownComponent2 } from './image-showdown2.component';

describe('ImageShowdownComponent', () => {
  let component: ImageShowdownComponent2;
  let fixture: ComponentFixture<ImageShowdownComponent2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageShowdownComponent2 ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageShowdownComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
