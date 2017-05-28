/**
 * Created by Mo3in on 5/28/2017.
 */

import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpModule, Http, RequestOptions} from '@angular/http';
import {RouterModule, Router} from '@angular/router';
import {TokenService} from "./_services/token.service";
import {AuthConfig, IAuthConfig} from "./auth.config";
import {AuthHttp} from "./_services/auth.http";
import {LoggedOutAuth} from "./_guard/loggedOutAuth.guard";
import {LoggedInAuth} from "./_guard/loggedInAuth.guard";

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule
  ],
  providers: [
    LoggedInAuth,
    LoggedOutAuth
  ]
})
export class AuthModule {
  static forRoot(config?: IAuthConfig): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        TokenService,
        {
          provide: AuthHttp,
          useFactory: (tokenService: TokenService, http: Http, options: RequestOptions) => {
            return new AuthHttp(new AuthConfig(config), tokenService, http, options);
          },
          deps: [
            TokenService,
            Http,
            RequestOptions
          ]
        },
        {
          provide: LoggedInAuth,
          useFactory: (tokenService: TokenService, router: Router) => {
            return new LoggedInAuth(new AuthConfig(config), tokenService, router);
          },
          deps: [
            TokenService,
            Router
          ]
        },
        {
          provide: LoggedOutAuth,
          useFactory: (tokenService: TokenService, router: Router) => {
            return new LoggedOutAuth(new AuthConfig(config), tokenService, router);
          },
          deps: [
            TokenService,
            Router
          ]
        }
      ]
    }
  }
}
