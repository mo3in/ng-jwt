import {NgModule, ModuleWithProviders} from '@angular/core';
import {RouterModule} from "@angular/router"
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthConfig, IAuthConfig} from "./auth.config";
import {JwtHttpInterceptor} from "./_services/jwt-http.interceptor";
import {TokenService} from "./_services/token.service";
import {Auth} from "./_services/auth.service";
import {AuthenticationService} from "./_services/authentication.service";
import {LoggedInAuth, LoggedOutAuth} from "./_guard/AuthGuard";
import {HttpModule} from "@angular/http";
import {AuthHttp} from "./_services/auth-http.service";

export * from "./_guard/AuthGuard"
export * from "./_services/token.service"
export * from "./_services/authentication.service"
export * from "./_services/auth.service"
export * from "./_services/jwt-http.interceptor"
export * from "./_services/auth-http.service"
export * from "./_models/token"
export * from "./_services/auth.service"
export * from "./auth.config"

@NgModule({
	imports: [
		CommonModule, RouterModule, HttpModule
	],
	declarations: [
	],
	exports: [
	]
})
export class NgJwtModule {
	static forRoot(config?: IAuthConfig): ModuleWithProviders {
		return {
			ngModule: NgJwtModule,
			providers: [
				{provide: AuthConfig, useValue: config},
				Auth, TokenService, LoggedInAuth, LoggedOutAuth, AuthenticationService, AuthHttp,
				{
					provide: HTTP_INTERCEPTORS,
					useClass: JwtHttpInterceptor,
					multi: true,
				},
			]
		};
	}
}
