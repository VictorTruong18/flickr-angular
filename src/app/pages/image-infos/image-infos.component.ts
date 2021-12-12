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
  comments: commentsInterface = {} as any as commentsInterface;
  showProgressBar : boolean = true;
  constructor(
    private route: ActivatedRoute,
    private flickrSearch: FlickrSearchService,
  ) {}

  ngOnInit(): void {
    this.imageId = this.route.snapshot.paramMap.get('id');
    this.showProgressBar = true;
    this.flickrSearch.getImageInfo(this.imageId).subscribe((data) => {
      //L'image implemente l'interface et contient toutes les informations
      if (data.stat == 'ok') {
        this.showProgressBar = false;
        this.image = data;
        console.log(data);
      }
    });
    this.flickrSearch.getComments(this.imageId).subscribe((data) => {
      this.comments = data;
      console.log(this.comments);
      console.log(data);
    });
  }
}
