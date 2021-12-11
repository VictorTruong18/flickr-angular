import { HttpErrorResponse } from '@angular/common/http';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FlickrSearchService } from '../../services/flickr-search.service';
import { MatSliderChange } from '@angular/material/slider';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class SearchFormComponent implements OnInit {



  onInputChange(event: MatSliderChange) {
    const elm = Array.from(
      document.getElementsByClassName(
        'resizing',
      ) as HTMLCollectionOf<HTMLElement>,
    )
    for (let i = 0; i < elm.length; i++) {
      elm[i].style.height = event.value + 'rem'
    }
  }
  

  arr : any [] = [];
  //Form object qui nous permet de reccuperer les donnees du formulaire
  searchForm = this.formBuilder.group({
    keyword: '',
    size: '',
    min_upload_date: '',
    max_upload_date: '',
    nsfw: false,
    tags: '',
    tag_mode: '',
    nbPhotos: 50,
  })

  currentPage : any = 1;
  previousKeyword : any = null; 
  showProgressBar : boolean = false;
  constructor(private formBuilder: FormBuilder,private flickrService: FlickrSearchService) { }

  ngOnInit(): void {
  }
  count = 0;

  //Fonction qui est triggered des que l'utilisateur appuie sur Submit
   onSubmit(){
    if(this.searchForm.value == this.previousKeyword){
      this.previousKeyword = this.searchForm.value;
      this.showProgressBar = true;
      this.flickrService.getImagesFlickr(this.searchForm, this.currentPage).subscribe(
        
      (data) => {
        
        if(data.stat == "ok"){
          this.showProgressBar = false;
          this.arr = (data.photos.photo);
          shuffle(this.arr);
          console.log("Toutes les images " + this.arr);
        } 
      }
    );
  
    } else {
      this.previousKeyword = this.searchForm.value;
      this.currentPage = 1;
      this.showProgressBar = true;
      this.flickrService.getImagesFlickr(this.searchForm, this.currentPage).subscribe(
      (data) => {
        
        if(data.stat == "ok"){
          this.showProgressBar = false;
          this.arr = (data.photos.photo);
          shuffle(this.arr);
        } 
      }
      );
    }
  }

  pagePrescedente(){
    if(this.currentPage == 1){

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



function shuffle(array : any) {
  array.sort(() => Math.random() - 0.5);
}
