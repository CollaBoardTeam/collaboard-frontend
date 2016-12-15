import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { WhiteboardService } from './whiteboard.service';
import { ToolbarService } from '../toolbar/toolbar.service';
import { AuthService } from '../app/auth.service';

declare var $: any;

@Component({
  selector: 'whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.css'],
  providers: [WhiteboardService, ToolbarService, AuthService]
})
export class WhiteboardComponent implements OnInit {

  user;
  whiteboardId;
  whiteboardLayout = [];
  whiteboardUsers = [];
  whiteboardContent = {};
  stickyNotesColors = [];
  newStickyNote = { stickylines: [] };
  newGroup = { id: '', name: '' };
  selectedStickyNote;

  constructor(private route: ActivatedRoute, private whiteboardService: WhiteboardService,
    private toolbarService: ToolbarService, private authService: AuthService) {
    this.user = this.authService.getUser();
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
      this.whiteboardContent = JSON.parse(response['message'][0]['result']);

      this.whiteboardService.getWhiteboardLayout(this.whiteboardContent["whiteboardLayoutID"]).then(response => {
        this.whiteboardLayout = response['message'];
      });
    });
  }

  loadStickyNotesColors() {
    this.whiteboardService.getColors().then(response => {
      this.stickyNotesColors = response['message'];
    });
  }

  openCreateStickyNoteModal() {
    this.newStickyNote = { stickylines: [] };
    this.newStickyNote["stickyColor"] = this.stickyNotesColors[0].color;

    $("#createStickyNoteModal").modal('open');
  }

  closeCreateStickyNoteModal() {
    $("#createStickyNoteModal").modal('close');
  }

  openEditStickyNoteModal(stickyNote) {
    this.newStickyNote = JSON.parse(JSON.stringify(stickyNote));
    this.newStickyNote.stickylines = [];
    this.newStickyNote["oldColor"] = this.newStickyNote["stickyColor"];
    $("#editStickyNoteModal").modal('open');
  }

  closeEditStickyNoteModal() {
    $("#editStickyNoteModal").modal('close');
  }

  openEditGroupNameModal(groupId, groupName) {
    this.newGroup = { id: groupId, name: groupName };
    $("#editGroupNameModal").modal('open');
  }

  closeEditGroupNameModal() {
    $("#editGroupNameModal").modal('close');
  }

  editGroupName() {
    this.whiteboardService.changeGroupName(this.newGroup.id, this.newGroup.name).then(response => {
      this.loadStickyNotes();
    });
    this.closeEditGroupNameModal();
  }

  openDeleteStickyNoteModal(stickyNote) {
    this.selectedStickyNote = stickyNote;
    $("#deleteStickyNoteModal").modal('open');
  }

  closeDeleteStickyNoteModal() {
    $("#deleteStickyNoteModal").modal('close');
  }

  createStickyNote() {
    var lines = [];
    var i = 1;
    this.newStickyNote.stickylines.forEach(function (line) {
      lines.push(
        {
          "lineContent": line,
          "linePosition": i
        });
      i++;
    });
    this.whiteboardService.createStickyNote(this.getColorId(this.newStickyNote["stickyColor"]), 1, this.whiteboardId, lines).then(response => {
      this.loadStickyNotes();
    });
    this.closeCreateStickyNoteModal();
  }

  editStickyNote() {
    var groupLines = this.newStickyNote["groupLines"];
    groupLines.forEach(function (line) {
      line.lineContent = line.stickyContent;
      delete line.stickyContent;
      line.lineID = line.lineId;
      delete line.lineId;
      delete line.lineIndex;
    });
    this.whiteboardService.editStickyNote(this.newStickyNote["stickyId"], this.getColorId(this.newStickyNote["stickyColor"]), groupLines).then(response => {
      this.whiteboardService.changeStickyNoteGroup(this.newStickyNote["stickyId"], this.newStickyNote["groupID"]).then(response => {
        if (this.newStickyNote["oldColor"] !== this.newStickyNote["stickyColor"]) {
          this.whiteboardService.changeStickyNoteColor(this.newStickyNote["stickyId"], this.getColorId(this.newStickyNote["stickyColor"])).then(response => {
            this.loadStickyNotes();
          });
        } else {
          this.loadStickyNotes();
        }
      });
    });
    this.closeEditStickyNoteModal();
  }

  getColorId(colorHex) {
    var color = this.stickyNotesColors.find(color => color.color === colorHex);
    if (color) {
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

  deleteGroup(groupId) {
    this.whiteboardService.deleteGroup(groupId).then(response => {
      this.loadStickyNotes();
    });
  }

  openUsersModal() {
    this.loadWhiteboardUsers();
    $("#usersModal").modal('open');
  }

  loadWhiteboardUsers() {
    this.whiteboardService.getWhiteboardUsers(this.whiteboardId).then(response => {
      this.whiteboardUsers = response["message"];
    });
  }

  closeUsersModal() {
    $("#usersModal").modal('close');
  }

  removeUser(userid) {
    this.toolbarService.removeUserFromWHiteboard(userid, this.whiteboardId).then(response => {
      this.loadWhiteboardUsers();
    });
  }

}
