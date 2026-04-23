import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {

  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() refreshNotes = new EventEmitter<void>();
  @Output() searchNotes = new EventEmitter<string>();
  @Output() toggleViewEvent = new EventEmitter<boolean>();

  searchText: string = '';
  isGrid = true;

  // 🔥 ADD THIS METHOD
  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  refresh() {
    this.refreshNotes.emit();
  }

  onSearch() {
    this.searchNotes.emit(this.searchText);
  }

  toggleView() {
    this.isGrid = !this.isGrid;
    this.toggleViewEvent.emit(this.isGrid);
  }

  toggleSettings() {
    alert("Settings clicked (you can open modal here)");
  }
}