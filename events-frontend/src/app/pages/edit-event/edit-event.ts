import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { NavbarComponent } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './edit-event.html',
  styleUrl: './edit-event.css'
})
export class EditEventComponent implements OnInit {

  eventId!: number;
  event: any = {};

  successMessage = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit() {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEvent();
  }

  loadEvent() {
    this.isLoading = true;
    this.eventService.getById(this.eventId).subscribe({
      next: (res: any) => {
        this.event = res;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = "Erreur : impossible de charger l'événement.";
        this.isLoading = false;
      }
    });
  }

  updateEvent() {
    this.successMessage = '';
    this.errorMessage = '';
    this.isLoading = true;

    if (!this.event.title || !this.event.description || !this.event.location) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      this.isLoading = false;
      return;
    }

    this.eventService.update(this.eventId, this.event).subscribe({
      next: () => {
        this.successMessage = 'Événement modifié avec succès !';
        setTimeout(() => this.router.navigate(['/dashboard']), 1500);
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = "Erreur : impossible de modifier l'événement."
      }
    });
  }
}
