import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  private API_URL = `${environment.apiUrl}/participant`;

  constructor(private http: HttpClient) { }

  registerForEvent(userId: number, eventId: number) {
    return this.http.post<string>(
      `${this.API_URL}/register?userId=${userId}&eventId=${eventId}`,
      {}
    );
  }

  unregisterFromEvent(userId: number, eventId: number) {
    return this.http.delete<boolean>(
      `${this.API_URL}/unregister?userId=${userId}&eventId=${eventId}`
    );
  }
}
