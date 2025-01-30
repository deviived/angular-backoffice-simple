import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { MoviesComponent } from '../pages/movies/movies.component';
import { LayoutComponent } from '../layout/layout.component';
import { TableMoviesComponent } from '../pages/movies/table-movies/table-movies.component';
import { LoginComponent } from './login/login.component';
import { CreateMovieComponent } from '../pages/movies/create-movie/create-movie.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'movies',
        component: MoviesComponent,
        children: [
          { path: '', redirectTo: 'comedy', pathMatch: 'full' },
          {
            path: ':category',
            component: TableMoviesComponent,
          },
        ],
      },
      {
        path: 'movie/create',
        component: CreateMovieComponent,
      },
    ],
  },
];
