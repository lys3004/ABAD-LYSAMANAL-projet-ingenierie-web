import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  private API_URL = `http://localhost:8080/participant`;

  constructor(private http: HttpClient) { }

  register(data: any) {
    return this.http.post(`${this.API_URL}/register`, data);
  }

  unregister(eventId: number, userId: number) {
    return this.http.delete(`${this.API_URL}/${eventId}/${userId}`);
  }

  isRegistered(eventId: number, userId: number) {
    return this.http.get<boolean>(`${this.API_URL}/${eventId}/${userId}`);
  }

  getParticipants(eventId: number) {
    return this.http.get<any[]>(`${this.API_URL}/event/${eventId}`);
  }
}
