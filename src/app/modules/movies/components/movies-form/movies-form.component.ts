import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { generate as generateId } from 'shortid';

// Services
import { NzMessageService } from 'ng-zorro-antd/message';
import { MoviesService } from '../../../../core/services/movies/movies.service';
import { Movie } from 'src/app/core/models/movie.model';

@Component({
  selector: 'app-movies-form',
  templateUrl: './movies-form.component.html',
  styleUrls: ['./movies-form.component.scss']
})
export class MoviesFormComponent implements OnInit {
  isEditingMovie = false;
  movieEditingID = '';
  moviesForm!: FormGroup;

  constructor(
    public moviesService: MoviesService,
    private nzMessageService: NzMessageService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.movieEditingID = params.id;
      console.log('this.movieEditingID', this.movieEditingID)
      if (this.movieEditingID) {
        this.isEditingMovie = true;
      }
    });
    this.moviesForm = this.fb.group({
      $key: [this.moviesService.selectedMovie.$key],
      title: [this.moviesService.selectedMovie.title, [Validators.required]],
      release_date: [this.moviesService.selectedMovie.release_date, [Validators.required]],
      status: [this.moviesService.selectedMovie.status, [Validators.required]],
    });
  }

  submitForm(e: Event, moviesForm): void {
    console.log('SUBMIT FORM', moviesForm)
    e.preventDefault();
    for (const i in this.moviesForm.controls) {
      this.moviesForm.controls[i].markAsDirty();
      this.moviesForm.controls[i].updateValueAndValidity();
    }
    if (!moviesForm.value.$key) {
      const newMovie = {
        release_date: moviesForm.value.release_date,
        status: moviesForm.value.status,
        title: moviesForm.value.title,
        uid: generateId()
      }
      this.moviesService.insertMovie(newMovie);
      this.nzMessageService.success(`¡Película creada!`);
    } else {
      this.moviesService.updateMovie(moviesForm.value);
      this.nzMessageService.success(`¡Película actualizada!`);
    }
    this.resetForm();
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    }
    return {};
  };
  
  resetForm(): void {
    this.moviesForm.reset();
    this.moviesService.selectedMovie = new Movie();
    for (const key in this.moviesForm.controls) {
      this.moviesForm.controls[key].markAsPristine();
      this.moviesForm.controls[key].updateValueAndValidity();
    }
  }

}
