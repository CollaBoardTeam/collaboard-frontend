import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class WhiteboardService {

    baseUrl = "http://les16a.fe.up.pt/";
    getWhiteboardsPath = "public/get_wb_content/";
    createStickyNotePath = "private/create-st/";
    editStickyNotePath = "private/edit-st/";
    deleteStickyNotePath = "private/delete-st/";

    constructor(private http: Http) { }

    getStickyNotes(id: number): Promise<any[]> {
        return this.http.get(this.baseUrl + this.getWhiteboardsPath + id)
            .toPromise()
            .then(response => response.json() as any[]);
    }

    createStickyNote(userID, content, position, wbGroupID): Promise<any[]> {
        var stickyNote = { 'userID': userID, 'content': content, 'position': position, 'wbGroupID': wbGroupID };

        return this.http.post(this.baseUrl + this.createStickyNotePath, stickyNote)
            .toPromise()
            .then(response => response.json() as any[]);
    }

    editStickyNote(stickyNoteId, content, indexLine): Promise<any[]> {
        var stickyNote = { 'snID': stickyNoteId, 'contentLine': content, 'lineID': indexLine };

        return this.http.put(this.baseUrl + this.editStickyNotePath, stickyNote)
            .toPromise()
            .then(response => response.json() as any[]);
    }

    deleteStickyNote(stickyNoteId): Promise<any[]> {
        return this.http.delete(this.baseUrl + this.deleteStickyNotePath + stickyNoteId)
            .toPromise()
            .then(response => response.json() as any[]);
    }
}
