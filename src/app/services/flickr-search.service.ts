import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlickrSearchService {
  prevKeyword = '';
  currPage = 1;

  constructor(private http: HttpClient) {}

  //Appel de l'API Flickr pour une recherche globale
  //Les images sont au format JSON
  getImagesFlickr(
    form: FormGroup,
    currentPage: Number
  ): Observable<photosInterface> {
    const keyword = form.value.keyword;
    this.prevKeyword = keyword;
    const url =
      'https://www.flickr.com/services/rest/?method=flickr.photos.search&';
    let params = `api_key=${environment.flickr.key}&text=${keyword}&format=json&nojsoncallback=1&per_page=${form.value.nbPhotos}&page=${currentPage}`;

    //Apliquer tous les filtres saisis par l'utilisateur
    params = this.getFilters(params, form);

    console.log(url + params);

    return this.http.get<photosInterface>(url + params);
  }

  getImageInfo(id: string): Observable<imageInterface> {
    const url =
      'https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&';
    let params = `&api_key=${environment.flickr.key}&photo_id=${id}&format=json&nojsoncallback=1`;
    return this.http.get<imageInterface>(url + params);
  }

  //Appel de l'API Flickr pour rechercher les informations
  //Les images sont au format JSON
  getFilters(params: string, form: FormGroup) {
    let minUpload = form.value.min_upload_date;
    let maxUpload = form.value.max_upload_date;
    let tags = form.value.tags;
    let tag_mode = form.value.tag_mode;
    let nsfw = form.value.nsfw;
    let fromGallery = form.value.fromGallery;
    let sort = form.value.sort;
    if (minUpload) {
      minUpload = minUpload.toISOString().slice(0, 19).replace('T', ' ');
      params += `&min_upload_date=${minUpload}`;
    }
    if (maxUpload) {
      maxUpload = maxUpload.toISOString().slice(0, 19).replace('T', ' ');
      params += `&max_upload_date=${maxUpload}`;
    }
    if (tags) {
      params += `&tags=${tags}`;
    }
    if (tag_mode) {
      params += `&tag_mode=${tag_mode}`;
    }
    if (nsfw) {
      params += `&safe_search=${nsfw}`;
    }
    if (fromGallery) {
      params += `&in_gallery=1`;
    }
    if (sort) {
      params += `&sort=${sort}`;
    }
    return params;
  }

  getComments(id: string): Observable<commentsInterface> {
    const url =
      'https://www.flickr.com/services/rest/?method=flickr.photos.comments.getList&';
    let params = `&api_key=${environment.flickr.key}&photo_id=${id}&format=json&nojsoncallback=1`;
    return this.http.get<commentsInterface>(url + params);
  }

  getSize(id: string): Observable<sizesInterface> {
    // https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=f13bf45b5485db7405ef5eda152ca951&photo_id=51734392674&format=json&nojsoncallback=1
    const url =
      'https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&';
    let params = `&api_key=${environment.flickr.key}&photo_id=${id}&format=json&nojsoncallback=1`;
    return this.http.get<sizesInterface>(url + params);
  }

  getPhotosUser(user_id: string): Observable<photosInterface> {
    // https://www.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=f13bf45b5485db7405ef5eda152ca951&user_id=56588665%40N00&per_page=10&format=json&nojsoncallback=1
    const url =
      'https://www.flickr.com/services/rest/?method=flickr.people.getPhotos';
    let params = `&api_key=${environment.flickr.key}&user_id=${user_id}&per_page=10&format=json&nojsoncallback=1`;
    return this.http.get<photosInterface>(url + params);
  }

  getInformationsUser(user_id: string): Observable<userInterface> {
    // https://www.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=f13bf45b5485db7405ef5eda152ca951&user_id=56588665%40N00&format=json&nojsoncallback=1
    const url =
      'https://www.flickr.com/services/rest/?method=flickr.people.getInfo';
    let params = `&api_key=${environment.flickr.key}&user_id=${user_id}&per_page=10&format=json&nojsoncallback=1`;
    return this.http.get<userInterface>(url + params);
  }
}
