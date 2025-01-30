import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, tap } from "rxjs";

export interface User {
    email: string;
    first_name: string;
    last_name: string;
} 

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Partial<User> = {};
  private baseUrl = '/auth'; // Base URL for authentication APIs

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem('jwtToken', response.token); // Store the token
            this.router.navigate(["/"]);
          }
        })
      );
  }

   /**
   * Logout method to remove the JWT token from storage.
   */
  // Logout method
  logout(): Observable<string> {
    // Use HttpClient's post method to call the backend API for logout
    return this.http.post<string>(`${this.baseUrl}/logout`, null, { responseType: 'text' as 'json' })  // Posting null body
      .pipe(
        tap(response => {
          console.log('Déconnexion réussie:', response);  // Log response to see if we get it
          localStorage.removeItem('jwtToken');  // Remove the JWT token from local storage
          this.router.navigate(['/login']);  // Redirect to the login page
        }),
        catchError(error => {
          console.error('Erreur lors de la déconnexion:', error);
          // Optionally handle the error and show a user-friendly message
          return [];
        })
      );
  }

  /**
   * Returns the current JWT token.
   */
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  githubLogin(): void {
    window.location.href = `${this.baseUrl}/oauth2/authorization/github`; // Redirect to GitHub OAuth2
  }

}

