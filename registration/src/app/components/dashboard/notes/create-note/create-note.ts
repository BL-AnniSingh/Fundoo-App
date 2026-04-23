import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-note',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-note.html',
  styleUrls: ['./create-note.css']
})
export class CreateNoteComponent {

  // MOVE HERE (inside class)
  @Input() isArchived: boolean = false;

  title: string = '';
  description: string = '';

  isExpanded = false;

  @Output() noteCreated = new EventEmitter<any>();

  expand() {
    console.log("EXPAND CALLED");
    this.isExpanded = true;
  }

  close() {
    if (this.title || this.description) {
      this.noteCreated.emit({
        title: this.title,
        description: this.description
      });
    }

    this.title = '';
    this.description = '';
    this.isExpanded = false;
  }
}