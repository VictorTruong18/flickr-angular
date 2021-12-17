# PROJET ANGULAR

![Screen Shot 2021-12-17 at 18.32.52.png](PROJET%20ANGULAR%205492f7752d3f4a5ab7f5869455901f2b/Screen_Shot_2021-12-17_at_18.32.52.png)

Groupe :

Nathan PODESTA

Victor TRUONG

Romain PATURET

Adrien MORVAN

Notre répertoire git : [https://github.com/VictorTruong18/PROJET-ANGULAR-FLICKR](https://github.com/VictorTruong18/PROJET-ANGULAR-FLICKR)

# Tests de photos

[http://localhost:4200/image/51734236645](http://localhost:4200/image/51734236645)

![Screen Shot 2021-12-17 at 20.53.31.png](PROJET%20ANGULAR%205492f7752d3f4a5ab7f5869455901f2b/Screen_Shot_2021-12-17_at_20.53.31.png)

[http://localhost:4200/image/33336453970](http://localhost:4200/image/33336453970)

![Screen Shot 2021-12-17 at 20.54.53.png](PROJET%20ANGULAR%205492f7752d3f4a5ab7f5869455901f2b/Screen_Shot_2021-12-17_at_20.54.53.png)

# Commandes pour lancer le projet :

`git clone https://github.com/VictorTruong18/PROJET-ANGULAR-FLICKR.git`

`npm install`

`ng serve` 

# Rappel de l’Enoncé

Faire un moteur de recherche de photos qui exploite l’API Flickr en Angular.

Champ de filtrage et de recherche :

- Par taille taille d’image
- Date minimum / maximum d’upload
- Tri grâce à  divers paramètre
- Recherche NSFW
- Tags suplémentaires
- Appartient ou non à une galerie

Les photos doivent être visibles sous forme de liste ( ex : Google Image ) soit sous forme de slider.

En cliquant sur une photo on a minimum accès :

- Nom de l’auteur
- Les autres photos de l’auteur
- Les commentaires
- La position Géographique

# L’Architecture en Component de l’Application

![Screen Shot 2021-12-17 at 18.55.25.png](PROJET%20ANGULAR%205492f7752d3f4a5ab7f5869455901f2b/Screen_Shot_2021-12-17_at_18.55.25.png)

Comme on peut le constater les attributs qui composent le ‘State’ de l’application sont distribués en casquade de component à component. Ce qui nous permet d’avoir un DOM Virtuel ( qui se recharge automatiquement à chaque fois que les attributs sont modifiés ). Pas besoin de modifier chaque component un à un à chaque requête, il n’y a juste qu’à modifier l’array qui contient toutes les photos pour que l’application se recharge par elle même ce qui compose la force de cette architecture.

On peut voir que le Search Form va effectuer la requête et va donner l’array d’images au component Images-List. Puis à partir de cette array Images-List va créer des components Image.

Lorsque qu’on veut plus de détails sur une photo on est redirigé vers une autre page qui va afficher les informations individuels à chaque photo.

# Les Notions Du Cours Utilisés ( non-exhaustif )

- Utilisation des matériels angular
    
    Nous avons voulu utilisé essentiellement des components venants de la librairie Angular pour avoir plus d’efficacité. ( ex : MatInputModule, MatSliderModule, MatSnackBarModule etc ... )
    
    ![Screen Shot 2021-12-17 at 19.21.31.png](PROJET%20ANGULAR%205492f7752d3f4a5ab7f5869455901f2b/Screen_Shot_2021-12-17_at_19.21.31.png)
    
    Nous avons utiliser FormBuilder pour le formulaire ce qui nous a fait gagner beaucoup de temps.
    
- Les Ngif*
    
    Les Ngif* que nous avons vu dans les premiers cours sont très utilies pour vérifier si une ressource est disponible, et si nous pouvons l’afficher. 
    
    ![Screen Shot 2021-12-17 at 19.26.03.png](PROJET%20ANGULAR%205492f7752d3f4a5ab7f5869455901f2b/Screen_Shot_2021-12-17_at_19.26.03.png)
    
    On les utilise majoritairement lorsque la personne qui a publié la photo n’a pas renseigné l’information ou il n’y a toujours pas d’informations comme ici avec les commentaires.
    
- Utilisation de RXJS, des Interfaces, et des Observables
    
    Les calls d’API se font en HTTP dans le service `flickr-search.service.ts`
    
    Ils ont cette forme :
    
    ```jsx
    getGalleriePhotos(galleryId: string ) : Observable<photosInterface>{
        const url =
          'https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos';
          let params = `&api_key=${environment.flickr.key}&gallery_id=${galleryId}&format=json&nojsoncallback=1`;
          return this.http.get<photosInterface>(url + params);
      }
    ```
    
    On spécifie toujours le type de retour, qui va toujours être un Observable avec un type que nous aurons définis grâce à une interface.
    
    Toutes les interfaces que nous utilisons sont dans le dossier `@types` et nous manipulons les données que de cette manière.
    
    ```jsx
    interface photosInterface {
      photos: {
        photo: FlickrPhoto[];
      };
      stat: string;
    }
    
    interface FlickrPhoto {
      farm: string;
      id: string;
      secret: string;
      server: string;
      title: string;
    }
    ```
    
    Préciser les interfaces permet de mieux manipuler les données JSON que nous obtiendront en sortie.
    
    ```jsx
    this.galleryId = this.route.snapshot.paramMap.get('id');
        this.flickrSearch.getGalleriePhotos(this.galleryId).subscribe((data) => {
          if (data.stat == 'ok') {
            this.arr = data.photos.photo;
          },
    			(err: HttpErrorResponse) => {
    				if(err.error instanceof Error){
    					console.log('Client-side error occured.');
    				} else {
    					console.log('Server-side error occured.');
    				}
    			}
        })
    ```
    
    Comme on peut le voir on peut directement avoir accès à certain champ parce que data est d’un type que nous avons nous-même définis.
    
- Property Binding
    
    Comme nous l’avons vu dans l’architecture en component la majorité des échanges ce font de père à fils pour garder une cohérence dans le flow de propagation des données dans l’application. 
    
    ```html
    <!-- PERE - search-form.component.html -->
    
    <div class="container">
      <app-images-list
        [size]="this.searchForm.value.size" 
        [images]="arr"
      ></app-images-list>
    </div>
    ```
    
    app-images-list est le component fils de search-form.
    
    ```tsx
    export class ImagesListComponent implements OnInit {
      @Input() images: any[] = [];
      @Input() size: String = '';
    
      constructor() {}
    
      ngOnInit(): void {}
    }
    ```
    
    Avec @Input on peut reccupérer les données provenants du père.
    

- Routing
    
    Les redirections ce font grâce au router d’Angular.
    
    ```tsx
    import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
    import { HomeComponent } from './pages/home/home.component';
    import { ImageGallerieComponent } from './pages/image-gallerie/image-gallerie.component';
    import { ImageInfosComponent } from './pages/image-infos/image-infos.component';
    
    const routes: Routes = [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'image/:id',
        component: ImageInfosComponent,
      },
      {
        path: 'gallerie/:id',
        component: ImageGallerieComponent,
      },
    ];
    
    @NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule],
    })
    export class AppRoutingModule {}
    ```
    
    On s’en sert aussi surtout pour pouvoir transmettre des id par l’url.
    

# Quelques precisions sur certains filtres

- Champ de recherche ⇒ Classique recherche par mot
- Trier par ⇒ Trie qui peut se faire pour divers critère, le niveau d’intérêt est géré par le nombre de like et de vus.
- Tags ⇒ Recherche avec tags, il faut séparer chaque tag par des virgules.
    
    ex : Recherche de Springfield sans tag
    
    ![Screen Shot 2021-12-17 at 20.03.33.png](PROJET%20ANGULAR%205492f7752d3f4a5ab7f5869455901f2b/Screen_Shot_2021-12-17_at_20.03.33.png)
    
    ex : Recherche de Springfield avec tag Simpson
    
    ![Screen Shot 2021-12-17 at 19.59.19.png](PROJET%20ANGULAR%205492f7752d3f4a5ab7f5869455901f2b/Screen_Shot_2021-12-17_at_19.59.19.png)
    
- Tag Mode ⇒ Mode qui permet de dire si on veut que la photo contienne tous les tags ou doit au moins en contenir un.
    
      ex : Application du tag mode ‘ALL’ pour avoir une recherche très précise
    
    ![Screen Shot 2021-12-17 at 20.05.43.png](PROJET%20ANGULAR%205492f7752d3f4a5ab7f5869455901f2b/Screen_Shot_2021-12-17_at_20.05.43.png)
    
- Nombres de photos par pages qui est limité par flickr à 500.
- La Date Minimum et Maximum de la photo
- NSFW qui permet de filtrer les images non-appropriés
- Taille, ici nous avons dis que lorsque l’utilisateur spécifie une taille on prendrait toutes les images qui seraient dans ce format en longueur ou en largeur
- Appartient à une galerie permet de savoir si une photo appartient à une gallerie ou non
- A une localisation geographique permet de savoir si une photo a une localisation géographique
    
    ex : Lorsque je tape Singapour est que je mets ‘a une position geographique” J’ai accès à des photos qui ont la map avec la position géographique
    
    ![Screen Shot 2021-12-17 at 20.12.36.png](PROJET%20ANGULAR%205492f7752d3f4a5ab7f5869455901f2b/Screen_Shot_2021-12-17_at_20.12.36.png)
    

# DIfficultés et axe d’amélioration

- Une difficulté est que comme nous utilisons une API externe il se peut parfois qu’elle tombe en panne ce qui peut nous empêcher de travailler. Il faut donc aller régulièrement sur le site [https://www.flickr.com/services/api/](https://www.flickr.com/services/api/) pour vérifier qu’on a pas une erreur 500.

- Un axe d’amélioration que nous avons pas pu résoudre et que lorsque que nous allons de la page Home à la page Image-Infos, et que nous revenons en arrière Angular détruit le component Home et donc on perd le resultat de la requête préscédent.
    
    ![Screen Shot 2021-12-17 at 20.20.22.png](PROJET%20ANGULAR%205492f7752d3f4a5ab7f5869455901f2b/Screen_Shot_2021-12-17_at_20.20.22.png)
    
    ![Screen Shot 2021-12-17 at 20.20.40.png](PROJET%20ANGULAR%205492f7752d3f4a5ab7f5869455901f2b/Screen_Shot_2021-12-17_at_20.20.40.png)
    
    ![Screen Shot 2021-12-17 at 20.20.52.png](PROJET%20ANGULAR%205492f7752d3f4a5ab7f5869455901f2b/Screen_Shot_2021-12-17_at_20.20.52.png)
    
    On souhaiterait pouvoir garder le state de Home pour garder le resultat de la requête que nous avons faîtes avant.
