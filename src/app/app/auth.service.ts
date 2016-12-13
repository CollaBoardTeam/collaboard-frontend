import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class AuthService {
    private key = "collaboard_user";

    constructor() {
    }

    login(email, password) {

        var user = {
            "IdUser": 1,
            "fullName": "Marco Rodrigues",
            "email": email
        };

        localStorage.setItem(this.key, JSON.stringify(user));
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