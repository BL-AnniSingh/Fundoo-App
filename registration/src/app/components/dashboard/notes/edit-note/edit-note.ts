import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-note',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-note.html',
  styleUrls: ['./edit-note.css']
})
export class EditNoteComponent {

  @Input() note: any;

  @Output() close = new EventEmitter<void>();
  @Output() archive = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() reminder = new EventEmitter<any>();
  @Output() colorChange = new EventEmitter<{ id: string, color: string }>();

  showPalette = false;

  colors = [
    '#ffffff',
    '#f28b82',
    '#fbbc04',
    '#ccff90',
    '#a7ffeb',
    '#d7aefb',
    '#fdcfe8'
  ];

  onClose() {
    this.close.emit();
  }

  togglePalette() {
    this.showPalette = !this.showPalette;
  }

  changeColor(color: string) {

  // 🔥 update popup immediately
  this.note.color = color;

  // 🔥 send to parent (API call)
  this.colorChange.emit({
    id: this.note._id || this.note.id,
    color: color
  });

  this.showPalette = false;
}
}