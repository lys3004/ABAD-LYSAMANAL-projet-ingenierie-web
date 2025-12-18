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
  selectedImageFile: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private eventService: EventService,
    private router: Router
  ) {}

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // Vérifier la taille (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        this.errorMessage = 'L\'image doit faire moins de 5MB.';
        return;
      }

      this.selectedImageFile = file;

      // Créer un aperçu
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  create() {
    this.successMessage = '';
    this.errorMessage = '';
    this.isLoading = true;

    if (!this.event.title || !this.event.description || !this.event.location) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      this.isLoading = false;
      return;
    }

    // Si une image est sélectionnée, la convertir en base64
    if (this.selectedImageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.event.imageUrl = reader.result as string;
        this.submitEvent();
      };
      reader.readAsDataURL(this.selectedImageFile);
    } else {
      this.submitEvent();
    }
  }

  submitEvent() {
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
