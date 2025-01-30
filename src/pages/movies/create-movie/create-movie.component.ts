import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Movie, MoviesService } from '../../../services/movies.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-movie',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatSelectModule, MatIconModule, MatInputModule, MatButtonModule],
  templateUrl: './create-movie.component.html',
  styleUrl: './create-movie.component.scss'
})
export class CreateMovieComponent {
  movieForm: FormGroup;

  genres: {key: string, value: string}[] = [{key: 'COMEDY', value: 'Comedy'},
    {key: 'ROMANCE', value: 'Romance'},
    {key: 'SCIENCE-FICTION', value: 'Science Fiction'}]; // List of genres

  constructor(private fb: FormBuilder, private movieService: MoviesService, private _location: Location,
    private toast: ToastrService
  ) {
    // Initialize the form group with form controls and their validators
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      director: ['', Validators.required],
      genre: ['', Validators.required],
      rating: [null, [Validators.min(1), Validators.max(5), Validators.required]],
      movie_year: [
        null,
        [Validators.required, Validators.min(1888)], // First movie was made in 1888
      ],
    });
  }

  ngOnInit(): void {}
  
  goBack() {
    // this.router.navigate([".."]);
    this._location.back();
  }

  // Submit the form
  onSubmit(): void {
    if (this.movieForm.valid) {
      const movie: Movie = this.movieForm.value;
      this.movieService.save(movie).subscribe({
        next: (savedMovie: Movie) => {
          console.log('Movie saved:', savedMovie);
          // alert('Movie saved successfully!');
          this.toast.success("Successfully saved.")
          this.movieForm.reset(); // Clear the form after successful submission
        },
        error: (err: any) => {
          console.error('Error saving movie:', err);
          alert('Failed to save the movie.');
        },
      });
    }
  }
}
