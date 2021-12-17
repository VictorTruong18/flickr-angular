import { Component, OnInit } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ActivatedRoute } from '@angular/router';
import { FlickrSearchService } from '../../services/flickr-search.service';
import * as mapboxgl from 'mapbox-gl';

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
  sizes: sizesInterface = {} as any as sizesInterface;
  galleriePhotos: GallerieListInterface = {} as any as GallerieListInterface;
  showProgressBar: boolean = true;
  showProgressBarTab: boolean[] = [];
  location?: Location;
  map!: mapboxgl.Map;
  mapUp: boolean = false;

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
        this.image = data;
        this.flickrSearch
          .getInformationsUser(this.image.photo.owner.nsid)
          .subscribe((data) => {
            if (data.stat == 'ok') {
              this.user = data;
              this.flickrSearch
                .getPhotosUser(this.image.photo.owner.nsid)
                .subscribe((data) => {
                  if (data.stat == 'ok') {
                    this.userPhotos = data;
                    this.flickrSearch
                      .getComments(this.imageId)
                      .subscribe((data) => {
                        if (data.stat == 'ok') {                          
                          this.comments = data;
                          this.flickrSearch
                          .getSize(this.imageId).subscribe((data) => {
                            if (data.stat == 'ok') { 
                              this.sizes = data;
                            this.flickrSearch.getGallerieList(this.image.photo.owner.nsid, this.imageId).subscribe((data) => {
                              if (data.stat == 'ok') { 
                                this.galleriePhotos = data;
                                console.log(this.galleriePhotos);
                                this.showProgressBar = false;
                              }
                            })
                              
                          
                            }
                          })
                        }
                      });
                  }
                });
            }
          });
      }
    });

    this.flickrSearch.getGeocalisation(this.imageId).subscribe({
      next: (data: any) => {
        if (data.stat === 'fail') {
          throw new Error(data.message);
        }
        this.location = data.photo.location;
        console.log(this.location)
      },
      error: (err) => console.error('getGeocalisation: ', err),
    });

  }

  loadMap(event: any) {
    if (event.index == 4 && !this.mapUp) {
      if (this.location) {
        this.mapUp = true;

        this.map = new mapboxgl.Map({
          accessToken:
            'pk.eyJ1IjoiemVkZXgiLCJhIjoiY2tnOTVxbjZvMGYzYjMxbXFicTA2NmtubSJ9.qtN9HY13zsoq2n3Swcp7_A',
          container: 'map', // container ID
          style: 'mapbox://styles/mapbox/streets-v11', // style URL
          center: [+this.location.longitude, +this.location.latitude], // starting position [lng, lat]
          zoom: 9, // starting zoom
        });
        this.map.addControl(new mapboxgl.NavigationControl( {
          showZoom : true,
          
          visualizePitch: true
        }),);
        this.map.addLayer({
        id: "3d-buildings",
        source: "composite",
        "source-layer": "building",
        filter: ["==", "extrude", "true"],
        type: "fill-extrusion",
        minzoom: 15,
        paint: {
          "fill-extrusion-color": "#aaa",

          // use an 'interpolate' expression to add a smooth transition effect to the
          // buildings as the user zooms in
          "fill-extrusion-height": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            0,
            15.05,
            ["get", "height"],
          ],
          "fill-extrusion-base": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            0,
            15.05,
            ["get", "min_height"],
          ],
          "fill-extrusion-opacity": 0.6,
        },
      });
  
        // const popup = new mapboxgl.Popup({ offset: 25 }) // add popups
        //   .setHTML(``);
        new mapboxgl.Marker({ draggable: true })
          .setLngLat([+this.location.longitude, +this.location.latitude])
          // .setPopup(popup)
          .addTo(this.map);
      }
    }

  
  }
}
