import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  role = 'USER';
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onRegister() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    this.isLoading = true;
    this.authService.register(this.name, this.email, this.password, this.role)
      .subscribe({
        next: (res) => {
          this.successMessage = 'Compte créé avec succès !';
          setTimeout(() => this.router.navigate(['/login']), 1500);
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Registration error:', err);
          if (err.status === 409) {
            this.errorMessage = 'Erreur : cet e-mail existe déjà.';
          } else if (err.status === 0) {
            this.errorMessage = 'Erreur : impossible de contacter le serveur (backend hors ligne ?)';
          } else {
            this.errorMessage = `Erreur (${err.status}) : ${err.message || 'problème technique'}`;
          }
        }
      });
  }
}
