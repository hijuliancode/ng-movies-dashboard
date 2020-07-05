import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { generate as generateId } from 'shortid';

// Services
import { NzMessageService } from 'ng-zorro-antd/message';
import { MoviesService } from '../../../../core/services/movies/movies.service';

@Component({
  selector: 'app-movies-form',
  templateUrl: './movies-form.component.html',
  styleUrls: ['./movies-form.component.scss']
})
export class MoviesFormComponent implements OnInit {

  moviesForm!: FormGroup;

  constructor(
    public moviesService: MoviesService,
    private nzMessageService: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.moviesForm = this.fb.group({
      title: [null, [Validators.required]],
      release_date: [null, [Validators.required]],
      status: [null, [Validators.required]],
    });
  }

  submitForm(e: Event, moviesForm): void {
    e.preventDefault();
    for (const i in this.moviesForm.controls) {
      this.moviesForm.controls[i].markAsDirty();
      this.moviesForm.controls[i].updateValueAndValidity();
    }
    if (!moviesForm.value.$key) {
      const newMovie = {
        ...moviesForm.value,
        uid: generateId()
      }
      this.moviesService.insertMovie(newMovie);
      this.nzMessageService.success(`¡Película creada!`);
    } else {
      this.moviesService.updateMovie(moviesForm.value);
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
    for (const key in this.moviesForm.controls) {
      this.moviesForm.controls[key].markAsPristine();
      this.moviesForm.controls[key].updateValueAndValidity();
    }
  }

}
