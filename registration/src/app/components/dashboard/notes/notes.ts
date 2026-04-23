import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteCardComponent } from './note-card/note-card';
import { NoteService } from '../../../service/note/note';
import { CreateNoteComponent } from './create-note/create-note';

import { EditNoteComponent } from './edit-note/edit-note';


@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    CommonModule,
    NoteCardComponent,
    CreateNoteComponent,
    EditNoteComponent
  ],
  templateUrl: './notes.html',
  styleUrls: ['./notes.css']
})
export class NotesComponent implements OnInit {

  notes: any[] = [];

  constructor(private noteService: NoteService) {}

ngOnInit() {
  this.getNotes();        // 🔥 REQUIRED
  this.selectedNote = null; // safe
}

  // ✅ SHOW ONLY ACTIVE NOTES
  getNotes() {
    this.noteService.getNotes().subscribe((res: any) => {

      const allNotes = res?.data?.data || [];

      console.log("ALL NOTES:", allNotes);

      this.notes = allNotes.filter((note: any) =>
        (note.isDeleted === false || note.isDeleted === undefined) &&
        (note.isArchived === false || note.isArchived === undefined)
      );

      console.log("VISIBLE NOTES:", this.notes);
    });
  }

  // DELETE → MOVE TO TRASH
  deleteNote(id: string) {

  // remove instantly from UI
  this.notes = this.notes.filter(n => (n._id || n.id) !== id);

  // call API + refresh
  this.noteService.deleteNote(id).subscribe({
    next: () => this.getNotes(),   
    error: () => this.getNotes()
  });
}

  // ARCHIVE
  archiveNote(id: string) {

  this.notes = this.notes.filter(n => (n._id || n.id) !== id);

  this.noteService.archiveNote(id).subscribe({
    next: () => this.getNotes(),
    error: () => this.getNotes()
  });
}

  // REMINDER
  setReminder(id: string) {
    this.noteService.setReminder(id).subscribe({
      error: () => this.getNotes()
    });
  }

  // ADD NOTE
  addNote(note: any) {

    const tempNote = {
      title: note.title,
      description: note.description,
      _id: Date.now().toString()
    };

    this.notes = [tempNote, ...this.notes];

    this.noteService.createNote(note).subscribe({
      error: () => {
        this.notes = this.notes.filter(n => n._id !== tempNote._id);
      }
    });
  }

  // COLOR
  changeColor(event: { id: string, color: string }) {
    this.notes = this.notes.map(n =>
      (n._id || n.id) === event.id
        ? { ...n, color: event.color }
        : n
    );

    this.noteService.changeColor(event.id, event.color).subscribe({
      error: () => this.getNotes()
    });
  }

  trackById(index: number, note: any) {
    return note._id || note.id || index;
  }

selectedNote: any = null;

openEdit(note: any) {
  this.selectedNote = note;
}

closeEdit() {
  this.selectedNote = null;
}
}