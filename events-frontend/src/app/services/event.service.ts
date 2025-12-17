import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface Event {
  id?: number;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  category?: string;
  organizerId: number;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private API_URL = `${environment.apiUrl}/event`;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Event[]>(`${this.API_URL}`);
  }

  getById(id: number) {
    return this.http.get<Event>(`${this.API_URL}/${id}`);
  }

  create(event: Event) {
    return this.http.post<Event>(`${this.API_URL}`, event);
  }

  update(id: number, event: Event) {
    return this.http.post<Event>(`${this.API_URL}`, event);
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
