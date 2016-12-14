import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { ToolbarService } from '../toolbar/toolbar.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService, ToolbarService]
})
export class HomeComponent implements OnInit {

  whiteboards = [];
  newWhiteboard = { boardName: '', parameters: [], groups: [], members: [] };

  constructor(private homeService: HomeService, private toolbarService: ToolbarService) {
  }

  ngOnInit() {
    this.loadWhiteboards();
  }

  loadWhiteboards() {
    this.homeService.getWhiteboards().then(whiteboards => {
      this.whiteboards = whiteboards['message'];
    });
  }

  initializeTabs() {
    $(document).ready(function () {
      $('ul.tabs').tabs();
    });
  }

  openCreateWhiteboardModal() {
    this.newWhiteboard = { boardName: '', parameters: [], groups: [], members: [] };

    $("#createWhiteboardModal").modal('open');
    this.initializeTabs();
  }

  closeCreateWhiteboardModal() {
    $("#createWhiteboardModal").modal('close');
  }

  openEditWhiteboardModal(whiteboard) {
    this.newWhiteboard = Object.assign({}, whiteboard);

    $("#editWhiteboardModal").modal('open');
  }

  closeEditWhiteboardModal() {
    $("#editWhiteboardModal").modal('close');
  }

  createWhiteboard() {
    this.homeService.createWhiteboard(1, this.newWhiteboard.boardName).then(response => {
      var wbId = response["message"][0].idWhiteBoard;

      for (let group of this.newWhiteboard.groups) {
        this.homeService.addGroupToWhiteboard(wbId, group.value);
      }

      for (let member of this.newWhiteboard.members) {
        this.toolbarService.inviteUser(member.value, wbId);
      }

      var subtitles = [];
      var i = 1;

      for (let parameter of this.newWhiteboard.parameters) {
        subtitles.push({
          "lineIndex": i,
          "subtitle": parameter.value
        });
        i++;
      }

      this.homeService.createWhiteboardLayout(wbId, response["message"][0]["boardName"], subtitles).then(response => {
        this.homeService.addLayoutToWhiteboard(wbId, response["message"][0]["idLayout"]).then(response => {
        });
      });

      this.loadWhiteboards();
    });
    this.closeCreateWhiteboardModal();
  }

  editWhiteboard() {
    this.homeService.editWhiteboard(this.newWhiteboard["idWhiteBoard"], this.newWhiteboard.boardName).then(response => {
      this.loadWhiteboards();
    });
    this.closeEditWhiteboardModal();
  }

  deleteWhiteboard(wbID) {
    this.homeService.deleteWhiteboard(wbID).then(response => {
      this.loadWhiteboards();
    });
  }

  removeWhiteboard(wbID) {
    this.toolbarService.removeCurrentUserFromWHiteboard(wbID).then(response => {
      this.loadWhiteboards();
    });
  }

  lockOrUnlockWhiteboard(wbID) {
    this.homeService.lockOrUnlockWhiteboard(wbID).then(response => {
      this.loadWhiteboards();
    });
  }

  addParameter() {
    this.newWhiteboard.parameters.push({ value: "New Parameter" });
  }

  deleteParameter(index: number) {
    this.newWhiteboard.parameters.splice(index, 1);
  }

  addGroup() {
    this.newWhiteboard.groups.push({ value: "New Group" });
  }

  deleteGroup(index: number) {
    this.newWhiteboard.groups.splice(index, 1);
  }

  addMember() {
    this.newWhiteboard.members.push({ value: "New Member Email" });
  }

  deleteMember(index: number) {
    this.newWhiteboard.members.splice(index, 1);
  }
}
