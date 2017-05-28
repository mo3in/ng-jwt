/**
 * Created by Mo3in on 5/28/2017.
 */

import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {TokenService} from "../_services/token.service";
import {AuthConfig, IAuthConfig} from "../auth.config";


@Injectable()
export class LoggedOutAuth implements CanActivate {

  private _config: IAuthConfig;

  constructor(options: AuthConfig, private _tokenService: TokenService, private _router: Router) {
    this._config = options.getConfig();
  }

  canActivate() {
    let token = this._tokenService.getToken();

    if (token && token.token && !token.isExpired()) {
      let redirectUrl = this._config.guards.loggedOutGuard.redirectUrl;
      if (redirectUrl) {
        this._router.navigate([redirectUrl]);
      }

      return false;
    }
    return true;
  }
}
