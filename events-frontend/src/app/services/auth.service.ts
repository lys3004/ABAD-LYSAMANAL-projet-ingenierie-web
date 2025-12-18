import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface AppUser {
  id?: number;
  fullName?: string;
  email: string;
  password: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  // =========================
  // REGISTER
  // =========================
  register(name: string, email: string, password: string, role: string) {
    return this.http.post<any>(`${this.API_URL}/register`, {
      fullName: name,
      email,
      password,
      role
    });
  }

  // =========================
  // LOGIN
  // =========================
  login(email: string, password: string) {
    return this.http.post<AppUser>(`${this.API_URL}/login`, {
      email,
      password
    }).pipe(
      tap(user => {
        this.saveUser(user); // ✅ save user + role
      })
    );
  }

  // =========================
  // USER STORAGE
  // =========================
  saveUser(user: AppUser) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): AppUser | null {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }

  logout() {
    localStorage.removeItem('user');
  }

  // =========================
  // AUTH STATUS
  // =========================
  isAuthenticated(): boolean {
    return !!this.getUser();
  }

  // =========================
  // ROLE MANAGEMENT (UI ONLY)
  // =========================
  getRole(): string {
    return this.getUser()?.role || '';
  }

  isOrganizer(): boolean {
    return this.getRole() === 'ORGANIZER';
  }

  isParticipant(): boolean {
    return this.getRole() === 'USER';
  }
}
