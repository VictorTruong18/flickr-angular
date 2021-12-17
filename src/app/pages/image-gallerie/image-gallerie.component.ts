import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlickrSearchService } from '../../services/flickr-search.service';
@Component({
  selector: 'app-image-gallerie',
  templateUrl: './image-gallerie.component.html',
  styleUrls: ['./image-gallerie.component.css']
})
export class ImageGallerieComponent implements OnInit {

  arr: any[] = [];
  galleryId : any;
  constructor(private route: ActivatedRoute,private flickrSearch: FlickrSearchService) { }

  ngOnInit(): void {
    this.galleryId = this.route.snapshot.paramMap.get('id');
    this.flickrSearch.getGalleriePhotos(this.galleryId).subscribe((data) => {
      if (data.stat == 'ok') {
        this.arr = data.photos.photo;
      }
    })
  }

}
