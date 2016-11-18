import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { WhiteboardService } from './whiteboard.service';

declare var $: any;

@Component({
  selector: 'whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.css'],
  providers: [WhiteboardService]
})
export class WhiteboardComponent implements OnInit {

  whiteboardId;
  stickyNotes = [];
  newStickyNote = { name: '' };

  constructor(private route: ActivatedRoute, private whiteboardService: WhiteboardService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.whiteboardId = params['id'];
      this.loadStickyNotes();
    });
  }

  loadStickyNotes() {
    this.whiteboardService.getStickyNotes(this.whiteboardId).then(response => {
      this.stickyNotes = response['message'];
    });
  }

  openCreateStickyNoteModal() {
    this.newStickyNote = { name: '' };

    $("#createStickyNoteModal").modal('open');
  }

  closeCreateStickyNoteModal() {
    $("#createStickyNoteModal").modal('close');
  }

  createStickyNote() {
    this.whiteboardService.createStickyNote(1, this.newStickyNote.name, 1, this.whiteboardId).then(response => {
      this.loadStickyNotes();
    });
    this.closeCreateStickyNoteModal();
  }

}
