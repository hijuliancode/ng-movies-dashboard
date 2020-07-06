import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesComponent } from './components/movies/movies.component';
import { MoviesFormComponent } from './components/movies-form/movies-form.component';


const routes: Routes = [
  {
    path: '',
    component: MoviesComponent
  },
  {
    path: 'new',
    component: MoviesFormComponent
  },
  {
    path: 'edit/:id',
    component: MoviesFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
