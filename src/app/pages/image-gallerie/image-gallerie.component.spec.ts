import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageGallerieComponent } from './image-gallerie.component';

describe('ImageGallerieComponent', () => {
  let component: ImageGallerieComponent;
  let fixture: ComponentFixture<ImageGallerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageGallerieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageGallerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
