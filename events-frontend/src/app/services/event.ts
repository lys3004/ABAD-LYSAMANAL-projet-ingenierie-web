import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private API_URL = 'http://localhost:8080/events';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any[]>(`${this.API_URL}/`);
  }

  getById(id: number) {
    return this.http.get<any>(`${this.API_URL}/${id}`);
  }

  getByOrganizer(organizerId: number) {
    return this.http.get<any[]>(`${this.API_URL}/organizer/${organizerId}`);
  }

  create(data: any) {
    return this.http.post(`${this.API_URL}/create`, data);
  }

  update(id: number, data: any) {
    return this.http.put(`${this.API_URL}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
