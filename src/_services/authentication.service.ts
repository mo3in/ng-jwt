import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {TokenService} from './token.service';
import {AuthConfig, IAuthConfig} from '../auth.config';
import {Http, Response, URLSearchParams, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
	constructor(private http: Http, private authConfig: AuthConfig, private _tokenService: TokenService) {
		this.authConfig = new AuthConfig(authConfig);
	}

	login(username: string, password: string): Observable<boolean> {
		let body = new URLSearchParams();
		let loginParams = this.authConfig.loginParams;
		for (let key in loginParams)
			body.set(key, loginParams[key]);
		body.set("username", username);
		body.set("password", password);

		let headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.post(this.authConfig.loginEndPoint, body, {headers: headers}).map((response: Response) => {
			let token = response.json() && response.json()[this.authConfig.loginTokenName];

			if (token) {
				this._tokenService.setToken(token);
				return true;
			} else {
				return false;
			}
		});
	}

	logout(redirect?: boolean): void {
		this._tokenService.removeToken();
		// if(redirect)

	}
}