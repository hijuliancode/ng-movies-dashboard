import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Movie } from '../../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  moviesList: AngularFireList<any>
  selectedMovie: Movie = new Movie();

  constructor(
    private firebase: AngularFireDatabase
  ) {}

  getAllMovies() {
    return this.moviesList = this.firebase.list('movies')
  }

  insertMovie(movie: Movie) {
    this.moviesList.push({
      ...movie,
      release_date: (movie.release_date).getTime().toString(),
    });
  }

  updateMovie(movie: Movie) {
    console.log('service > updateMovie > movie', movie)
    this.moviesList.update(movie.$key, {
      ...movie,
      release_date: (movie.release_date).getTime().toString(),
    });
  }

  deleteMovie($key: string) {
    this.moviesList.remove($key);
  }

}
