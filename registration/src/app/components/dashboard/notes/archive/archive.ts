import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteService } from '../../../../service/note/note';
import { NoteCardComponent } from '../note-card/note-card';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [CommonModule, NoteCardComponent],
  templateUrl: './archive.html',
  styleUrls: ['./archive.css']
})
export class ArchiveComponent implements OnInit {

  notes: any[] = [];

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.getArchiveNotes();
  }

  //  GET ONLY ARCHIVED
  getArchiveNotes() {
    this.noteService.getNotes().subscribe((res: any) => {

      const allNotes = res?.data?.data || [];

      this.notes = allNotes.filter(
        (note: any) => note.isArchived === true && !note.isDeleted
      );
    });
  }

  // UNARCHIVE
  unarchiveNote(id: string) {

    this.notes = this.notes.filter(n => (n._id || n.id) !== id);

    this.noteService.unarchiveNote(id).subscribe({
      next: () => this.getArchiveNotes(),
      error: () => this.getArchiveNotes()
    });
  }
}