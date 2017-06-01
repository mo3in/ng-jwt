
# ng-jwt

[![NPM](https://nodei.co/npm/ng-jwt.png)](https://npmjs.org/package/ng-jwt)

Provides an angular2 auth module to handle authentication based on JWT

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

To install this library, run:

```bash
$ npm install ng-jwt --save
```

## setup && using
When that is done you will have to include the `AuthModule` into your root module:
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
In the forRoot function you can specify a custom config.
#### Feature status:

| Feature          |  Desc  |Default                              |
|------------------|-------------------------------------|--------------|
| loginEndPoint *     | Endpoint url for login with AuthenticationService | [null / Require]  |
| loginTokenName  | Token object name for reading from result | `access_token`  |
| loginParams           | additional params for sending login request | [null / optional]  |
| headerName          | set Authorization header name for `AuthHttp` Requests | `Authorization`  |
| headerPrefix           | Authorization value for  `AuthHttp` Requests  | `Bearer` |
| guards          | Logged[in/out]  guard redirect router name | [null]  |

## <a name="authentication"></a>Login && LogOut
if you want to login with `Authorization`:
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
## <a name="tokenService"></a>Manual Login && LogOut
if you want to login with `TokenService`:
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
## <a name="authHttp"></a>Sending Requests
If you want to send a request with the `Authorization` header set with the JWT token you can use the `AuthHttp` class.
```ts
import { AuthHttp } from 'ng-jwt';
...
@Component({
  ...
})
export class AppComponent {
  constructor(private _authHttp: AuthHttp) {}

  getThing() {
    this._authHttp.get('/get/thing') .subscribe(
        data => this.thing = data,
        error => console.error(error),
        () => console.log('finish ...')
    )
  }
}
```

## <a name="auth"></a>Check logged  in
If you want to check app is logged in, you can use `Auth`  class.
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

## <a name="authGuards"></a>Default auth guards
If you want to loggedIn in router:

for authModule config:
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

MIT © [Mo3in](mailto:moein.hente@gmail.com)
