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
  ) {}

  onRegister() {
    this.errorMessage = '';
    this.successMessage = '';

    // ✅ validations locales
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    this.isLoading = true;

    this.authService
      .register(this.name, this.email, this.password, this.role)
      .subscribe({
        next: () => {
          // ✅ succès réel (HTTP 200)
          this.isLoading = false;
          this.successMessage = 'Compte créé avec succès !';

          // redirection simple
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Registration error:', err);

          // ⚠️ ton backend ne renvoie PAS 409
          this.errorMessage = 'Erreur serveur lors de la création du compte.';
        }
      });
  }
}
