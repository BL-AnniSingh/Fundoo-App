import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebar = new EventEmitter<void>();

  searchText: string = '';
  isGrid: boolean = true;

  userImage: string | null = null;
  userInitial: string = 'A';

  ngOnInit() {
    const saved = localStorage.getItem('viewMode');
    this.isGrid = saved !== 'list';

    // Demo profile
    this.userImage = 'https://i.pravatar.cc/150?img=5';
  }

  onSearch() {
    console.log("Search:", this.searchText);
  }

  toggleView() {
    this.isGrid = !this.isGrid;
    localStorage.setItem('viewMode', this.isGrid ? 'grid' : 'list');
  }

  refresh() {
    location.reload();
  }

  toggleSettings() {
    console.log("Settings clicked");
  }
}