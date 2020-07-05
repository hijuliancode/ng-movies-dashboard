import { Component, OnInit } from '@angular/core';
import { Movie } from '../../../../shared/models/movie.model';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  listOfData: Movie[] = [
    {
      $key: '1',
      id: '1',
      title: 'John Brown',
      release_date: new Date(),
      status: true
    },
    {
      $key: '2',
      id: '2',
      title: 'Jim Green',
      release_date: new Date(),
      status: false
    },
    {
      $key: '3',
      id: '3',
      title: 'Joe Black',
      release_date: new Date(),
      status: true
    }
  ];

  constructor() { }

  ngOnInit(): void {

  }

}
