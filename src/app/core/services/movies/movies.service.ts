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
    const data = JSON.parse( JSON.stringify({
      release_date: movie.release_date,
      status: movie.status,
      title: movie.title,
      uid: movie.uid,
    }))
    this.moviesList.push(data);
  }

  updateMovie(movie: Movie) {
    console.log('service > updateMovie > movie', movie)
    const data = JSON.parse( JSON.stringify({
      release_date: movie.release_date,
      status: movie.status,
      title: movie.title,
      uid: movie.uid,
    }))
    this.moviesList.update(movie.$key, data);
  }

  deleteMovie($key: string) {
    this.moviesList.remove($key);
  }

}
