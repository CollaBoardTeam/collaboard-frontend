import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class HomeService {

  baseUrl = "http://les16a.fe.up.pt/";
  getWhiteboardsPath = "public/wbs_by_user/";
  createWhiteboardsPath = "private/create-wb/";

  constructor(private http: Http) { }

  getWhiteboards(): Promise<any[]> {
    return this.http.get(this.baseUrl + this.getWhiteboardsPath + 1)
      .toPromise()
      .then(response => response.json() as any[]);
  }

  createWhiteboard(layoutID, boardName, userID): Promise<any[]> {
    var whiteboard = { 'layoutID': layoutID, 'boardName': boardName, 'userID': userID };

    return this.http.post(this.baseUrl + this.createWhiteboardsPath, whiteboard)
      .toPromise()
      .then(response => response.json() as any[]);
  }

}
