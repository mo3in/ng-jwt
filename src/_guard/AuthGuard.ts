/**
 * Created by Mo3in on 5/29/2017.
 */


import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {AuthConfig} from "../auth.config";
import {TokenService} from "../_services/token.service";


@Injectable()
export class LoggedOutAuth implements CanActivate {


	constructor(private _config: AuthConfig, private _tokenService: TokenService, private _router: Router) {
	}

	canActivate() {
		let token = this._tokenService.getToken();

		if (token && token.token && !token.isExpired()) {
			let redirectUrl = this._config.guards.loggedOutGuard.redirectUrl;
			if (redirectUrl)
				this._router.navigate([redirectUrl]);
			return false;
		}
		return true;
	}
}


@Injectable()
export class LoggedInAuth implements CanActivate {

	constructor(private _config: AuthConfig, private _tokenService: TokenService, private _router: Router) {
	}

	canActivate() {
		let token = this._tokenService.getToken();

		if (token && token.token) {
			return !token.isExpired();
		}

		let redirectUrl = this._config.guards.loggedInGuard.redirectUrl;
		if (redirectUrl) {
			this._router.navigate([redirectUrl]);
		}
		return false;
	}
}
