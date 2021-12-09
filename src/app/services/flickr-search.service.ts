
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class FlickrSearchService {
  prevKeyword = '';
  currPage = 1;
  
  constructor(private http: HttpClient) { }

  //Appel de l'API Flickr pour une recherche globale
  //Les images sont au format JSON
  getImagesFlickr(form: FormGroup, currentPage : Number) : Observable<photosInterface>{
    
    const keyword = form.value.keyword;
    // if (this.prevKeyword === keyword) {
    //   this.currPage++;
    // } else {
    //   this.currPage = 1;
    // }
    this.prevKeyword = keyword;
    const url ='https://www.flickr.com/services/rest/?method=flickr.photos.search&';
    let params = `api_key=${environment.flickr.key}&text=${keyword}&format=json&nojsoncallback=1&per_page=${form.value.nbPhotos}&page=${currentPage}`;

    params = this.getFilters(params,form);

    

    return this.http.get<photosInterface>(url+params);

  }

  getImageInfo(id: string): Observable<imageInterface>{
    const url ='https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&';
    let params = `&api_key=${environment.flickr.key}&photo_id=${id}&format=json&nojsoncallback=1`;
    console.log(url+params);
    return this.http.get<imageInterface>(url+params);
  }

  //Appel de l'API Flickr pour rechercher les informations 
  //Les images sont au format JSON

  getFilters(params:string, form:FormGroup){
    let minUpload = form.value.min_upload_date
    let maxUpload = form.value.max_upload_date
    if (minUpload) {
      minUpload = minUpload.toISOString().slice(0, 19).replace('T', ' ')
      params += `&min_upload_date=${minUpload}`
    }
    if (maxUpload) {
      maxUpload = maxUpload.toISOString().slice(0, 19).replace('T', ' ')
      params += `&max_upload_date=${maxUpload}`
    }
    
    return params;
  }

}

export interface FlickrPhoto {
  farm: string;
  id: string;
  secret: string;
  server: string;
  title: string;
}


export interface photosInterface {
  photos: {
    photo: FlickrPhoto[];
  };
}

export interface imageInterface {
  photo: {
    farm: string;
    id: string;
    secret: string;
    server: string;
    originalformat: string;
    isfavorite: string;
    dateuploaded: string;
    owner: Owner;
    title: Title;
    description: Description;
    visibility: Visibility;
    dates: Dates;
    views: string;
    comments: Comments;
    tags: Tags;
  };
}

interface Owner {
  nsid: string;
  username: string;
  realname: string;
  location: string;
}

interface Title {
  _content: string;
}

interface Description {
  _content: string;
}

interface Visibility {
  ispublic: string;
  isfriend: string;
  isfamily: string;
}

interface Dates {
  posted: string;
  taken: string;
  takengranularity: string;
  takenunknown: string;
  lastupdate: string;
}

interface Comments {
  _content: string;
}
interface Tags {
  tag: Tag[];
}

interface Tag {
  id: string;
  author: string;
  authorname: string;
  raw: string;
  _content: string;
}



