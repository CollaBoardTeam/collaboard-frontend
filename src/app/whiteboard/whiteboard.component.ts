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
  newStickyNote = {};
  selectedStickyNote;

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
    this.newStickyNote = {};

    $("#createStickyNoteModal").modal('open');
  }

  closeCreateStickyNoteModal() {
    $("#createStickyNoteModal").modal('close');
  }

  openEditStickyNoteModal(stickyNote) {
    this.newStickyNote = Object.assign({}, stickyNote);
    $("#editStickyNoteModal").modal('open');
  }

  closeEditStickyNoteModal() {
    $("#editStickyNoteModal").modal('close');
  }

  openDeleteStickyNoteModal(stickyNote) {
    this.selectedStickyNote = stickyNote;
    $("#deleteStickyNoteModal").modal('open');
  }

  closeDeleteStickyNoteModal() {
    $("#deleteStickyNoteModal").modal('close');
  }

  createStickyNote() {
    this.whiteboardService.createStickyNote(1, this.newStickyNote["lineContent"], 1, this.whiteboardId).then(response => {
      this.loadStickyNotes();
    });
    this.closeCreateStickyNoteModal();
  }

  editStickyNote() {
    this.whiteboardService.editStickyNote(this.newStickyNote["idSticky"], this.newStickyNote["lineContent"], this.newStickyNote["indexLine"]).then(response => {
      this.loadStickyNotes();
    });
    this.closeEditStickyNoteModal();
  }

  deleteStickyNote() {
    this.whiteboardService.deleteStickyNote(this.selectedStickyNote.idSticky).then(response => {
      this.loadStickyNotes();
    });
    this.closeDeleteStickyNoteModal();
  }

}
