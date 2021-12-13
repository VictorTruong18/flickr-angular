import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FlickrSearchService } from '../../services/flickr-search.service';
import { MatSliderChange } from '@angular/material/slider';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchFormComponent implements OnInit {
  onInputChange(event: MatSliderChange) {
    const elm = Array.from(
      document.getElementsByClassName(
        'resizing'
      ) as HTMLCollectionOf<HTMLElement>
    );
    for (let i = 0; i < elm.length; i++) {
      elm[i].style.height = event.value + 'rem';
    }
  }

  arr: any[] = [];
  //Form object qui nous permet de reccuperer les donnees du formulaire
  searchForm = this.formBuilder.group({
    keyword: '',
    size: '',
    min_upload_date: '',
    max_upload_date: '',
    nsfw: '',
    tags: '',
    tag_mode: '',
    sort: '',
    nbPhotos: 250,
    fromGallery: false,
  });

  currentPage: any = 1;
  previousKeyword: any = null;
  showProgressBar: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private flickrService: FlickrSearchService
  ) {}

  ngOnInit(): void {}
  count = 0;

  //Fonction qui est triggered des que l'utilisateur appuie sur Submit
  onSubmit() {
    if (this.searchForm.value == this.previousKeyword) {
      this.previousKeyword = this.searchForm.value;
      this.showProgressBar = true;
      this.flickrService
        .getImagesFlickr(this.searchForm, this.currentPage)
        .subscribe((data) => {
          if (data.stat == 'ok') {
            
            this.showProgressBar = false;
            this.arr = data.photos.photo;
            shuffle(this.arr);
            console.log('Toutes l es images ' + this.arr);
          }
        });
    } else {
      this.previousKeyword = this.searchForm.value;
      this.currentPage = 1;
      this.showProgressBar = true;
      this.flickrService
        .getImagesFlickr(this.searchForm, this.currentPage)
        .subscribe((data) => {
          if (data.stat == 'ok') {
            if(this.searchForm.value.size){
              var sizeArr : any = [];
              for (let i = 0; i < data.photos.photo.length; i++) {
                this.flickrService.getSize(data.photos.photo[i].id).subscribe((res) => {
                  for (let j = 0; j < res.sizes.size.length; j++) {
                    if(sizes[this.searchForm.value.size] == res.sizes.size[j].width ||  sizes[this.searchForm.value.size] == res.sizes.size[j].height){
                      sizeArr.push(data.photos.photo[i]);
                    }
                  }
                })
              }
              this.showProgressBar = false;
              this.arr = sizeArr;
              shuffle(this.arr);
            } else {
              this.showProgressBar = false;
              this.arr = data.photos.photo;
              shuffle(this.arr);
            }
          }
        });
    }
  }

  pagePrescedente() {
    if (this.currentPage == 1) {
    } else {
      this.currentPage -= 1;
      this.onSubmit();
    }
  }

  pageSuivante() {
    this.currentPage += 1;
    this.onSubmit();
  }
}

function shuffle(array: any) {
  array.sort(() => Math.random() - 0.5);
}

var sizes : any = {
  "s": 75,
  "q": 150,
  "t": 100,
  "m": 240,
  "n": 320,
  "w": 400,
  "z": 640,
  "c": 800,
  "b": 1024
}
