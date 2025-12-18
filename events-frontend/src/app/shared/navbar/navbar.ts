import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent implements OnInit {

  isAuthenticated = false;
  userRole = '';
  userName = '';
  isDropdownOpen = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkAuthentication();
  }

  checkAuthentication() {
    const user = localStorage.getItem('user');
    if (user) {
      this.isAuthenticated = true;
      try {
        const userData = JSON.parse(user);
        this.userName = userData.fullName || userData.email || 'Utilisateur';
        this.userRole = userData.role || 'USER';
      } catch (e) {
        this.userRole = 'USER';
      }
    }
  }

  isOrganizer() {
    return this.userRole === 'ORGANIZER';
  }

  isParticipant() {
    return this.userRole === 'USER';
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  logout() {
    localStorage.clear();
    this.isAuthenticated = false;
    this.userRole = '';
    this.router.navigate(['/login']);
  }
}
