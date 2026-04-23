import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.css']
})
export class SidenavComponent {
  @Input() isOpen: boolean = true;
  isHovered: boolean = false;

  openEditLabels() {
  console.log("Edit labels clicked");
}
}
