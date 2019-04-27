import {ModuleWithProviders, NgModule} from '@angular/core';
import {JwtHttpInterceptor} from './_services/jwt-http.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthenticationService} from './_services/authentication.service';
import {AuthConfig, IAuthConfig} from './auth.config';
import {Auth} from './_services/auth.service';
import {TokenService} from './_services/token.service';
import {LoggedInAuth, LoggedOutAuth} from './_guard/AuthGuard';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		RouterModule,
		HttpClientModule
	],
	exports: []
})
export class NgJwtModule {
	static forRoot(config?: IAuthConfig): ModuleWithProviders {
		return {
			ngModule: NgJwtModule,
			providers: [
				{provide: AuthConfig, useValue: config},
				Auth,
				TokenService,
				LoggedInAuth,
				LoggedOutAuth,
				AuthenticationService,
				{
					provide: HTTP_INTERCEPTORS,
					useClass: JwtHttpInterceptor,
					multi: true,
				},
			]
		};
	}
}
