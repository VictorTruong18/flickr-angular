import { Component, OnInit } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ActivatedRoute } from "@angular/router";
import { FlickrSearchService } from '../../services/flickr-search.service';
@Component({
  selector: 'app-image-infos',
  templateUrl: './image-infos.component.html',
  styleUrls: ['./image-infos.component.css']
})
export class ImageInfosComponent implements OnInit {

  imageId : any;
  image: imageInterface = ({} as any) as imageInterface;
  

  constructor(private route: ActivatedRoute, private flickrSearch:FlickrSearchService) {
  
   
  }
  
  ngOnInit(): void {
    this.imageId = this.route.snapshot.paramMap.get('id');
    this.flickrSearch.getImageInfo(this.imageId).subscribe(
      (data) => {
        //L'image implemente l'interface et contient toutes les informations
         this.image = data;
      }
    );
  }

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

