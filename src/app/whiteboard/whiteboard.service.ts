import { Injectable } from '@angular/core';

@Injectable()
export class WhiteboardService {

  constructor() { }

  getStickyNotes(id: number): Promise<any[]> {
    var stickyNotes = [];
    if (id) {
      stickyNotes[0] = { id: 1, name: "Write Github Wiki", color: "#ffeb3b", parameters: [{ name: "Due Date", value: "04/11/2016" }] };
      stickyNotes[1] = { id: 2, name: "Update Pivotal Tracker with User Stories", color: "#00bcd4", parameters: [{ name: "Sprint", value: "2" }, { name: "Comments", value: "Include user stories not covered in previous sprint" }] };
    }
    return Promise.resolve(stickyNotes);
  }

}
