import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CollaboardAPI } from '../api.config';

@Injectable()
export class WhiteboardService {

    getStickyNotesPath = "public/get_wb_content/";
    getColorsPath = "public/get-colors/";
    createStickyNotePath = "private/create-st/";
    editStickyNotePath = "private/edit-st/";
    changeGroupNamePath = "private/change-group-name/";
    changeStickyNoteColorPath = "private/edit-st-color/";
    deleteStickyNotePath = "private/delete-st/";
    deleteGroupPath = "private/delete-group/";

    constructor(private http: Http) { }

    getStickyNotes(id: number): Promise<any[]> {
        return this.http.get(CollaboardAPI.url + this.getStickyNotesPath + id)
            .toPromise()
            .then(response => response.json() as any[]);
    }

    getColors(): Promise<any[]> {
        return this.http.get(CollaboardAPI.url + this.getColorsPath)
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

        return this.http.post(CollaboardAPI.url + this.createStickyNotePath, stickyNote)
            .toPromise()
            .then(response => response.json() as any[]);
    }

    editStickyNote(stickyNoteId, indexLine): Promise<any[]> {
        var stickyNote = {
            "stickyid": stickyNoteId,
            "stickypositon": 1,
            "stickylines": [{
                "lineContent": "mudei",
                "lineID": 1
            }, {
                "lineContent": "isto",
                "lineID": 2
            }, {
                "lineContent": "ou nao",
                "lineID": 3
            }]
        }

        return this.http.put(CollaboardAPI.url + this.editStickyNotePath, stickyNote)
            .toPromise()
            .then(response => response.json() as any[]);
    }

    changeStickyNoteColor(stickyNoteId, colorId): Promise<any[]> {
        var stickyNote = { 'snID': stickyNoteId, 'snColorID': colorId };
        return this.http.put(CollaboardAPI.url + this.changeStickyNoteColorPath, stickyNote)
            .toPromise()
            .then(response => response.json() as any[]);
    }

    changeGroupName(groupid, groupName): Promise<any[]> {
        var group = { 'groupid': groupid, 'newname': groupName };

        return this.http.put(CollaboardAPI.url + this.changeGroupNamePath, group)
            .toPromise()
            .then(response => response.json() as any[]);
    }

    deleteStickyNote(stickyNoteId): Promise<any[]> {
        return this.http.delete(CollaboardAPI.url + this.deleteStickyNotePath + stickyNoteId)
            .toPromise()
            .then(response => response.json() as any[]);
    }

    deleteGroup(groupId): Promise<any[]> {
        return this.http.delete(CollaboardAPI.url + this.deleteGroupPath + groupId)
            .toPromise()
            .then(response => response.json() as any[]);
    }
}
