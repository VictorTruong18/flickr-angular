import { Component, OnInit } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ActivatedRoute } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
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
  user: userInterface = {} as any as userInterface;
  userPhotos: photosInterface = {} as any as photosInterface;

  showProgressBar: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private flickrSearch: FlickrSearchService
  ) {}

  ngOnInit(): void {
    this.imageId = this.route.snapshot.paramMap.get('id');
    this.showProgressBar = true;
    this.flickrSearch.getImageInfo(this.imageId).subscribe((data) => {
      //L'image implemente l'interface et contient toutes les informations
      if (data.stat == 'ok') {
        this.showProgressBar = false;
        this.image = data;

        this.flickrSearch
          .getInformationsUser(this.image.photo.owner.nsid)
          .subscribe((data) => {
            this.user = data;
          });

        this.flickrSearch
          .getPhotosUser(this.image.photo.owner.nsid)
          .subscribe((data) => {
            this.userPhotos = data;
          });
      }
    });
    this.flickrSearch.getComments(this.imageId).subscribe((data) => {
      this.comments = data;
    });
  }
  loadMap(event: any) {
  
    if (event.index==4)
    {
      console.log("entrer");

        const map = new mapboxgl.Map({
        accessToken: 'pk.eyJ1IjoiemVkZXgiLCJhIjoiY2tnOTVxbjZvMGYzYjMxbXFicTA2NmtubSJ9.qtN9HY13zsoq2n3Swcp7_A',
        container: "map", // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 9, // starting zoom
      });
    }
  }
}
