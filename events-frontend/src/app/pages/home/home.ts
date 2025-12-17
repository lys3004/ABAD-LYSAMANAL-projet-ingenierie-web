import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { NavbarComponent } from "../../shared/navbar/navbar";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {

  events: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit() {
    this.eventService.getAll().subscribe({
      next: (res: any) => {
        this.events = res;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les événements.';
        this.loading = false;
      }
    });
  }

  openEvent(id: number) {
    this.router.navigate(['/event', id]);
  }
}
