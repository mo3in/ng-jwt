import {BrowserModule} from '@angular/platform-browser';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Http, HttpModule, RequestOptions} from '@angular/http';
import {AuthConfig, IAuthConfig} from './auth.config';
import {Router} from '@angular/router';
import {TokenService} from './_services/token.service';
import {AuthHttp} from './_services/auth-http.service';
import {LoggedInAuthGuard, LoggedOutAuthGuard} from './_helper/auth.guard';


@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: []
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
          provide: LoggedInAuthGuard,
          useFactory: (tokenService: TokenService, router: Router) => {
            return new LoggedInAuthGuard(new AuthConfig(config), tokenService, router);
          },
          deps: [
            TokenService,
            Router
          ]
        },
        {
          provide: LoggedOutAuthGuard,
          useFactory: (tokenService: TokenService, router: Router) => {
            return new LoggedOutAuthGuard(new AuthConfig(config), tokenService, router);
          },
          deps: [
            TokenService,
            Router
          ]
        }
      ]
    };
  }
}
