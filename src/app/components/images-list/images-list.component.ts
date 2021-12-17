import { Component, OnInit, Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ImagesListComponent implements OnInit {
  @Input() images: any[] = [];
  @Input() size: String = '';

  constructor() {}

  ngOnInit(): void {}
}
