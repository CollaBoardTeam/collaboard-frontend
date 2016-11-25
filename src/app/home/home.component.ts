import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {

  whiteboards = [];
  newWhiteboard = { boardName: '', parameters: [] };

  constructor(private homeService: HomeService) {
  }

  ngOnInit() {
    this.loadWhiteboards();
  }

  loadWhiteboards() {
    this.homeService.getWhiteboards().then(whiteboards => {
      this.whiteboards = whiteboards['message'];
    });
  }

  openCreateWhiteboardModal() {
    this.newWhiteboard = { boardName: '', parameters: [] };

    $("#createWhiteboardModal").modal('open');
    $('#createWhiteboardTabs').tabs('select_tab', 'tabStickyNote');
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
    this.homeService.createWhiteboard(1, this.newWhiteboard.boardName, 1).then(response => {
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

  deleteWhiteboard(wbID, userID) {
    this.homeService.deleteWhiteboard(wbID, userID).then(response => {
      this.loadWhiteboards();
    });
  }

  addParameter() {
    this.newWhiteboard.parameters.push({ value: "New Parameter" });
  }

  deleteParameter(index: number) {
    this.newWhiteboard.parameters.splice(index, 1);
  }

}
