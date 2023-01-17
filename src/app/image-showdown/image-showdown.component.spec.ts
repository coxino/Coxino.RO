import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageShowdownComponent } from './image-showdown.component';

describe('ImageShowdownComponent', () => {
  let component: ImageShowdownComponent;
  let fixture: ComponentFixture<ImageShowdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageShowdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageShowdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
