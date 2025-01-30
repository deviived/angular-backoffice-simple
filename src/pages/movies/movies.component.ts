import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-movies',
  imports: [RouterLink, RouterOutlet, MatTabsModule, MatButtonModule, MatIconModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent {
  genres = [
    { id:1, path: 'comedy', label: 'Comedy' },
    { id:2, path: 'thriller', label: 'Thriller' },
    { id:3, path: 'romance', label: 'Romance' },
    { id:4, path: 'science_fiction', label: 'Science Fiction' },
  ];
  activeLink = 'comedy';

  constructor(private router: Router) {}

  navigateToCreateMovie() {
    this.router.navigate(["/movie/create"]);
  }
}
