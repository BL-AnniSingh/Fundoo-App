import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteService } from '../../../../service/note/note';
import { NoteCardComponent } from '../note-card/note-card';

@Component({
  selector: 'app-trash',
  standalone: true,
  imports: [CommonModule, NoteCardComponent],
  templateUrl: './trash.html',
  styleUrls: ['./trash.css']
})
export class TrashComponent implements OnInit {

  notes: any[] = [];

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.getTrashNotes();
  }

  // SHOW ONLY DELETED
getTrashNotes() {
  this.noteService.getNotes().subscribe((res: any) => {

    const allNotes = res?.data?.data || [];

    console.log("TRASH DATA:", allNotes);

    this.notes = allNotes.filter(
      (note: any) => note.isDeleted === true
    );
  });
}
  // DELETE FOREVER
  deleteForeverNote(id: string) {
    this.notes = this.notes.filter(n => (n._id || n.id) !== id);

    this.noteService.deleteForever(id).subscribe({
      error: () => this.getTrashNotes()
    });
  }

  // RESTORE
  restoreNote(id: string) {
    this.notes = this.notes.filter(n => (n._id || n.id) !== id);

    this.noteService.restoreNote(id).subscribe({
      error: () => this.getTrashNotes()
    });
  }
}