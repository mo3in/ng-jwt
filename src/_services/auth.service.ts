import {Injectable} from '@angular/core';
import {TokenService} from "./token.service";

@Injectable()
export class Auth {

    constructor(private _tokenService: TokenService) {
    }

    public loggedIn(): boolean {
        let token = this._tokenService.getToken();
        return token && token.token && !token.isExpired();
    }
}
