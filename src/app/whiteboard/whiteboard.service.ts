import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { CollaboardAPI } from '../api.config';
import { AuthService } from '../app/auth.service';

@Injectable()
export class WhiteboardService {

    user;
    headers;

    getStickyNotesPath = "whiteboard/get-wb-content/";
    getColorsPath = "utility/get-colors/";
    createStickyNotePath = "stickynote/create-st/";
    editStickyNotePath = "stickynote/edit-st/";
    changeGroupNamePath = "group/change-group-name/";
    changeStickyNoteColorPath = "stickynote/edit-st-color/";
    changeStickyNoteGroupPath = "stickynote/add-sticky-toGroup/";
    deleteStickyNotePath = "stickynote/delete-st/";
    deleteGroupPath = "group/delete-group/";
    getWhiteboardLayoutPath = "layout/get-layouts/";

    constructor(private http: Http, private authService: AuthService) {
        this.user = this.authService.getUser();
        this.headers = new Headers();
        this.headers.append("x-access-token", this.user.token);
    }

    getStickyNotes(id: number): Promise<any[]> {
        return this.http.get(CollaboardAPI.url + this.getStickyNotesPath + id, { headers: this.headers })
            .toPromise()
            .then(response => response.json() as any[]);
    }

    getColors(): Promise<any[]> {
        return this.http.get(CollaboardAPI.url + this.getColorsPath, { headers: this.headers })
            .toPromise()
            .then(response => response.json() as any[]);
    }

    createStickyNote(userID, colorID, position, wbGroupID): Promise<any[]> {
        var stickyNote = {
            "userid": userID,
            "wbGroupID": wbGroupID,
            "colorID": colorID,
            "stickypositon": position,
            "stickylines": [{
                "lineContent": "1",
                "linePosition": 1
            },
            {
                "lineContent": "2",
                "linePosition": 2
            },
            {
                "lineContent": "3",
                "linePosition": 3
            }
            ]
        };

        return this.http.post(CollaboardAPI.url + this.createStickyNotePath, stickyNote, { headers: this.headers })
            .toPromise()
            .then(response => response.json() as any[]);
    }

    editStickyNote(stickyNoteId, colorID, stickylines): Promise<any[]> {
        var stickyNote = {
            "stickyid": stickyNoteId,
            "colorID": colorID,
            "stickypositon": 1,
            "stickylines": stickylines
        }

        return this.http.put(CollaboardAPI.url + this.editStickyNotePath, stickyNote, { headers: this.headers })
            .toPromise()
            .then(response => response.json() as any[]);
    }

    changeStickyNoteColor(stickyNoteId, colorId): Promise<any[]> {
        var stickyNote = { 'snID': stickyNoteId, 'snColorID': colorId };
        return this.http.put(CollaboardAPI.url + this.changeStickyNoteColorPath, stickyNote, { headers: this.headers })
            .toPromise()
            .then(response => response.json() as any[]);
    }

    changeStickyNoteGroup(stickyNoteId, groupId): Promise<any[]> {
        var stickyNote = { 'stickyid': stickyNoteId, 'groupid': groupId };
        return this.http.put(CollaboardAPI.url + this.changeStickyNoteGroupPath, stickyNote, { headers: this.headers })
            .toPromise()
            .then(response => response.json() as any[]);
    }

    changeGroupName(groupid, groupName): Promise<any[]> {
        var group = { 'groupid': groupid, 'newname': groupName };

        return this.http.put(CollaboardAPI.url + this.changeGroupNamePath, group, { headers: this.headers })
            .toPromise()
            .then(response => response.json() as any[]);
    }

    deleteStickyNote(stickyNoteId): Promise<any[]> {
        return this.http.delete(CollaboardAPI.url + this.deleteStickyNotePath + stickyNoteId, { headers: this.headers })
            .toPromise()
            .then(response => response.json() as any[]);
    }

    deleteGroup(groupId): Promise<any[]> {
        return this.http.delete(CollaboardAPI.url + this.deleteGroupPath + groupId, { headers: this.headers })
            .toPromise()
            .then(response => response.json() as any[]);
    }

    getWhiteboardLayout(id: number): Promise<any[]> {
        return this.http.get(CollaboardAPI.url + this.getWhiteboardLayoutPath + id, { headers: this.headers })
            .toPromise()
            .then(response => response.json() as any[]);
    }
}
