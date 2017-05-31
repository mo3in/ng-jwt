
# ng-jwt

[![NPM](https://nodei.co/npm/ng-jwt.png)](https://npmjs.org/package/ng-jwt)

Provides an angular2 auth module to handle authentication based on JWT
## Installation

To install this library, run:

```bash
$ npm install ng-jwt --save
```

## setup && using
When that is done you will have to include the AuthModule into your root module:
```ts
import { AuthModule } from 'ng-jwt';
...
@NgModule({
  imports: [
    ...
    AuthModule.forRoot(),
    ...
  ],
  ...
})
export class AppModule {}
```


## Login && LogOut
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
## Manual Login && LogOut
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
## Sending Requests
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

## Check logged  in
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

## License

MIT © [Mo3in](mailto:moein.hente@gmail.com)
