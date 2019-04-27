import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {TokenService} from './token.service';
import {Token} from '../_models/token';
import {AuthConfig} from '../auth.config';
import {Observable} from 'rxjs';

@Injectable()
export class JwtHttpInterceptor implements HttpInterceptor {
	constructor(private config: AuthConfig, private _tokenService: TokenService) {
		this.config = new AuthConfig(config);
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		let token: Token = this._tokenService.getToken();

		if (token && !token.isExpired()) {
			req = req.clone({headers: req.headers.set(this.config.headerName, this.config.headerPrefix + ' ' + token.token)});
		}

		return next.handle(req);
	}
}
