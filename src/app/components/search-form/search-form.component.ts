import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
    tags: [],
    nbPhotos: 50,
  })

  

  constructor(private formBuilder: FormBuilder,private flickrService: FlickrSearchService) { }

  ngOnInit(): void {
  }
  count = 0;

  //Fonction qui est triggered des que l'utilisateur appuie sur Submit
   onSubmit(){
      
      this.flickrService.getImagesFlickr(this.searchForm).subscribe(
      (data) => {
        this.arr = (data.photos.photo);
        shuffle(this.arr);
        console.log("Toutes les images " + this.arr);
      }
    );
  }

  

}



function shuffle(array : any) {
  array.sort(() => Math.random() - 0.5);
}
