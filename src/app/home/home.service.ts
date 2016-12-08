import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CollaboardAPI } from '../api.config';


@Injectable()
export class HomeService {

  getWhiteboardsPath = "public/wbs_by_user/";
  createWhiteboardPath = "private/create-wb/";
  addGroupPath = "private/add-group-wb/";
  editWhiteboardPath = "private/change-wb-name/";
  deleteWhiteboardPath = "private/delete-wb/";

  constructor(private http: Http) { }

  getWhiteboards(): Promise<any[]> {
    return this.http.get(CollaboardAPI.url + this.getWhiteboardsPath + 1)
      .toPromise()
      .then(response => response.json() as any[]);
  }

  createWhiteboard(layoutID, boardName, userID): Promise<any[]> {
    var whiteboard = { 'layoutID': layoutID, 'boardName': boardName, 'userID': userID };

    return this.http.post(CollaboardAPI.url + this.createWhiteboardPath, whiteboard)
      .toPromise()
      .then(response => response.json() as any[]);
  }

  addGroupToWhiteboard(wbID, groupName): Promise<any[]> {
    var group = { 'wbid': wbID, 'groupname': groupName };

    return this.http.post(CollaboardAPI.url + this.addGroupPath, group)
      .toPromise()
      .then(response => response.json() as any[]);
  }

  editWhiteboard(wbID, boardName): Promise<any[]> {
    var whiteboard = { 'wbid': wbID, 'boardName': boardName, 'newname': boardName };

    return this.http.put(CollaboardAPI.url + this.editWhiteboardPath, whiteboard)
      .toPromise()
      .then(response => response.json() as any[]);
  }

  deleteWhiteboard(wbID, userID): Promise<any[]> {
    return this.http.delete(CollaboardAPI.url + this.deleteWhiteboardPath + wbID + "/" + userID)
      .toPromise()
      .then(response => response.json() as any[]);
  }

}
