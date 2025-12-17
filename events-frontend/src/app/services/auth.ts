import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = `http://localhost:8080/auth`;

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post(`${this.API_URL}/login`, { email, password });
  }

  register(name: string, email: string, password: string, role: string) {
    return this.http.post(`${this.API_URL}/register`, {
      fullName: name, email, password, role
    });
  }

  getUserById(id: number) {
    return this.http.get(`${this.API_URL}/${id}`);
  }
}
