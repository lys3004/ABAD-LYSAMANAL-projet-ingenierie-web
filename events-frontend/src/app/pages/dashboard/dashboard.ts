import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {

  events: any[] = [];
  loading = true;
  successMessage = '';
  errorMessage = '';

  organizerId = Number(localStorage.getItem('userId'));

  constructor(
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAll().subscribe({
      next: (res: any) => {
        this.events = res.filter((e: any) => e.organizerId === this.organizerId);
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les événements.';
        this.loading = false;
      }
    });
  }

  createEvent() {
    this.router.navigate(['/create-event']);
  }

  editEvent(id: number) {
    this.router.navigate(['/edit-event', id]);
  }

  deleteEvent(id: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
      this.eventService.delete(id).subscribe({
        next: () => {
          this.successMessage = 'Événement supprimé avec succès !';
          this.loadEvents();
        },
        error: () => {
          this.errorMessage = 'Erreur : impossible de supprimer l\'événement.';
        }
      });
    }
  }
}
