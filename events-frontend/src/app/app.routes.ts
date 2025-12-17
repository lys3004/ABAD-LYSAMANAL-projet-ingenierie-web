import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { EventDetailsComponent } from './pages/event-details/event-details';
import { CreateEventComponent } from './pages/create-event/create-event';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { NotificationsComponent } from './pages/notifications/notifications';
import { EditEventComponent } from './pages/edit-event/edit-event';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'notifications', component: NotificationsComponent },

  {
    path: 'dashboard',
    component: DashboardComponent
  },

  {
    path: 'create-event',
    component: CreateEventComponent
  },

  {
    path: 'edit-event/:id',
    component: EditEventComponent
  },

  {
    path: 'event/:id',
    component: EventDetailsComponent
  }
];

