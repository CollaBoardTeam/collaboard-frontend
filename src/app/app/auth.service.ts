import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { CollaboardAPI } from '../api.config';

@Injectable()
export class AuthService {
    private key = "collaboard_user";

    authenticatePath = "user/authenticate";

    constructor(private http: Http) {
    }

    login(email, password) {
        var credentials = { 'email': email, 'password': password };
        return this.http.post(CollaboardAPI.url + this.authenticatePath, credentials)
            .toPromise()
            .then(response => {
                response = response.json();
                if (response["error"] === false) {
                    var user = {
                        "idUser": response["message"][0]["idUser"],
                        "fullName": response["message"][0]["fullName"],
                        "email": email,
                        "token": response["token"]
                    };
                    localStorage.setItem(this.key, JSON.stringify(user));
                }
            });
    }

    logout() {
        localStorage.removeItem(this.key);
    }

    isLoggedIn() {
        return !!localStorage.getItem(this.key);
    }

    getUser() {
        return JSON.parse(localStorage.getItem(this.key));
    }
}