import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-movies',
  imports: [RouterLink, RouterOutlet, MatTabsModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent {
  genres = [
    { id:1, path: 'comedy', label: 'Comedy' },
    { id:2, path: 'thriller', label: 'Thriller' },
    { id:3, path: 'western', label: 'Western' },
  ];
  activeLink = 'comedy';
}
