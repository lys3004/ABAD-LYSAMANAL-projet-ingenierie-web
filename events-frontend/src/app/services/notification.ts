import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private API_URL = `http://localhost:8080/notifications`;

  constructor(private http: HttpClient) { }

  getAll(userId: number) {
    return this.http.get(`${this.API_URL}/user/${userId}`);
  }

  markAsRead(id: number) {
    return this.http.put(`${this.API_URL}/${id}/read`, {});
  }
}
