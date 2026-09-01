import { Service, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string; // Optional if backend uses HttpOnly cookies
}

@Service()
export class AuthService {
  private http = inject(HttpClient);
  private readonly API_URL = 'https://example.com';

  // Signals maintain application reactive state
  currentUserToken = signal<string | null>(localStorage.getItem('access_token'));

  register(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, data);
  }

  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap(response => this.handleAuthentication(response))
    );
  }

  // Requests a new access token using the stored refresh token
  refreshToken(): Observable<AuthResponse> {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.http.post<AuthResponse>(`${this.API_URL}/refresh`, { refreshToken }).pipe(
      tap(response => this.handleAuthentication(response))
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.currentUserToken.set(null);
  }

  private handleAuthentication(response: AuthResponse): void {
    localStorage.setItem('access_token', response.accessToken);
    if (response.refreshToken) {
      localStorage.setItem('refresh_token', response.refreshToken);
    }
    this.currentUserToken.set(response.accessToken);
  }
}
