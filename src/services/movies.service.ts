import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable } from "rxjs";
import { catchError, map, shareReplay, tap } from 'rxjs/operators';

export interface Movie {
    title: string;
    director: string;
    genre: string;
    rating?: number;
    movie_year: number;
} 

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private baseUrl = "/api/movies";

  private moviesSubject = new BehaviorSubject<Movie[]>([]);
  public movies$ = this.moviesSubject.asObservable();

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  errorToast(title: string, msg: string) {
    this.toastr.error(msg, title);
  }

  fetchMoviesByGenre(genre: string): void {
    this.http.get<Movie[]>(`${this.baseUrl}/${genre}`).pipe(
      catchError(() => {
        this.moviesSubject.error('An error occurred');
        this.errorToast("Error", "Could not fetch movies by genre");
        return [];
      }),
    )
    .subscribe((movies) => this.moviesSubject.next(movies));
  }

  fetchAllMovies(): void {
    this.http.get<Movie[]>(this.baseUrl).pipe(
      catchError(() => {
        this.moviesSubject.error('An error occurred');
        this.errorToast("Error", "Could not fetch all movies");
        return [];
      }),
    )
    .subscribe((movies) => this.moviesSubject.next(movies));
  }

  save(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.baseUrl, movie);
  }
}
