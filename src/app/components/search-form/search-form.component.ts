import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FlickrSearchService } from '../../services/flickr-search.service';
import { MatSliderChange } from '@angular/material/slider';
import { ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
  encapsulation: ViewEncapsulation.None,
})

//Slider handler - Le slide qui permet de modifier la taille des images
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

  //L'array qui va contenenir toutes les photos a afficher
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
    hasGeo: false,
  });

  //La page courante
  currentPage: any = 1;
  //La recherche prescedente
  previousSearch: any = null;
  //Un Boolean pour determiner si on montre ou non la search bar
  showProgressBar: boolean = false;

  constructor(
    //Le material qui correspond au formulaire
    private formBuilder: FormBuilder,
    //Le service FlickR
    private flickrService: FlickrSearchService,
    //Le service de notifications
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  count = 0;

  //Fonction qui est triggered des que l'utilisateur appuie sur Submit
  onSubmit() {
    //Est-ce que l'utilisateur a mis une recherche
    if (this.searchForm.value.keyword) {
      //Est-ce que l'utilisateur a exceder le nombre de photos par page
      if (this.searchForm.value.nbPhotos > 500) {
        this.snackBar.open(
          'Erreur',
          'Le nombre de photos par page est limité à 500 par page ',
          { duration: 3000 }
        );
      }
      //Si la requete est la meme que la prescedente
      if (this.searchForm.value == this.previousSearch) {
        this.previousSearch = this.searchForm.value;
        this.showProgressBar = true;
        this.flickrService
          .getImagesFlickr(this.searchForm, this.currentPage)
          .subscribe((data) => {
            if (data.stat == 'ok') {
              if (data.photos.photo) {
                if(this.searchForm.value.size){
                  this.getAllThePicturesBySize(data);
                } else {
                  this.showProgressBar = false;
                  this.arr = data.photos.photo;
                  shuffle(this.arr);  
                } 
              } else {
                this.snackBar.open(
                  'Erreur',
                  `Nous n'avons trouve aucune photo avec le nom : ${this.searchForm.value.keyword} `,
                  { duration: 5000 }
                );
              }
            }
            (err: HttpErrorResponse) => {
              if(err.error instanceof Error){
                this.snackBar.open(
                  'Erreur',
                  `Client-side error occured. `,
                  { duration: 5000 }
                );
              } else {
                this.snackBar.open(
                  'Erreur',
                  'Server-side error occured.',
                  { duration: 5000 }
                );
              }
            }
          });
      } else {
        this.previousSearch = this.searchForm.value;
        this.currentPage = 1;
        this.showProgressBar = true;
        this.flickrService
          .getImagesFlickr(this.searchForm, this.currentPage)
          .subscribe((data) => {
            if (data.stat == 'ok') {
              if (data.photos.photo.length != 0) {
                //Si l'utilisateur a rentre une taille d'image
                if (this.searchForm.value.size) {
                  this.getAllThePicturesBySize(data);
                } else {
                  this.showProgressBar = false;
                  this.arr = data.photos.photo;
                  shuffle(this.arr);
                }
              } else {
                this.showProgressBar = false;
                this.snackBar.open(
                  'Erreur',
                  `Nous n'avons trouve aucune photo avec le terme : ${this.searchForm.value.keyword} `,
                  { duration: 5000 }
                );
              }
            }
            (err: HttpErrorResponse) => {
              if(err.error instanceof Error){
                this.snackBar.open(
                  'Erreur',
                  `Client-side error occured. `,
                  { duration: 5000 }
                );
              } else {
                this.snackBar.open(
                  'Erreur',
                  'Server-side error occured.',
                  { duration: 5000 }
                );
              }
            }
          });
      }
    } else {
      this.snackBar.open(
        'Erreur',
        'Veuillez indiquer un nom dans votre recherche',
        { duration: 3000 }
      );
    }
  }

  pagePrescedente() {
    if (this.currentPage == 1) {
      this.snackBar.open('Erreur', 'Pas de pages prescedentes', {
        duration: 3000,
      });
    } else {
      this.currentPage -= 1;
      this.onSubmit();
    }
  }

  pageSuivante() {
    this.currentPage += 1;
    this.onSubmit();
  }

  getAllThePicturesBySize(data: any) {
    var sizeArr: any = [];
    for (let i = 0; i < data.photos.photo.length; i++) {
      this.flickrService.getSize(data.photos.photo[i].id).subscribe((res) => {
        for (let j = 0; j < res.sizes.size.length; j++) {
          if (
            sizes[this.searchForm.value.size] == res.sizes.size[j].width ||
            sizes[this.searchForm.value.size] == res.sizes.size[j].height
          ) {
            sizeArr.push(data.photos.photo[i]);
          }
        }
      });
    }
    this.showProgressBar = false;
    this.arr = sizeArr;
    shuffle(this.arr);
  }
}

function shuffle(array: any) {
  array.sort(() => Math.random() - 0.5);
}

var sizes: any = {
  s: 75,
  q: 150,
  t: 100,
  m: 240,
  n: 320,
  w: 400,
  z: 640,
  c: 800,
  b: 1024,
};
