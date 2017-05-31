import {ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthConfig, IAuthConfig} from './auth.config';
import {AuthHttp} from './_services/auth-http.service';
import {TokenService} from './_services/token.service';
import {AuthenticationService} from './_services/authentication.service';
import {LoggedInAuth, LoggedOutAuth} from "./_guard/AuthGuard";
import {RouterModule} from "@angular/router";
import {Http, HttpModule, RequestOptions} from "@angular/http";
import {Auth} from "./_services/auth.service";


export * from "./_guard/AuthGuard"
export * from "./_services/token.service"
export * from "./_services/authentication.service"
export * from "./_services/auth-http.service"
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
				AuthHttp,
				Auth,
				TokenService,
				LoggedInAuth,
				LoggedOutAuth,
				AuthenticationService,
			]
		};
	}
}
