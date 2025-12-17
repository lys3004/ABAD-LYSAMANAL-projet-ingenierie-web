import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { ParticipantService } from '../../services/participant.service';
import { NavbarComponent } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css'
})
export class EventDetailsComponent implements OnInit {

  event: any;
  eventId!: number;

  participantsCount = 0;
  isRegistered = false;
  isOrganizer = false;
  isLoading = true;
  errorMessage = '';
  successMessage = '';

  userId = Number(localStorage.getItem('userId'));

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private participantService: ParticipantService
  ) { }

  ngOnInit() {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEvent();
  }

  loadEvent() {
    this.eventService.getById(this.eventId).subscribe({
      next: (res: any) => {
        this.event = res;
        this.isOrganizer = this.userId === res.organizerId;
        this.isLoading = false;
        this.checkRegistration();
      },
      error: () => {
        this.errorMessage = "Erreur : impossible de charger l'événement.";
        this.isLoading = false;
      }
    });
  }

  checkRegistration() {
    // Appel pour vérifier l'inscription (si la méthode existe)
    // this.participantService.isRegistered(...).subscribe(...)
  }

  register() {
    if (this.isRegistered) return;

    this.participantService.registerForEvent(this.userId, this.eventId).subscribe({
      next: () => {
        this.successMessage = 'Inscription réussie !';
        this.isRegistered = true;
        this.participantsCount++;
      },
      error: () => {
        this.errorMessage = 'Erreur : impossible de s\'inscrire.';
      }
    });
  }

  unregister() {
    if (!this.isRegistered) return;

    this.participantService.unregisterFromEvent(this.userId, this.eventId).subscribe({
      next: () => {
        this.successMessage = 'Désinscription réussie !';
        this.isRegistered = false;
        this.participantsCount--;
      },
      error: () => {
        this.errorMessage = 'Erreur : impossible de se désinscrire.';
      }
    });
  }
}
