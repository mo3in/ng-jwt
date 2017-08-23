
# ng-jwt

[![NPM](https://nodei.co/npm/ng-jwt.png)](https://npmjs.org/package/ng-jwt)
<br>
<a href="https://www.npmjs.com/package/ng-jwt"><img src="https://img.shields.io/npm/dt/ng-jwt.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/ng-jwt"><img src="https://img.shields.io/npm/v/ng-jwt.svg" alt="Version"></a>

Provides an Angular auth module to handle authentication based on JWT.

tnx [angular-jwt](https://github.com/ItsDizzy/angular2-auth)
#### Feature status:

| Feature          | Status                              | Docs         |
|------------------|-------------------------------------|--------------|
| AuthenticationService           |                           Available | [README](#authentication)  |
| TokenService            |                           Available | [README](#tokenService)  |
| AuthHttp         |                           Available | [README](#authHttp)  |
| Auth            |                           Available | [README](#auth)  |
| LoggedInAuth          |                           Available | [README](#authGuards)  |
| LoggedOutAuth            |                           Available | [README](#authGuards)  |

## Installation

ng-jwt is available on NPM

```bash
$ npm install ng-jwt --save
```

## Setup & Usage

Once the module has been installed, you need to include `AuthModule` into your root module:

```ts
import { AuthModule } from 'ng-jwt';
...
@NgModule({
  imports: [
    ...
    AuthModule.forRoot({
        loginEndPoint: 'http://localhost:5000/connect/token',
        loginParams: {"grant_type": "password", "client_id": "roclient.public"}
    }),
    ...
  ],
  ...
})
export class AppModule {}
```

In the `forRoot` function you can specify a custom config as well.

### Feature status:

| Feature          |  Desc  |Default                              |
|------------------|-------------------------------------|--------------|
| loginEndPoint *     | Endpoint url for login with AuthenticationService | [null / Require]  |
| loginTokenName  | Token object name for reading from result | `access_token`  |
| loginParams           | additional params for sending login request | [null / optional]  |
| headerName          | set Authorization header name for `AuthHttp` Requests | `Authorization`  |
| headerPrefix           | Authorization value for  `AuthHttp` Requests  | `Bearer` |
| guards          | Logged[in/out]  guard redirect router name | [null]  |

### Login && Logout

`AuthenticationService` service comes with`logout` and `login` function built-in:

```ts
import {Component} from '@angular/core';
import {Auth, AuthenticationService} from "ng-jwt";

@Component({
	...
})
export class AppComponent {

	constructor(private authentication: AuthenticationService) {
	}

	logOut() {
		this.authentication.logout();
	}

	login() {
		this.authentication.login('admin', '123456').subscribe(data => console.log((data ? "Success" : "Failed")), error => console.log(error));
	}
}
```

#### Manually Login & Logout

In case of of needing a customized Login/Logout functionality, you may use `TokenService`.

```ts
import {Component} from '@angular/core';
import {TokenService} from "ng-jwt";
import {Http} from "@angular/http";

@Component({
...
})
export class AppComponent {

	constructor(private _http: Http, private _tokenService: TokenService) {
	}

	logOut() {
		this._tokenService.removeToken();
	}

	login(username: string, pass: string) {
		this._http.post('/token', {
			username: username,
			password: pass
		}).map(res => res.json())
			.subscribe(response => this._tokenService.setToken(response.token), error => console.error(error));
	}
}
```

### Sending Requests
`ng-jwt` uses `HttpInterceptor` to modify HTTP headers for Authentication. So while using `HttpModule` and `HttpClientModule`, `ng-jwt` would send the Authentication headers alongside the request. 

### Login Validation

`Auth` class provides another helper method for authentication validation. By using `Auth.loggedIn` function 
you can check if the client is logged in. This method returns a `Boolean`.

```ts
import {Component, OnInit} from '@angular/core';
import {Auth} from "ng-jwt";

@Component({
...
})
export class AppComponent implements OnInit {
	constructor(public _auth: Auth) {
	}

	ngOnInit(): void {
		console.log(this._auth.loggedIn());
	}
}

```

## Default Auth Guards

If you want to loggedIn in router:

for `authModule` config:

```ts
import { AuthModule } from 'ng-jwt';
...
@NgModule({
  imports: [
    ...
    AuthModule.forRoot({
        loginEndPoint: 'http://localhost:5000/connect/token',
        loginParams: {"grant_type": "password", "client_id": "roclient.public"},
        guards: {loggedInGuard: {redirectUrl: 'unauthorized'}, loggedOutGuard: {redirectUrl: ''}}
    }),
    ...
  ],
  ...
})
export class AppModule {}
```
for route config:
```
const routes: Routes = [
	{path: 'family', component: FamilyListComponent, canActivate: [LoggedInAuth]},
	{path: 'unauthorized', component: UnAuthorizedComponent}
];
 ```
## License

ng-jwt is released under MIT license.

## Author

[Mo3in](mailto:moein.hente@gmail.com)

