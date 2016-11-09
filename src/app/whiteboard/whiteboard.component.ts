import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.css']
})
export class WhiteboardComponent implements OnInit {

  stickyNotes = [];

  constructor() {
    this.stickyNotes[0] = { id: 1, name: "Write Github Wiki", color: "#ffeb3b", parameters: [{ name: "Due Date", value: "04/11/2016" }] };
    this.stickyNotes[1] = { id: 2, name: "Update Pivotal Tracker with User Stories", color: "#00bcd4", parameters: [{ name: "Sprint", value: "2" }, { name: "Comments", value: "Include user stories not covered in previous sprint" }] };
  }

  ngOnInit() {
  }

}
