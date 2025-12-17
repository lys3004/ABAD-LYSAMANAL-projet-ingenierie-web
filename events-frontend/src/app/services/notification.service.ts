import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface Notification {
  id?: number;
  userId: number;
  message: string;
  isRead?: boolean;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private API_URL = `${environment.apiUrl}/notifications`;

  constructor(private http: HttpClient) { }

  sendNotification(userId: number, message: string) {
    return this.http.post<Notification>(`${this.API_URL}/send`, {
      userId,
      message
    });
  }

  getUserNotifications(userId: number) {
    return this.http.get<Notification[]>(
      `${this.API_URL}/user/${userId}`
    );
  }

  markAsRead(notificationId: number) {
    return this.http.put<Notification>(
      `${this.API_URL}/${notificationId}/read`,
      {}
    );
  }
}
