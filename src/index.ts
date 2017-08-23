import {ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthConfig, IAuthConfig} from './auth.config';
import {TokenService} from './_services/token.service';
import {AuthenticationService} from './_services/authentication.service';
import {LoggedInAuth, LoggedOutAuth} from "./_guard/AuthGuard";
import {RouterModule} from "@angular/router";
import {HttpModule} from "@angular/http";
import {Auth} from "./_services/auth.service";
import {HTTP_INTERCEPTORS, HttpClient} from "@angular/common/http";
import {JwtHttpInterceptor} from "./_services/jwt-http.interceptor";

export * from "./_guard/AuthGuard"
export * from "./_services/token.service"
export * from "./_services/authentication.service"
export * from "./_services/auth.service"
export * from "./_models/token"
export * from "./_services/auth.service"
export * from "./auth.config"


@NgModule({
	imports: [
		CommonModule,
		HttpModule,
		RouterModule
	],
	declarations: []
})
export class AuthModule {
	static forRoot(config?: IAuthConfig): ModuleWithProviders {
		return {
			ngModule: AuthModule,
			providers: [
				{provide: AuthConfig, useValue: config},
				{
					provide: HTTP_INTERCEPTORS,
					useClass: JwtHttpInterceptor,
					multi: true,
				},
				HttpClient,
				Auth,
				TokenService,
				LoggedInAuth,
				LoggedOutAuth,
				AuthenticationService,
			]
		};
	}
}
