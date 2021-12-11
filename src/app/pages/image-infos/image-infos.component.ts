import { Component, OnInit } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ActivatedRoute } from '@angular/router';
import { FlickrSearchService } from '../../services/flickr-search.service';
@Component({
  selector: 'app-image-infos',
  templateUrl: './image-infos.component.html',
  styleUrls: ['./image-infos.component.css'],
})
export class ImageInfosComponent implements OnInit {
  imageId: any;
  image: imageInterface = {} as any as imageInterface;

  constructor(
    private route: ActivatedRoute,
    private flickrSearch: FlickrSearchService
  ) {}

  ngOnInit(): void {
    this.imageId = this.route.snapshot.paramMap.get('id');
    this.flickrSearch.getImageInfo(this.imageId).subscribe((data) => {
      //L'image implemente l'interface et contient toutes les informations
      this.image = data;
    });
  }
}
