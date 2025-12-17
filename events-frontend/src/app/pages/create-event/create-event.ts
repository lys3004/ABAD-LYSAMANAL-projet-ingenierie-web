import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { NavbarComponent } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './create-event.html',
  styleUrl: './create-event.css'
})
export class CreateEventComponent {

  event: any = {
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    category: '',
    organizerId: Number(localStorage.getItem('userId'))
  };

  successMessage = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private eventService: EventService,
    private router: Router
  ) {}

  create() {
    this.successMessage = '';
    this.errorMessage = '';
    this.isLoading = true;

    if (!this.event.title || !this.event.description || !this.event.location) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      this.isLoading = false;
      return;
    }

    this.eventService.create(this.event).subscribe({
      next: () => {
        this.successMessage = 'Événement créé avec succès !';
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = "Erreur : impossible de créer l'événement.";
      }
    });
  }
}
