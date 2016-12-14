import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { CollaboardAPI } from '../api.config';
import { AuthService } from '../app/auth.service';

@Injectable()
export class ToolbarService {

    user;
    headers;

    getInvitationsPath = "user/check-inv/";
    inviteUserPath = "user/inv-user/";
    acceptUserPath = "user/accept-inv/";
    declineInvitationPath = "user/decline-inv/";
    removeUserFromWHiteboardPath = "user/rem-user-wb/";

    constructor(private http: Http, private authService: AuthService) {
        this.user = this.authService.getUser();
        this.headers = new Headers();
        this.headers.append("x-access-token", this.user.token);
    }

    getInvitations(): Promise<any[]> {
        return this.http.get(CollaboardAPI.url + this.getInvitationsPath + this.user.id, { headers: this.headers })
            .toPromise()
            .then(response => response.json() as any[]);
    }

    inviteUser(useremail, wbid): Promise<any[]> {
        var user = {
            "owner": this.user.id,
            "useremail": useremail,
            "wbid": wbid
        };

        return this.http.post(CollaboardAPI.url + this.inviteUserPath, user, { headers: this.headers })
            .toPromise()
            .then(response => response.json() as any[]);
    }

    acceptInvitation(invid, wbid): Promise<any[]> {
        var invitation = {
            "invid": invid,
            "wbid": wbid,
            "userid": this.user.id
        };

        return this.http.post(CollaboardAPI.url + this.acceptUserPath, invitation, { headers: this.headers })
            .toPromise()
            .then(response => response.json() as any[]);
    }

    declineInvitation(invid): Promise<any[]> {
        return this.http.delete(CollaboardAPI.url + this.declineInvitationPath + invid, { headers: this.headers })
            .toPromise()
            .then(response => response.json() as any[]);
    }

    removeCurrentUserFromWHiteboard(wbid): Promise<any[]> {
        return this.http.delete(CollaboardAPI.url + this.removeUserFromWHiteboardPath + this.user.id + "/" + wbid, { headers: this.headers })
            .toPromise()
            .then(response => response.json() as any[]);
    }

    removeUserFromWHiteboard(userid, wbid): Promise<any[]> {
        return this.http.delete(CollaboardAPI.url + this.removeUserFromWHiteboardPath + userid + "/" + wbid, { headers: this.headers })
            .toPromise()
            .then(response => response.json() as any[]);
    }
}
