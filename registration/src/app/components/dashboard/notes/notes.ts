import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteCardComponent } from './note-card/note-card';
import { NoteService } from '../../../service/note/note';
import { CreateNoteComponent } from './create-note/create-note';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, NoteCardComponent, CreateNoteComponent],
  templateUrl: './notes.html',
  styleUrls: ['./notes.css']
})
export class NotesComponent implements OnInit {

  notes: any[] = [];

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.getNotes();
  }

  // GET NOTES (hide deleted notes)
  getNotes() {
    console.log("GET NOTES CALLED");

    this.noteService.getNotes().subscribe((res: any) => {
      this.notes = (res?.data?.data || []).filter((note: any) => !note.isDeleted);
    });
  }

  // DELETE (move to trash)
  deleteNote(id: string) {

    this.notes = this.notes.filter(n => (n._id || n.id) !== id);

    this.noteService.deleteNote(id).subscribe({
      error: () => this.getNotes()
    });
  }

  // ARCHIVE
  archiveNote(id: string) {

    this.notes = this.notes.filter(n => (n._id || n.id) !== id);

    this.noteService.archiveNote(id).subscribe({
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

  // COLOR CHANGE
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

  
  deleteForeverNote(id: string) {

    this.notes = this.notes.filter(n => (n._id || n.id) !== id);

    this.noteService.deleteForever(id).subscribe({
      error: () => this.getNotes()
    });
  }

  
  trackById(index: number, note: any) {
    return note._id || note.id || index;
  }

  //  GET TRASHED NOTES
  getTrashNotes() {
    this.noteService.getNotes().subscribe((res: any) => {
      this.notes = (res?.data?.data || []).filter((note: any) => note.isDeleted);
    });
  }

}