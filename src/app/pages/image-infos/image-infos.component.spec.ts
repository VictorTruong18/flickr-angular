import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageInfosComponent } from './image-infos.component';

describe('ImageInfosComponent', () => {
  let component: ImageInfosComponent;
  let fixture: ComponentFixture<ImageInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageInfosComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
