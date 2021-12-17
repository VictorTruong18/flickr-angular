import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';
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
  {
    path: '**',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
