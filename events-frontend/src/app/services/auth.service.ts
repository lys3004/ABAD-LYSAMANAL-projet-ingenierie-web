import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

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
  private API_URL = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  register(name: string, email: string, password: string, role: string = 'USER') {
    return this.http.post<AppUser>(`${this.API_URL}/register`, {
      fullName: name,
      email,
      password,
      role
    });
  }

  login(email: string, password: string) {
    return this.http.post<AppUser>(`${this.API_URL}/login`, {
      email,
      password
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
