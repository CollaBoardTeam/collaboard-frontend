import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { CollaboardAPI } from '../api.config';
import { AuthService } from '../app/auth.service';

@Injectable()
export class HomeService {

  user;
  headers;

  getWhiteboardsPath = "whiteboard/wbs-by-user/";
  createWhiteboardPath = "whiteboard/create-wb/";
  addGroupPath = "group/add-group-wb/";
  editWhiteboardPath = "whiteboard/change-wb-name/";
  deleteWhiteboardPath = "whiteboard/delete-wb/";
  lockUnlockWhiteboardPath = "whiteboard/change-wb-state";

  constructor(private http: Http, private authService: AuthService) {
    this.user = this.authService.getUser();
    this.headers = new Headers();
    this.headers.append("x-access-token", this.user.token);
  }

  getWhiteboards(): Promise<any[]> {
    return this.http.get(CollaboardAPI.url + this.getWhiteboardsPath + this.user.id, { headers: this.headers })
      .toPromise()
      .then(response => response.json() as any[]);
  }

  createWhiteboard(layoutID, boardName): Promise<any[]> {
    var whiteboard = { 'layoutID': layoutID, 'boardName': boardName, 'userID': this.user.id };

    return this.http.post(CollaboardAPI.url + this.createWhiteboardPath, whiteboard, { headers: this.headers })
      .toPromise()
      .then(response => response.json() as any[]);
  }

  addGroupToWhiteboard(wbID, groupName): Promise<any[]> {
    var group = { 'wbid': wbID, 'groupname': groupName };

    return this.http.post(CollaboardAPI.url + this.addGroupPath, group, { headers: this.headers })
      .toPromise()
      .then(response => response.json() as any[]);
  }

  editWhiteboard(wbID, boardName): Promise<any[]> {
    var whiteboard = { 'wbid': wbID, 'boardName': boardName, 'newname': boardName };

    return this.http.put(CollaboardAPI.url + this.editWhiteboardPath, whiteboard, { headers: this.headers })
      .toPromise()
      .then(response => response.json() as any[]);
  }

  deleteWhiteboard(wbID): Promise<any[]> {
    return this.http.delete(CollaboardAPI.url + this.deleteWhiteboardPath + wbID + "/" + this.user.id, { headers: this.headers })
      .toPromise()
      .then(response => response.json() as any[]);
  }

  lockOrUnlockWhiteboard(wbID): Promise<any[]> {
    var whiteboard = { 'wbid': wbID };

    return this.http.put(CollaboardAPI.url + this.lockUnlockWhiteboardPath, whiteboard, { headers: this.headers })
      .toPromise()
      .then(response => response.json() as any[]);
  }

}
