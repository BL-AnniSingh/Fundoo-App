import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes/notes'; 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NotesComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {}