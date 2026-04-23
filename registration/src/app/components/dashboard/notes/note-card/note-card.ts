import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-card.html',
  styleUrls: ['./note-card.css']
})
export class NoteCardComponent {

  @Input() note: any;

  @Output() delete = new EventEmitter<string>();
  @Output() archive = new EventEmitter<string>();
  @Output() reminder = new EventEmitter<string>();
@Output() colorChange = new EventEmitter<{ id: string, color: string }>();

  onDelete() {
    this.delete.emit(this.note._id || this.note.id);
  }

  onArchive() {
    this.archive.emit(this.note._id || this.note.id);
  }

  onReminder() {
    this.reminder.emit(this.note._id || this.note.id);
  }

  onColorChange(color: string) {
  this.colorChange.emit({
    id: this.note._id || this.note.id,
    color: color
  });
}
@Output() deleteForever = new EventEmitter<string>();

onDeleteForever() {
  this.deleteForever.emit(this.note._id || this.note.id);
}

showPalette = false;

colors = [
  '#ffffff',
  '#f28b82',
  '#fbbc04',
  '#ccff90',
  '#a7ffeb',
  '#d7aefb',
  '#fdcfe8',
  '#e6c9a8',
  '#e8eaed'
];

togglePalette() {
  this.showPalette = !this.showPalette;
}

selectColor(color: string) {
  this.onColorChange(color);
  this.showPalette = false;
}
}