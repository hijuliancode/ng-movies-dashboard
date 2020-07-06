import { Component, OnInit } from '@angular/core';

// Services
import { MoviesService } from 'src/app/core/services/movies/movies.service';
import { NzMessageService } from 'ng-zorro-antd/message';

// Models
import { Movie } from '../../../../core/models/movie.model';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  moviesList: Movie[] = [];
  loading = true;
  searchValue = '';
  visible = false;
  listOfDisplayData = [...this.moviesList];

  constructor(
    private moviesService: MoviesService,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.moviesService.getAllMovies()
    .snapshotChanges()
    .subscribe(item => {
      this.moviesList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        this.moviesList.push(x as Movie);
      })
      this.loading = false;
      this.listOfDisplayData = [...this.moviesList];
    });
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.moviesList.filter((item: Movie) => {
      return item.title.indexOf(this.searchValue) !== -1;
    });
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }
  
  onEdit(movie: Movie) {
    console.log('MOVIE EDIT', movie)
    this.moviesService.selectedMovie = Object.assign({}, movie);
  }

  onDelete(movieKey: string) {
    this.moviesService.deleteMovie(movieKey);
    this.nzMessageService.error('¡Película eliminada!');
  }

}
