import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipantService } from '../../services/participant';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-participants-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './participants-list.html',
  styleUrl: './participants-list.css'
})
export class ParticipantsListComponent implements OnInit {

  @Input() eventId!: number;
  participants: any[] = [];
  loading = true;

  constructor(
    private participantService: ParticipantService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadParticipants();
  }

  loadParticipants() {
    this.participantService.getParticipants(this.eventId).subscribe(async (res: any[]) => {
      const list: any[] = [];

      for (const p of res) {
        const user = await this.authService.getUserById(p.userId).toPromise() as any;
        list.push({
          ...p,
          name: user?.name,
          email: user?.email
        });
      }

      this.participants = list;
      this.loading = false;
    });
  }
}
