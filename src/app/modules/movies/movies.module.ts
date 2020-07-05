import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MoviesComponent } from './components/movies/movies.component';
import { MoviesFormComponent } from './components/movies-form/movies-form.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MoviesRoutingModule } from './movies-routing.module';

import { SharedModule } from '../../shared/shared.module';
import { IconsProviderModule } from '../../icons-provider.module';

@NgModule({
  declarations: [
    MoviesListComponent,
    MoviesComponent,
    MoviesFormComponent
  ],
  imports: [
    CommonModule,
    IconsProviderModule,
    MoviesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MoviesModule { }
