import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesComponent } from './components/movies/movies.component';
import { MoviesFormComponent } from '../forms/movies-form/movies-form.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MoviesRoutingModule } from './movies-routing.module';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [MoviesListComponent, MoviesFormComponent, MoviesComponent],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    SharedModule
  ]
})
export class MoviesModule { }
