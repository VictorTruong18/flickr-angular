import { Component, OnInit, Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ImageComponent implements OnInit {
  @Input() image: any;

  constructor() {}

  ngOnInit(): void {}
}
