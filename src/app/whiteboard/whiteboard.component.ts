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
  whiteboardContent = {};
  stickyNotesColors = [];
  newStickyNote = {};
  selectedStickyNote;

  constructor(private route: ActivatedRoute, private whiteboardService: WhiteboardService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.whiteboardId = params['id'];
      this.loadStickyNotes();
      this.loadStickyNotesColors();
    });
  }

  loadStickyNotes() {
    this.whiteboardService.getStickyNotes(this.whiteboardId).then(response => {
      this.whiteboardContent = response['message'];
    });
  }

  loadStickyNotesColors() {
    this.whiteboardService.getColors().then(response => {
      this.stickyNotesColors = response['message'];
    });
  }

  openCreateStickyNoteModal() {
    this.newStickyNote = {};
    this.newStickyNote["stickyColor"] = this.stickyNotesColors[0].color;

    $("#createStickyNoteModal").modal('open');
  }

  closeCreateStickyNoteModal() {
    $("#createStickyNoteModal").modal('close');
  }

  openEditStickyNoteModal(stickyNote) {
    this.newStickyNote = Object.assign({}, stickyNote);
    this.newStickyNote["oldColor"] = this.newStickyNote["stickyColor"];
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
    this.whiteboardService.createStickyNote(1, this.newStickyNote["stickyContent"], this.getColorId(this.newStickyNote["stickyColor"]), 1, this.whiteboardId).then(response => {
      this.loadStickyNotes();
    });
    this.closeCreateStickyNoteModal();
  }

  editStickyNote() {
    this.whiteboardService.editStickyNote(this.newStickyNote["stickyId"], this.newStickyNote["stickyContent"], this.newStickyNote["indexLine"]).then(response => {
      if (this.newStickyNote["oldColor"] !== this.newStickyNote["stickyColor"]) {
        this.whiteboardService.changeStickyNoteColor(this.newStickyNote["stickyId"], this.getColorId(this.newStickyNote["stickyColor"])).then(response => {
          this.loadStickyNotes();
        });
      } else {
        this.loadStickyNotes();
      }
    });
    this.closeEditStickyNoteModal();
  }

  getColorId(colorHex){
    var color = this.stickyNotesColors.find(color => color.color === colorHex);
    if(color){
      return color["idColor"];
    }
    return -1;
  }

  deleteStickyNote() {
    this.whiteboardService.deleteStickyNote(this.selectedStickyNote.stickyId).then(response => {
      this.loadStickyNotes();
    });
    this.closeDeleteStickyNoteModal();
  }

}
