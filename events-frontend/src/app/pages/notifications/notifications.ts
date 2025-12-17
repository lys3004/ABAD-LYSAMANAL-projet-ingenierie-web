import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification';
import { NavbarComponent } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css'
})
export class NotificationsComponent implements OnInit {

  notifications: any[] = [];
  userId = Number(localStorage.getItem('userId'));
  loading = true;

  constructor(private notifService: NotificationService) { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notifService.getAll(this.userId).subscribe((res: any) => {
      this.notifications = res;
      this.loading = false;
    });
  }

  markAsRead(id: number) {
    this.notifService.markAsRead(id).subscribe(() => {
      this.loadNotifications();
    });
  }
}
