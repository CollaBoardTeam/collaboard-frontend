import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class WhiteboardService {

    baseUrl = "http://les16a.fe.up.pt/";
    getStickyNotesPath = "public/get_wb_content/";
    getColorsPath = "public/get-colors/";
    createStickyNotePath = "private/create-st/";
    editStickyNotePath = "private/edit-st/";
    changeStickyNoteColorPath = "private/edit-st-color/";
    deleteStickyNotePath = "private/delete-st/";

    constructor(private http: Http) { }

    getStickyNotes(id: number): Promise<any[]> {
        return this.http.get(this.baseUrl + this.getStickyNotesPath + id)
            .toPromise()
            .then(response => response.json() as any[]);
    }

    getColors(): Promise<any[]> {
        return this.http.get(this.baseUrl + this.getColorsPath)
            .toPromise()
            .then(response => response.json() as any[]);
    }

    createStickyNote(userID, content, colorID, position, wbGroupID): Promise<any[]> {
        var stickyNote = { 'userID': userID, 'content': content, 'position': position, 'wbGroupID': wbGroupID, 'colorID': colorID };

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

    changeStickyNoteColor(stickyNoteId, colorId): Promise<any[]> {
        var stickyNote = { 'snID': stickyNoteId, 'snColorID': colorId };
        return this.http.put(this.baseUrl + this.changeStickyNoteColorPath, stickyNote)
            .toPromise()
            .then(response => response.json() as any[]);
    }

    deleteStickyNote(stickyNoteId): Promise<any[]> {
        return this.http.delete(this.baseUrl + this.deleteStickyNotePath + stickyNoteId)
            .toPromise()
            .then(response => response.json() as any[]);
    }
}
