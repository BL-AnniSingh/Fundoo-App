import { Injectable } from '@angular/core';
import { ApiService } from '../httpClient/http-client';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private api: ApiService) {}

  getNotes() {
    return this.api.getMethod('notes/getNotesList');
  }

  createNote(data: any) {
    return this.api.postMethod('notes/addNotes', data);
  }

  deleteNote(id: string) {
    return this.api.postMethod('notes/trashNotes', {
      noteIdList: [id],
      isDeleted: true
    });
  }

  archiveNote(id: string) {
    return this.api.postMethod('notes/archiveNotes', {
      noteIdList: [id],
      isArchived: true
    });
  }

  setReminder(id: string) {
    return this.api.postMethod('notes/addUpdateReminderNotes', {
      noteIdList: [id]
    });
  }

  changeColor(id: string, color: string) {
    return this.api.postMethod('notes/changesColorNotes', {
      noteIdList: [id],
      color: color
    });
  }

  // NEW: DELETE FOREVER (Permanent delete)
  deleteForever(id: string) {
    return this.api.postMethod('notes/deleteForeverNotes', {
      noteIdList: [id]
    });
  }

}