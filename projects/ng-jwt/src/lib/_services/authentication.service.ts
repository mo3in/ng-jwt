import {Injectable} from '@angular/core';
import {TokenService} from './token.service';
import {AuthConfig, IAuthConfig} from '../auth.config';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
	constructor(private http: HttpClient, private authConfig: AuthConfig, private _tokenService: TokenService) {
		this.authConfig = new AuthConfig(authConfig);
	}

	login(username: string, password: string): Observable<boolean> {
		let body = new URLSearchParams();
		let loginParams = this.authConfig.loginParams;
		for (let key in loginParams) {
			body.set(key, loginParams[key]);
		}
		body.set('username', username);
		body.set('password', password);

		let headers = new HttpHeaders();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.post(this.authConfig.loginEndPoint, body, {headers})
			.pipe(map((response: Response) => {
				let token = response.json() && response.json()[this.authConfig.loginTokenName];

				if (token) {
					this._tokenService.setToken(token);
					return true;
				} else {
					return false;
				}
			}));
	}

	logout(redirect?: boolean): void {
		this._tokenService.removeToken();
		// if(redirect)

	}
}
