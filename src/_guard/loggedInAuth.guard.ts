/**
 * Created by Mo3in on 5/28/2017.
 */

import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {AuthConfig, IAuthConfig} from "../auth.config";
import {TokenService} from "../_services/token.service";

@Injectable()
export class LoggedInAuth implements CanActivate {

  private _config: IAuthConfig;

  constructor(options: AuthConfig, private _tokenService: TokenService, private _router: Router) {
    this._config = options.getConfig();
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
